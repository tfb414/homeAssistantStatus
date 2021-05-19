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
        healthCheck: "",
    },
    fridge: {
        keg1Volume: 0,
        keg2Volume: 0,
    }
};

router.post('/kegVolume/', (req, res) => {
    //take in query param for which keg?
    const parsedKegVolume = parseInt(req.body.kegVolume);
    // if (req.volume )
    homeStatus.fridge.keg1Volume = parsedKegVolume;
    res.send({
        fridge: {
            keg1Volume: homeStatus.fridge.keg1Volume,
            keg2Volume: homeStatus.fridge.keg2Volume,
        }
    })
});


router.post('/resetKegVolume', (req, res) => {
   //take in query param to reset the volume of that keg to zero and interate the total number of kegs?
});

router.get('/garageStatus', (req, res) => {
    res.send({
        garageDoorClosed: homeStatus.garage.doorClosed,
        garageLightOff: homeStatus.garage.lightOff,
    });
});

router.get('/healthCheck', (req, res) => {
    const timeSinceLastHealthCheck = dateService.timeBetween(homeStatus.garage.healthCheck);
    if (timeSinceLastHealthCheck.hours > 2 ) {
      //alert timmy or something
    }
    res.sendStatus(200);
});

router.get('/status', (req, res) => {
    const lastAlert = dateService.convertTimeToHumanReadable(homeStatus.garage.lastAlert);

    res.send({
        ...homeStatus,
        garage: {
          ...homeStatus.garage,
          lastAlert: homeStatus.garage.lastAlert ? lastAlert : 0,
          healthCheck: dateService.convertTimeToHumanReadable(homeStatus.garage.healthCheck)
        }
    });
});

router.get('/stringStatus', (req, res) => {
    res.send(convertStatusToString());
});

router.post('/garage', (req, res) => {
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
