#!/bin/bash

# makedirs
mkdir -p 'volumes/models/inceptionv3/'
mkdir -p 'volumes/tmp/'

# download trained index; TODO: Host faiss index somewhere that isn't gdrive because download raises error
wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1hhvTtFzH0OkWxbszOsjCqYDvAkq67Lnl' -O volumes/models/data_categories.json

# download this file: https://drive.google.com/file/d/1Hjo_2A8sdgwdMn2CWsbD2G8ZFJTcNxMS/view?usp=sharing instead as below line doesn't work
#wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1Hjo_2A8sdgwdMn2CWsbD2G8ZFJTcNxMS' -O volumes/models/pca-trainmini-faiss.index
wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1kHptyssU53YKSWaK_zG0tq2dGsIHYD9_' -O volumes/models/pca-trainmini.pkl
wget --no-check-certificate 'https://docs.google.com/uc?export=download&id=1ObZbos2DeHb4Dsz3E2ygMU8Y4SC7e6oD' -O volumes/models/trainmini-filenames.pickle

# download trained inceptionv3 model (https://tfhub.dev/google/inaturalist/inception_v3/feature_vector/5)
cd ./volumes/models/inceptionv3/
wget https://tfhub.dev/google/inaturalist/inception_v3/feature_vector/5?tf-hub-format=compressed -O inception_v3.tar.gz
tar -xvf inception_v3.tar.gz
rm inception_v3.tar.gz

## optional from here
# bird classifier model
mkdir -p 'volumes/models/bird_classifier'
cd 'volumes/models/bird_classifier'
wget https://tfhub.dev/google/aiy/vision/classifier/birds_V1/1?tf-hub-format=compressed -O bird_classifier.tar.gz
tar -xvf bird_classifier.tar.gz
rm bird_classifier.tar.gz
wget https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_birds_V1_labelmap.csv

# insect classifier
mkdir -p 'volumes/models/insect_classifier'
cd 'volumes/models/insect_classifier'
wget https://tfhub.dev/google/aiy/vision/classifier/insects_V1/1?tf-hub-format=compressed -O insect_classifier.tar.gz
tar -xvf insect_classifier.tar.gz
rm insect_classifier.tar.gz
wget https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_insects_V1_labelmap.csv

# plant classifier
mkdir -p 'volumes/models/plant_classifier'
cd 'volumes/models/plant_classifier'
wget https://tfhub.dev/google/aiy/vision/classifier/plants_V1/1?tf-hub-format=compressed -O plant_classifier.tar.gz
tar -xvf plant_classifier.tar.gz
rm plant_classifier.tar.gz
wget https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_plants_V1_labelmap.csv
