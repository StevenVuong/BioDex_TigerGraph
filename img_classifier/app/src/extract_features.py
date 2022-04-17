import requests
import shutil
import os
from typing import Text, Tuple
from PIL import Image
from requests.exceptions import HTTPError
import numpy as np
from numpy.linalg import norm


def download_file(url: str, local_savedir="./volumes/tmp/") -> Text:
    """Download file from url and save to local tempdir."""
    local_filename = url.split("/")[-1]
    local_filename = os.path.join(local_savedir, local_filename)
    try:
        with requests.get(url, stream=True) as r:
            with open(local_filename, "wb") as f:
                shutil.copyfileobj(r.raw, f)
    except HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  # Python 3.6
    except Exception as err:
        print(f"Other error occurred: {err}")  # Python 3.6
    return local_filename


def preprocess_image(
    img_path: np.ndarray, target_size: Tuple[int, int] = (299, 299)
) -> np.ndarray:
    """Preprocess image to model; resize, normalise and expand dimensions."""
    local_imgpath = download_file(img_path)
    img = Image.open(local_imgpath)
    os.remove(local_imgpath)
    img = img.resize(target_size)
    img = np.array(img)
    assert np.min(img) >= 0
    assert np.max(img) <= 255.0

    # scale to [|0, 1]
    img = img / 255
    assert np.min(img) >= 0
    assert np.max(img) <= 1.0

    # expand dim
    img = np.expand_dims(img, axis=0)
    assert img.shape == (1, *target_size, 3)

    return img


def extract_features(img_path, model, target_size=(299, 299)):
    """Load image to arary, resize, scale and expand dimensions.
    Then extract features from the image using the model."""
    # preprocess image
    img = preprocess_image(img_path=img_path, target_size=target_size)

    # get embeddings for and flatten
    img_embeddings = model(img)
    img_embeddings = img_embeddings.numpy()

    # normalise images
    img_embeddings /= norm(img_embeddings)

    return img_embeddings.astype(np.float32)
