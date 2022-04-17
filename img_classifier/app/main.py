from typing import List
import pickle
import os
import json
import faiss
import tensorflow_hub as hub
from src.extract_features import extract_features
from src.lookup_embeddings import lookup_embeddings
from src.query_gbif import query_gbif
from src.classifier_utils import call_keras_classifier
from fastapi import FastAPI
from pydantic import BaseModel
import configparser

config = configparser.ConfigParser()
config.read("config.cfg")

app = FastAPI()

# load paths from config
GENERIC_MODEL = hub.KerasLayer(config["PATHS"]["GENERIC_MODEL_PATH"])

BIRD_LABELMAP_PATH = os.path.join(config["PATHS"]["BIRD_LABELMAP_PATH"])
BIRD_MODEL = hub.KerasLayer(config["PATHS"]["BIRD_MODEL_PATH"])

INSECT_LABELMAP_PATH = os.path.join(config["PATHS"]["INSECT_LABELMAP_PATH"])
INSECT_MODEL_PATH = hub.KerasLayer(config["PATHS"]["INSECT_MODEL_PATH"])

PLANT_LABELMAP_PATH = os.path.join(config["PATHS"]["PLANT_LABELMAP_PATH"])
PLANT_MODEL_PATH = hub.KerasLayer(config["PATHS"]["PLANT_MODEL_PATH"])

with open(config["PATHS"]["PCA_RELOADED_PATH"], "rb") as pickle_file:
    PCA_RELOADED = pickle.load(pickle_file)

FAISS_INDEX = faiss.read_index(config["PATHS"]["FAISS_INDEX_PATH"])

with open(config["PATHS"]["FAISS_FILENAMES_PATH"], "rb") as pickle_file:
    FAISS_FILENAMES = pickle.load(pickle_file)


class QueryList(BaseModel):
    query_list: List[str]


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/img_url")
async def lookup_species(img_url: str):
    """Extract embeddings from image url, perform PCA to reduce dimensions then
    FAISS to lookup embeddings and return the closest match."""

    extracted_embeddings = extract_features(img_url, GENERIC_MODEL)  # shape: (1, 2048)
    assert extracted_embeddings.shape == (1, 2048)

    extracted_embeddings = PCA_RELOADED.transform(
        extracted_embeddings
    )  # shape: (1, 128)
    assert extracted_embeddings.shape == (1, 128)

    scores = lookup_embeddings(extracted_embeddings, FAISS_INDEX, FAISS_FILENAMES)
    return scores


@app.post("/bird_url")
async def lookup_bird_species(img_url: str, n_preds: int = 5):
    """Classifier specific to birds. Based on:
    https://tfhub.dev/google/aiy/vision/classifier/birds_V1/1; has 964 species."""
    return call_keras_classifier(
        BIRD_LABELMAP_PATH, BIRD_MODEL, img_url, n_preds, target_size=(224, 224)
    )


@app.post("/insect_url")
async def lookup_insect_species(img_url: str, n_preds: int = 5):
    """Classifier specific to insects. Based on:
    https://tfhub.dev/google/aiy/vision/classifier/insects_V1/1; has 1021 species."""
    return call_keras_classifier(
        INSECT_LABELMAP_PATH,
        INSECT_MODEL_PATH,
        img_url,
        n_preds,
        target_size=(224, 224),
    )


@app.post("/plant_url")
async def lookup_plant_species(img_url: str, n_preds: int = 5):
    """Classifier specific to insects. Based on:
    https://tfhub.dev/google/aiy/vision/classifier/plants_V1/1; has 2101 species."""
    return call_keras_classifier(
        PLANT_LABELMAP_PATH,
        PLANT_MODEL_PATH,
        img_url,
        n_preds,
        target_size=(224, 224),
    )


@app.post("/query_gbif/")
async def query_gbif_names(query_list: QueryList):
    """Query GBIF for species name"""
    gbif_response = await query_gbif(query_list.query_list)

    gbif_response = json.dumps(
        [res.__dict__ if res is not None else {"result": None} for res in gbif_response]
    )
    return gbif_response
