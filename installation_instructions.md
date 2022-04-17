# TigerGraph BioDex Submission 🐯

## Requirements

- docker
- node

## Run Image Classifier

Image classifier will run on port 80. More detailed instructions in `img_classifier/readme.md`

- go to img_classifier
- Download the volume by following instructions in `img_classifier/readme.md`
- `cd app && ./start_docker.sh`

## Create TigerGraph Instance and Upload Data

Follow instructions in `setup/README.md`

## Run API Server

API server will run on port 3080

- Go to the server folder; `cd ./server/`
- Install packages with `npm install`
- run `TIGERGRAPH_URL=url SECRET=secret node ./app.js` with the URL being your Tigergraph instance and the secret you've set up within Tigergraph
  - You can set up the secret by logging into TigerGraph Studio and create an API key. Instructions are: Tigergraph Studio > Admin > Management > Users > Create New Alias and Add a new Secret
  - Note: the Tigergraph url must not have a trailing backslash `/`, e.g. `https://example.i.tgcloud.io`
  - You can insert the secrets in line 7 and 9 of `server/app.js`

## Run the website

API server will run on port 3000

- Go to the portal folder; `cd ./portal/`
- Install packages with `npm install`
- OPTIONAL [Website Images](#website-images)
- run `npm start`

## Website Images

In order for the website to show images of these animals for clarification on the classifier. You would be required to download them inside the portal/public folder.

- Download `https://drive.google.com/drive/folders/1c8ZqIv5msHB8KSkEEId4Tqe7aejR4NqS?usp=sharing`
- extract it to `portal/public/animals`

The first image should be in the directory path `portal/public/animals/Abaeis nicippe/0.jpg`

### Information

The API server hasn't been built to be resilient, and often will crash if the uploaded url isn't correct, or if the image classifier isn't running, so if it falls over just rerun it.
