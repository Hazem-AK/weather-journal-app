/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

let key = 'b1e6472eaeac8689b6adff213b482502';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

//Listener add function
document.getElementById('generate').addEventListener('click', performAction);

// function called by event listener
function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  console.log(newDate);
  getTemperature(baseURL, zipCode, key).then(function (data) {
    // Add data to POST request
    console.log(data);

    postData('/addWeatherData', {
      date: newDate,
      temperature: Math.round(data.main.temp),
      user_content: feelings,
    })
      // Function which updates UI
      .then(function () {
        updateUI();
      });
  });
}

// Async GET
const getTemperature = async (baseURL, code, key) => {
  const response = await fetch(
    baseURL + code + ',us' + '&APPID=' + key + '&units=metric'
  );
  console.log(response);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// Async POST
const postData = async (url = '', data = {}) => {
  console.log(data);
  const postRequest = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await postRequest.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Update user interface
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log('TEMP');

    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
    document.getElementById('content').innerHTML = `Feeling: ${allData.user_content}`;
  } catch (error) {
    console.log('error', error);
  }
};
