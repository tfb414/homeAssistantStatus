const express = require('express');
const router = express.Router();
const DateService = require('../services/date');
const bradyBunch = require('../services/status');

const dateService = new DateService();

router.get('/garageStatus',  (req, res) => {
    const garageStatus = bradyBunch.getGarageStatus();
    res.send({
        garageDoorClosed: garageStatus.doorClosed,
        garageLightOff: garageStatus.lightOff,
    });
});

router.get('/healthCheck', (req, res) => {
    //this doesn't make any sense, the whole route
    const garageStatus = bradyBunch.getGarageStatus();
    const timeSinceLastHealthCheck = dateService.timeBetween(garageStatus.healthCheck);
    if (timeSinceLastHealthCheck.hours > 2 ) {
      //alert timmy or something
    }
    res.sendStatus(200);
});

router.get('/status', (req, res) => {
    const garageStatus = bradyBunch.getGarageStatus();
    const lastAlert = dateService.convertTimeToHumanReadable(garageStatus.lastAlert);
    res.send({
        garage: {
          ...garageStatus,
          lastAlert: garageStatus.lastAlert ? lastAlert : 0,
          healthCheck: dateService.convertTimeToHumanReadable(garageStatus.healthCheck)
        }
    });
});

router.post('/garage', (req, res) => {
    //apparently the arduino needs this to be a string
    bradyBunch.updateGarage({
        doorClosed: convertStringToBoolean(req.body.garageDoorClosed),
        lightOff: convertStringToBoolean(req.body.garageLightOff),
    })
    res.send(convertStatusToString());
});

router.post('/garageAlert', (req, res) => {
    bradyBunch.updateGarage({lastAlert: dateService.getCurrentEpochDate()})
    res.sendStatus(200);
});

router.post('/garageHealthCheck', (req, res) => {
    bradyBunch.updateGarage({healthCheck: dateService.getCurrentEpochDate()})
    res.sendStatus(200);
});

const convertStringToBoolean = (str) => {
    return str === 'true';
};

const convertStatusToString = () => {
    const garageStatus = bradyBunch.getGarageStatus();
    return {
        garageDoorClosed: garageStatus.doorClosed.toString(),
        garageLightOff: garageStatus.lightOff.toString(),
    };
};
module.exports = router;
