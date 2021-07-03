const axios = require('axios').default;
const queryString = require('querystring');

// Take a look at https://github.com/nkgilley/python-ecobee-api if you get tired of ecobee crappy docs

const ECOBEE_API_KEY = "2hwVYNtb1GGKm5kC9zBasdKcAzIsS7Z5";
const tokenUrl = "https://api.ecobee.com/home/token"

// Use pin to add the application to the ecobee website
// https://www.ecobee.com/home/developer/api/examples/ex1.shtml
// This should last for a year
const getEcobeeAuthCode = async (API_KEY) => {
    const url = `https://api.ecobee.com/authorize?response_type=ecobeePin&client_id=${API_KEY}&scope=smartWrite`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error){
        console.log(error)
    }
}

//check if the application was correctly authorized

const registerPin = async (API_KEY, authCode) => {
    const url = `${tokenUrl}?grant_type=ecobeePin&code=${authCode}&client_id=${API_KEY}`

    try {
        const response = await axios.post(url);
        return response;
    } catch(error){
        console.log(error)
    }

}

const getRefreshToken = async (apiKey, refreshToken) => {
    const url = `${tokenUrl}?grant_type=refresh_token&code=${refreshToken}&client_id=${apiKey}`;

    try {
        const response = await axios.post(url);
        return response;
    } catch(error){
        console.log(error)
    }
}

const getThermostats = async (accessToken) => {
    const thermostatSummaryOptions = {
        selection: {
            selectionType: 'registered',
            selectionMatch : null,
            includeSensors: "true",
            includeSettings: "true",
        }

    }
    var json = JSON.stringify(thermostatSummaryOptions)
    const url = `https://api.ecobee.com/1/thermostatSummary`
    console.log(url)
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization" : 'Bearer ' + accessToken,
                "Content-Type": "application/json;charset=UTF-8",
            },
            params: {json}
        });
        return response.data;
    } catch(error){
        console.log(error)
    }
}

const getThermostat = async (accessToken) => {
    const thermostatSummaryOptions = {
        selection: {
            selectionType: 'registered',
            selectionMatch : "210629205129",
            includeSensors: "true",
            includeSettings: "true",
        }

    }
    var json = JSON.stringify(thermostatSummaryOptions)
    const url = `https://api.ecobee.com/1/thermostat`
    console.log(url)
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization" : 'Bearer ' + accessToken,
                "Content-Type": "application/json;charset=UTF-8",
            },
            params: {json}
        });
        return JSON.stringify(response.data);
    } catch(error){
        console.log(error)
    }
}

// getThermostats('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJFWXhNVEpDT0Rnek9UaERRelJHTkRCRlFqZEdNVGxETnpaR1JUZzRNalEwTmtWR01UQkdPQSJ9.eyJpc3MiOiJodHRwczovL2F1dGguZWNvYmVlLmNvbS8iLCJzdWIiOiJhdXRoMHxkODY5N2U5MS1iYThhLTQzYTctOGM0MS00ODNlYWE2MWJhY2YiLCJhdWQiOlsiaHR0cHM6Ly9kZXZlbG9wZXItYXBwcy5lY29iZWUuY29tL2FwaS92MSIsImh0dHBzOi8vZWNvYmVlLXByb2QuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYyNTI2MDAyMSwiZXhwIjoxNjI1MjYzNjIxLCJhenAiOiIyaHdWWU50YjFHR0ttNWtDOXpCYXNkS2NBeklzUzdaNSIsInNjb3BlIjoib3BlbmlkIHNtYXJ0V3JpdGUgb2ZmbGluZV9hY2Nlc3MifQ.rbpzPCPY0w9tH5htg2Nthr23wWPvKE2W_SWUpDRbiOHqHStSUP67ossE4V5MUpOlgHNRMehhn5Kff0jv12uipUj2E31JVPEvp-sKgHIftJM_f6zDqUrwH51zv-JzGjNz9umQM4APwFnrvqFbfS7JaOsKR3VuiH_jVEmiVcT7ybTKtSjg8lE6LTCQqiJfFQHJzfG8JG-6Y6uV3sMNFSa9jS3V5MptUSeospTSC4P9jce95D5CGg9cYxn3zh1Kx2pZ1R3CP3TCwx86RI706tA1QSpg5hF3Lv9NUQSBeEUENW5yH63ycPLBxk0TP7yGAPHpB3onqt1iuTBQBgltdjGpTQ')
//     .then(res => console.log(res))

getThermostat('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJFWXhNVEpDT0Rnek9UaERRelJHTkRCRlFqZEdNVGxETnpaR1JUZzRNalEwTmtWR01UQkdPQSJ9.eyJpc3MiOiJodHRwczovL2F1dGguZWNvYmVlLmNvbS8iLCJzdWIiOiJhdXRoMHxkODY5N2U5MS1iYThhLTQzYTctOGM0MS00ODNlYWE2MWJhY2YiLCJhdWQiOlsiaHR0cHM6Ly9kZXZlbG9wZXItYXBwcy5lY29iZWUuY29tL2FwaS92MSIsImh0dHBzOi8vZWNvYmVlLXByb2QuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYyNTI2MDAyMSwiZXhwIjoxNjI1MjYzNjIxLCJhenAiOiIyaHdWWU50YjFHR0ttNWtDOXpCYXNkS2NBeklzUzdaNSIsInNjb3BlIjoib3BlbmlkIHNtYXJ0V3JpdGUgb2ZmbGluZV9hY2Nlc3MifQ.rbpzPCPY0w9tH5htg2Nthr23wWPvKE2W_SWUpDRbiOHqHStSUP67ossE4V5MUpOlgHNRMehhn5Kff0jv12uipUj2E31JVPEvp-sKgHIftJM_f6zDqUrwH51zv-JzGjNz9umQM4APwFnrvqFbfS7JaOsKR3VuiH_jVEmiVcT7ybTKtSjg8lE6LTCQqiJfFQHJzfG8JG-6Y6uV3sMNFSa9jS3V5MptUSeospTSC4P9jce95D5CGg9cYxn3zh1Kx2pZ1R3CP3TCwx86RI706tA1QSpg5hF3Lv9NUQSBeEUENW5yH63ycPLBxk0TP7yGAPHpB3onqt1iuTBQBgltdjGpTQ')
    .then(res => console.log(res))


//you'll need to make the authInfo call then go to myApps on ecobee.com and put that pin in
// then use the code from the response to get the access token and the response
// You should be able to use that refresh token for up to a year
const main = async () => {
    // const authInfo = await getEcobeeAuthCode(ECOBEE_API_KEY).then(console.log)
    // const accessToken = await registerPin(ECOBEE_API_KEY, 'oxzOFsd9unRugId7qGvWQRIj');
    // console.log(accessToken);
    // const refreshToken = 'YgIAgp3aKro_J-PcVMGH-0114JG0o_S8DMU0kxARPtERM';
    // const accessToken = await getRefreshToken(ECOBEE_API_KEY, refreshToken);
    // console.log(accessToken);
}

const getSomething = async () => {
    const url = 'https://api.ecobee.com/1/thermostat';
}
main();
