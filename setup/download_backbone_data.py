import wget  # `pip install wget` in terminal if this fails
import zipfile
import os

BACKBONE_URL = "https://hosted-datasets.gbif.org/datasets/backbone/current/backbone.zip"

if __name__ == "__main__":

    print("Downloading backbone data...")
    wget.download(BACKBONE_URL, "backbone.zip")

    print("Extracting backbone data...")
    with zipfile.ZipFile("backbone.zip", "r") as zip_ref:
        zip_ref.extractall("backbone")

    os.remove("backbone.zip")
    print("Done!")
