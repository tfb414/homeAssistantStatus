#HomeAssistantStatus

This repo is used to help some of my deployed Arduino's do less work which is why you'll see some strange rest practices. I didn't want to deal with writing c++ for those calls

## Setting up the Raspberry Pi

### Update / upgrade pi

`sudo apt-get update`
`sudo apt-get upgrade`

### Install node 
1. Find the right distribution of node that you'll need 
2. Try and find an LTS version. Currently on linux armv6

`wget https://nodejs.org/dist/v10.13.0/node-v10.13.0-linux-armv6l.tar.xz/`

To unzip:
`tar -xf node-v10.13.0-linux-armv6l.tar.xz`

Cd into the directory you just unzipped and copy all of that so that node is available on path

`cd node-v10.13.0-linux-armv6l.tarxz`
`sudo cp -R * /usr/local/`

Make sure it's all working correctly

`node -v`
`npm -v`

### Setting up the code

`git clone https://github.com/tfb414/homeAssistantStatus`

`npm install`

`npm start`



### Setup the pi

#### Vim
`sudo apt-get install vim`



