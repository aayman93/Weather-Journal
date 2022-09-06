/* Global Variables */
// OpenWeatherMap Base Url
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid='+config.API_KEY+'&units=imperial';

const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to generate button
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    const zipCode = zipInput.value;

    // Return if user didn't enter a zip code.
    if (zipCode.trim().length === 0) {
        alert('Please enter zipcode');
        return
    }

    getCurrentTemp(baseUrl, zipCode, apiKey);
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