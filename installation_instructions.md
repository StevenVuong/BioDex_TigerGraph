# TigerGraph BioDex Submission 🐯

There are four components involved:

1. Run Image Classifier
2. Create TigerGraph database and upload data
3. Run API server to connect ReactJS app to TigerGraph database
4. Run ReactJS website

## Requirements

- docker
- node

## Run Image Classifier

Image classifier will run on port 80. More detailed instructions in `img_classifier/readme.md`

1. go to img_classifier
2. Download the volume by following instructions in `img_classifier/readme.md`
3. `cd app && ./start_docker.sh`

You can visit `localhost:80/docs` to test out the image classifier by inputting an image url from the internet. e.g: <https://cdn.download.ams.birds.cornell.edu/api/v1/asset/256154511/1800> in the generic or bird classifier

## Create TigerGraph Instance and Upload Data

Follow instructions in `setup/README.md`

## Run API Server

API server will run on port 3080

1. Go to the server folder; `cd ./server/`
2. Install packages with `npm install`
3. Run `TIGERGRAPH_URL=<TIGERGRAPH_URL> SECRET=<SECRET> node ./app.js` with the URL being your Tigergraph instance and the secret you've set up within Tigergraph

Note:

- You can set up the secret by logging into TigerGraph Studio and create an API key. Instructions are: Tigergraph Studio > Admin > Management > Users > Create New Alias and Add a new Secret
- Note: the Tigergraph url must not have a trailing backslash `/`, e.g. `https://example.i.tgcloud.io`
- You can insert the secrets in line 7 and 9 of `server/app.js`

## Run the website

API server will run on port 3000

1. Go to the portal folder; `cd ./portal/`
2. Install packages with `npm install`
3. Add [Website Images](#website-images)
4. Run `npm start`

You can then access `localhost:3000`. Try to: register a sighting, then view it in your collection!

### Website Images

In order for the website to show images of these animals for clarification on the classifier. You would be required to download them inside the portal/public folder.

1. Download `https://drive.google.com/file/d/1N9hhWgI8jDVS1U06OL5VRhagE6GEFnPp/view?usp=sharing`
2. Extract it to `portal/public/animals`; if you are using linux, you can run `tar -xvf species_imgs.tar.gz`

The first image should be in the directory path `portal/public/animals/Abaeis nicippe/0.jpg`

### Information

The API server hasn't been built to be resilient, and often will crash if the uploaded url isn't correct, or if the image classifier isn't running, so if it falls over just rerun it.
