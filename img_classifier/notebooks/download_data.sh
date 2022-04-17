####
# Original Data Source: https://github.com/visipedia/inat_comp/tree/master/2021
####
cd data

# download train mini
wget https://ml-inat-competition-datasets.s3.amazonaws.com/2021/train_mini.tar.gz
tar -xvf train_mini.tar.gz
rm train_mini.tar.gz

wget https://ml-inat-competition-datasets.s3.amazonaws.com/2021/train_mini.json.tar.gz
tar -xvf train_mini.json.tar.gz
rm train_mini.json.tar.gz

# download train
wget https://ml-inat-competition-datasets.s3.amazonaws.com/2021/train.tar.gz
tar -xvf train.tar.gz
rm train.tar.gz

wget https://ml-inat-competition-datasets.s3.amazonaws.com/2021/train.json.tar.gz
tar -xvf train.json.tar.gz
rm train.json.tar.gz

# download validation
wget https://ml-inat-competition-datasets.s3.amazonaws.com/2021/val.tar.gz
tar -xvf val.tar.gz
rm val.tar.gz

wget https://ml-inat-competition-datasets.s3.amazonaws.com/2021/val.json.tar.gz
tar -xvf val.json.tar.gz
rm val.json.tar.gz

# download test
wget https://ml-inat-competition-datasets.s3.amazonaws.com/2021/public_test.tar.gz
tar -xvf public_test.tar.gz
rm public_test.tar.gz
