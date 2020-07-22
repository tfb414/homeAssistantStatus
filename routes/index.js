const express = require('express');
const router = express.Router();
const services = require('./services');

let homeStatus = {
  //true means open the good thing
  // garage door: true means it's closed
  // garageLight: true means it's off
  garageDoor: true,
  garageLight: true,
  button: true
};

router.get('/status/:entity', async (req, res) => {
  const status = await services.checkState(req.params.entity);
  res.sendStatus(status);
});

//This really should be a Remote Procedure call
router.get('/motionSensorActivated', async (req, res) => {
  const status = await services.checkState('group.great_room');
  if (status['state'] === 'off') {
    services.dimLights();
  }
  res.sendStatus(200);
});

router.get('/status', (req, res) => {
  res.send(homeStatus);
});

router.get('/stringStatus', (req, res) => {
  const stringedStatus = {
    garageDoor: homeStatus.garageDoor.toString(),
    garageLight: homeStatus.garageLight.toString(),
  }
  res.send(stringedStatus);
});

router.post('/turnOnLight', (req, res) => {
  res.send(200);
});

router.post('/garage', (req, res) => {
  console.log(req.body);
  homeStatus.garageDoor = convertStringToBoolean(req.body.garageDoor);
  homeStatus.garageLight = convertStringToBoolean(req.body.garageLight);
  res.sendStatus(200);
});

const convertStringToBoolean = (str) => {
  return str === 'true';
};


module.exports = router;
