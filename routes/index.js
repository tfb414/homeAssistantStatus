const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const services = require('./services')

let homeStatus = {
  garage: true,
  button: true
};

router.get('/status/:entity', async (req, res) => {
  const status = await services.checkState(req.params.entity);
  res.sendStatus(status);
});

//This really should be a Remote Procedure call
router.get('/motionSensorActivated', async (req, res) => {
  console.log('inside')
  const status = await services.checkState('group.great_room');
  if (status['state'] === 'off') {
    services.dimLights();
  }
  res.sendStatus(200);
});

router.post('/status', (req, res) => {
  res.send(homeStatus);
});

router.post('/turnOnLight', (req, res) => {
  res.send(200);
})

module.exports = router;
