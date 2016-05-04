#!/bin/bash -x

# docker-machien
curl -L https://github.com/docker/machine/releases/download/v0.6.0/docker-machine-`uname -s`-`uname -m` > docker-machine
chmod +x docker-machine
sudo cp -f docker-machine /usr/local/bin/docker-machine
rm -f docker-machine

# docker-compose
curl -L https://github.com/docker/compose/releases/download/1.7.0/docker-compose-`uname -s`-`uname -m` > docker-compose
chmod +x docker-compose
sudo cp -f docker-compose /usr/local/bin/docker-compose
rm -f docker-compose
