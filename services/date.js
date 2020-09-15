const dateFnsTimeZone = require('date-fns-timezone');
const dateFns = require('date-fns');

class DateService {
    timeZone = 'America/Denver';
    pattern = 'D.M.YYYY HH:mm:ss.SSS';

    getCurrentEpochDate = () => {
        return new Date();
    }

    convertTimeToHumanReadable = (time) => {
        return dateFnsTimeZone.formatToTimeZone(time, this.pattern, { timeZone: this.timeZone });
    };

    timeBetween = (oldTime) => {
        const test = dateFns.intervalToDuration({start: oldTime, end: this.getCurrentEpochDate()});
        console.log(test);
        return test;
    }
}

module.exports = DateService;

