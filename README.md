In order to start developing use:

### with docker-compose

First time
```
docker-compose up --build .
```

After built
```
docker-compose up
```

### with Docker

First time, build an image
```
docker build -t urn-lib:0.0.1 .
```

Create and start a container with its own node_modules folder
```
docker run -it -v $(pwd):/app -v /app/node_modules/ --netwrk="host" urn-lib:0.0.1
```

Start the container
```
docker start -i container_name
```

