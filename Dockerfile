# syntax=docker/dockerfile:1.0.0-experimental

FROM node:14.9.0

WORKDIR /app

RUN mkdir /root/.ssh/

RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan -T 60 bitbucket.org >> /root/.ssh/known_hosts

COPY package.json /app

# With the experimental syntax defined at the top of the file it is possible
# to use --mount=type=ssh
# Before running docker build -> export DOCKER_BUILDKIT=1 in the client
# Before running docker-compose -> export COMPOSE_DOCKER_CLI_BUILD=1 in the client
RUN --mount=type=ssh npm install

COPY . /app
CMD ["npm", "run", "dev"]
