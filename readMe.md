# HomeAssistantStatus

This repo is used to help some of my deployed Arduino's do less work which is why you'll see some strange rest practices. I didn't want to deal with writing c++ for those calls

## Setting up the Raspberry Pi

### Headless setup

1. Flash the sd card with image
2. Navigate to sd card `touch ssh` to enable ssh
3. `touch wpa_supplicant.conf` and copy the below into that file to setup wifi

`ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="your network"
    psk="password"
}`

### Update / upgrade pi

`sudo apt-get update`

`sudo apt-get upgrade`

### Install node 
1. Find the right distribution of node that you'll need 
2. Try and find an LTS version. Currently on linux armv6

`wget https://nodejs.org/dist/v14.17.0/node-v14.17.0-linux-arm64.tar.xz`

To unzip:
`tar -xf node-v14.17.0-linux-arm64.tar.xz`

Cd into the directory you just unzipped and copy all of that so that node is available on path

`cd node-v14.17.0-linux-arm64/`

`sudo cp -R * /usr/local/`

Make sure it's all working correctly

`node -v`

`npm -v`

### Setting up the code

`git clone https://github.com/tfb414/homeAssistantStatus` 

`npm install`

`npm start`

### Auto start

`sudo cp homeAssistantStatus.service /etc/systemd/system/homeAssistantService.service`

`sudo systemctl daemon-reload`
`sudo systemctl enable homeAssistantStatus.service`
`sudo systemctl start homeAssistantStatus.service`

Check if it's working correcty

`sudo systemctl status homeAssistantStatus.service`

If having issues look into running this through init.d Check google drive 

### Setup the pi

#### Vim
`sudo apt-get install vim`

###Logging
To tail the logs from the raspberry pi
`tail -f /var/log/syslog`

## Future Improvements

1. Add MongoDB to save stats for when my Raspi restarts
2. Setup Physical devices to display data
3. For the love add Tmux so you can attach to the session please



