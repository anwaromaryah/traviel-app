//Function to find the coordinates and country name for the provided location
const getGeoCoordinates = async (destination) => {
    const geoResponse = await fetch(`http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=anwar00`);
    if (!geoResponse.ok) {
        throw new Error(`GeoNames API encountered an issue: ${geoResponse.status}`);
    }
    const geoData = await geoResponse.json();
    if (geoData.geonames && geoData.geonames.length > 0) {
        const { lat, lng, countryName } = geoData.geonames[0];
        return { lat, lng, countryName };
    } else {
        throw new Error('Destination not found');
    }
};

//Fetch weather information for specific coordinates with this function
const getWeatherForecast = async (latitude, longitude) => {
    const weatherResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=2cb8bd6f1c674097827985ab5b18bf9c`);
    const weatherData = await weatherResponse.json();
    return weatherData;
};

// Fetch an image of the given destination using the Pixabay API with this function
const getImageForLocation = async (destination) => {
    const imageResponse = await fetch(`https://pixabay.com/api/?key=45729861-06ad2fd56d38d8c1f38c897fb&q=${encodeURIComponent(destination)}&image_type=photo`);
    const imageData = await imageResponse.json();
    if (imageData.hits.length > 0) {
        return imageData.hits[0].webformatURL;
    } else {
        return 'default_image_url';
    }
};

// Determine the days left before the trip starts using this function
const calculateDaysUntilTrip = (tripStartDate) => {
    const tripDate = new Date(tripStartDate);
    const currentDate = new Date();
    const timeDifference = tripDate - currentDate;
    const daysUntilTrip = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysUntilTrip;
};

// Determine the trip length in days with this function
function calculateTripLength(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return Math.round(dayDifference) - 1; 
}


// Display trip information on the UI with this function
const renderTripDetails = (geoCoordinates, weatherForecast, locationImage, start, end, tripLength) => {
    const tripDetailsContainer = document.getElementById('trip-info');
    const daysUntilTrip = calculateDaysUntilTrip(start);

    tripDetailsContainer.innerHTML = `
      <h2>Journey to ${geoCoordinates.countryName}</h2>
      <img src="${locationImage}" alt="${geoCoordinates.countryName}" class="trip-img">
      <p>Trip Length: ${tripLength} days</p>
      <p>Departure Date: ${start}</p>
      <p>Return Date: ${end}</p>
      <p>Days until departure: ${daysUntilTrip}</p>
      <p>Weather Forecast: ${weatherForecast.data[0].temp}°C, ${weatherForecast.data[0].weather.description}</p>
    `;
};

export { getGeoCoordinates, getWeatherForecast, getImageForLocation, renderTripDetails, calculateTripLength };
