Docker must be 18.09 or higher

To enable docker BuildKit by default, set daemon configuration in 
`/etc/docker/daemon.json` feature to true and restart the daemon:

```
{
	"debug": true,
	"experimental": true,
	"features": { "buildkit": true }
}
```

Also possible to set manually every time before building with:
```
export DOCKER_BUILDKIT=1
```

Restart Docker deamon `dockerd`
```
sudo docker service status
sudo docker service stop
sudo docker service start
sudo docker service restart
```

Docker compose must be version 1.25.1 or higher


In order to start developing use:

### with docker-compose

First time
```
COMPOSE_DOCKER_CLI_BUILD=1 docker-compose up --build
```

After built
```
docker-compose up
```


### with Docker

First time, build an image.
The command `--ssh default` will pass to the installer the default ssh key of the client
```
docker build --ssh default -t urn-lib:0.0.1 .
```

Create and start a container with its own node_modules folder
```
docker run -it -v $(pwd):/app -v /app/node_modules/ --network="host" urn-lib:0.0.1
```

Start the container
```
docker start -i container_name
```

