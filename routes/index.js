const express = require('express');
const router = express.Router();
const DateService = require('../services/date');

const dateService = new DateService();

let homeStatus = {
    button: true,
    garage: {
        doorClosed: true,
        lightOff: true,
        lastAlert: 0,
        healthCheck: dateService.getCurrentEpochDate(),
    }
};

router.get('/garageStatus', (req, res) => {
    res.send({
        garageDoorClosed: homeStatus.garage.doorClosed,
        garageLightOff: homeStatus.garage.lightOff,
    });
});

router.get('/healthCheck', (req, res) => {
    console.log('test');
    let timeSinceLastHealthCheck = dateService.timeBetween(homeStatus.garage.healthCheck);
    if (timeSinceLastHealthCheck.hours > 2 ) {
      //alert timmy or something
    }
    res.sendStatus(200);
});

router.get('/status', (req, res) => {
    res.send({
        ...homeStatus,
        garage: {
          ...homeStatus.garage,
          lastAlert: dateService.convertTimeToHumanReadable(homeStatus.garage.lastAlert),
          healthCheck: dateService.convertTimeToHumanReadable(homeStatus.garage.healthCheck)
        }
    });
});

router.get('/stringStatus', (req, res) => {
    console.log('GET stringStatus:', convertStatusToString());
    res.send(convertStatusToString());
});

router.post('/garage', (req, res) => {
    console.log(req.body);
    homeStatus.garage.doorClosed = convertStringToBoolean(req.body.garageDoorClosed);
    homeStatus.garage.lightOff = convertStringToBoolean(req.body.garageLightOff);
    res.send(convertStatusToString());
});

router.post('/garageAlert', (req, res) => {
    homeStatus.garage.lastAlert = dateService.getCurrentEpochDate();
    res.sendStatus(200);
});

router.post('/garageHealthCheck', (req, res) => {
    homeStatus.garage.healthCheck = dateService.getCurrentEpochDate();
    res.sendStatus(200);
});

const convertStringToBoolean = (str) => {
    return str === 'true';
};

const convertStatusToString = () => {
    return {
        garageDoorClosed: homeStatus.garage.doorClosed.toString(),
        garageLightOff: homeStatus.garage.lightOff.toString(),
    };
};
module.exports = router;
