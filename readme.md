# Piggy Bank
Simple expense tracker.

## Dependencies
- Vagrant (host)
- NodeJs (host|guest)

## Install

```sh
npm install
```

## Run

```sh
npm start
```

## Build docker image

```sh
# if you are inside vagrant you have to run this command first to become root user
sudo su
# otherwise just
docker build -t piggy-bank .
# then to run the docker container
docker run --name piggy-bank -p 80:80 -it piggy-bank
```

## Vagrant
if you don't have the tools installed on your computer (git, nodejs, docker, etc). Use the vagrant configuration instead and run the commands from within our VM.

- download zip
- unpack and move project folder to where you like
- (host) `vagrant up`
- (host) `vagrant ssh`
- (guest) `cd /vagrant`
- (guest) `git init`
- (guest) `git remote add origin https://github.com/awesome-devops-and-cd/piggy-bank.git`
- (guest) `git pull --rebase origin master`
