import './styles/styles.scss';
import { getGeoCoordinates, getWeatherForecast, getImageForLocation, renderTripDetails, calculateTripLength } from './js/app.js';

// Event listener for the travel form submission
document.getElementById('travelform').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieving user inputs
    const DestinationInput = document.getElementById('location').value;
    const TripStartDate = document.getElementById('startdate').value;
    const TripEndDate = document.getElementById('enddate').value;

    try {
        // Fetching coordinates, weather, and image data
        const locationCoordinates = await getGeoCoordinates(DestinationInput);
        
        let locationWeather = null;
        try {
            locationWeather = await getWeatherForecast(locationCoordinates.lat, locationCoordinates.lng);
        } catch (error) {
            console.warn('Error fetching weather:', error.message);
            locationWeather = 'Weather data unavailable';
        }

        let locationImage = null;
        try {
            locationImage = await getImageForLocation(DestinationInput);
        } catch (error) {
            console.warn('Error fetching image:', error.message);
            locationImage = 'default_image_url';
        }

        // Calculating the trip duration
        const TripLength = calculateTripLength(TripStartDate, TripEndDate);

        // Rendering the trip details on the page
        renderTripDetails(locationCoordinates, locationWeather, locationImage, TripStartDate, TripEndDate, TripLength);
        
    } catch (error) {
        console.error('An error occurred while fetching trip data:', error.message);
        alert('Failed to retrieve trip details. Please check your input and try again later.');
    }
});

