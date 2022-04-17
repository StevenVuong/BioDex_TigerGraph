# build container
docker build -t img-lookup .
docker run -v $(pwd)/volumes:/app/volumes -p 80:80 -it --name imglookupcontainer img-lookup
