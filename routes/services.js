const fetch = require('node-fetch');
require('dotenv').config({ path: 'secrets/home_assistant_s3cr3ts.env' });

const checkState = async (entityId) => {
  return await fetch(`http://192.168.1.83:8123/api/states/${entityId}`,
    {
      headers: buildHeaders(),
    }).then(res => res.json())
}

const dimLights = () => {
  const lightsToTurnOn = ['light.hue_color_lamp_2', 'light.kitchen_island_pendants']
  lightsToTurnOn.forEach((light) => {
    turnOnLight(light);
  })
};

const turnOnLight = (entityId) => {
  const body = {
    "entity_id": entityId,
    "brightness_pct": 30
  }

  fetch('http://hassio.local:8123/api/services/light/turn_on', {
    method: 'post',
    body: JSON.stringify(body),
    headers: buildHeaders()
  })
}

const buildHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-ha-access': process.env.HOME_ASSISTANT_ID
  }
};

module.exports = {
  checkState,
  dimLights
}