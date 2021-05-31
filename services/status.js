const DateService = require('./date');

const dateService = new DateService();

class BradyBunch {
    constructor(){
        this.garage = {
            doorClosed: true,
            lightOff: true,
            lastAlert: 0,
            healthCheck: 0,
        }
    };

    getGarageStatus = () => {
        return this.garage;
    }

    updateGarage = (newGarage) => {
        this.garage = {
            ...this.garage,
            ...newGarage,
        }
    }
}

const bradyBunch = new BradyBunch();

module.exports = bradyBunch;
