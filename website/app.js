/* Global Variables */
// OpenWeatherMap Base Url
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid='+config.API_KEY+'&units=imperial';

const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to generate button
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    const zipCode = zipInput.value;
    const feeling = feelingsInput.value;

    // Return if user didn't enter a zip code.
    if (zipCode.trim().length === 0) {
        alert('Please enter zipcode');
        return
    }

    getCurrentTemp(baseUrl, zipCode, apiKey)
    .then(function(data) {
        postWeatherData('/save', {
            temp: data,
            date: newDate,
            feeling: feeling
        });
    })
    .then(function() {
        retrieveData();
    });
};

/* Function to GET Weather Data from Web API*/
const getCurrentTemp = async(baseUrl, zipCode, apiKey) => {
    const url = baseUrl+zipCode+apiKey
    const result = await fetch(url)

    try {
        const data = await result.json();
        if (data.cod !== 200) {
            alert(data.message);
            return false;
        }
        return data.main.temp;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to POST data */
const postWeatherData = async(url = '', data = {}) => {
    await fetch(url, {
        method:'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

/* Function to GET Project Data */
const retrieveData = async() => {
    const request = await fetch('/all');
    
    try {
        // Transform into JSON
        const allData = await request.json();
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML = allData.feeling;
        document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
        console.log("error", error);
    }
}