const dateFnsTimeZone = require('date-fns-timezone');
const dateFns = require('date-fns');

class DateService {
    constructor() {
        this.timeZone = 'America/Denver';
        this.pattern = 'D.M.YYYY HH:mm:ss.SSS';
    }

    getCurrentEpochDate() {
        return new Date();
    };

    convertTimeToHumanReadable(time) {
        return dateFnsTimeZone.formatToTimeZone(time, this.pattern, { timeZone: this.timeZone });
    };

    timeBetween(oldTime) {
        return dateFns.intervalToDuration({start: oldTime, end: this.getCurrentEpochDate()});
    }
}

module.exports = DateService;

