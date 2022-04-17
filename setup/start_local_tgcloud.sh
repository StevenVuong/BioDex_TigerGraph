# make data volume
mkdir tgcloud-data
chmod 777 tgcloud-data

# run container
docker run -d -p 14022:22 \
    -p 9000:9000 -p 14240:14240 --name tigergraph --ulimit nofile=1000000:1000000 \
    -v ~/tgcloud-data:/home/tigergraph/mydata \
    -t docker.tigergraph.com/tigergraph:3.0.5 

# ssh into; default password is `tigergraph``
ssh -p 14022 tigergraph@localhost

# start tgserver
gadmin start all
# to check graph studio locally; go to http://localhost:14240 

# stop container
gadmin stop all
