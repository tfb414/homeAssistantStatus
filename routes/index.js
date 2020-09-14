const express = require('express');
const router = express.Router();

//currently set to the wrong time zone should be -06:00 or something;
let getDate = () => {
  let date = new Date();
  let now = date.getTime();
  console.log("The current epoch time is: ", now);
  return now;
};

let homeStatus = {
  garageDoorClosed: true,
  garageLightOff: false,
  button: true,
  garageDoorAlert: getDate(),
};



router.get('/status', (req, res) => {
  res.send({
    garageDoorClosed: homeStatus.garageDoorClosed,
    garageLightOff: homeStatus.garageLightOff,
  });
});

router.get('/stringStatus', (req, res) => {
  console.log('GET stringStatus:', convertStatusToString());
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

router.post('/garageAlert', (req, res) => {
  const date = getDate();
  console.log(date);
  homeStatus.garageDoorAlert = date;
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
