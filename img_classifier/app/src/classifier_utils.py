import csv
import numpy as np
import json
from typing import Dict, Text
import tensorflow_hub as hub
from .extract_features import preprocess_image


def load_labelmap_to_dict(csv_path: str) -> Dict[Text, Text]:
    """Load CSV labelmap from volume to dict[id] = label_name"""
    labeldict = {}
    with open(csv_path, newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            labeldict[int(row["id"])] = row["name"]
    return labeldict


def get_top_n_preds_dict(model_output, labeldict, n=5):
    """Return top n predictions from model output and normalise. Discard the
    rest."""
    top_n_indices = (-model_output).argsort()[:n]
    model_outputs = {
        labeldict[ni]: str(model_output[ni] / np.sum(model_output))
        for ni in top_n_indices
    }
    return model_outputs


def call_keras_classifier(
    labelmap_csv_path: str,
    classifier_model: hub.KerasLayer,
    img_url: str,
    n_preds: int,
    target_size=(224, 224),
):
    """Preprocesses image url and calls classifier model.
    Returns top n predictions"""
    labelmap = load_labelmap_to_dict(labelmap_csv_path)

    img = preprocess_image(img_url, target_size=target_size)
    output_img_embeddings = classifier_model(img).numpy()[0]

    outputs = get_top_n_preds_dict(output_img_embeddings, labelmap, n_preds)
    return json.dumps(outputs)
