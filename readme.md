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
