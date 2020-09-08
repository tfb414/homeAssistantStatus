const express = require('express');
const router = express.Router();
const services = require('./services');

let homeStatus = {
  garageDoorClosed: true,
  garageLightOff: false,
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
  console.log('GET stringStatus:', convertStatusToString());
  console.log('hs', homeStatus);
  res.send(convertStatusToString());
});

router.post('/turnOnLight', (req, res) => {
  res.send(200);
});

router.post('/garage', (req, res) => {
  console.log(req.body);
  homeStatus.garageDoorClosed = convertStringToBoolean(req.body.garageDoorClosed);
  homeStatus.garageLightOff = convertStringToBoolean(req.body.garageLightOff);
  res.send(convertStatusToString());
});

const convertStringToBoolean = (str) => {
  return str === 'true';
};

const convertStatusToString = () => {
  return {
    garageDoorClosed: homeStatus.garageDoorClosed.toString(),
    garageLightOff: homeStatus.garageLightOff.toString(),
  };
};


module.exports = router;
