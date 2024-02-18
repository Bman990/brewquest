import React, { useState } from 'react';
import '../Stylesheets/UE.css'


export const UE: React.FC = () => {
    const [userCity, setUserCity] = useState<string>('');
    const [breweries, setBreweries] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
  
    const handleSearch = async () => {
      try {
        // Reset error message
        setErrorMessage('');
  
        // Make the API request using userCity
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${userCity}&per_page=3`);
  
        if (!response.ok) {
          if (response.status === 404) {
            // Handle the case where the city is not found
            setErrorMessage('City not found');
          } else {
            // Handle other errors
            throw new Error(`Request failed with status: ${response.status}`);
          }
        }
  
        const data = await response.json();
  
        // Update the state with the brewery data
        setBreweries(data);
      } catch (error) {
        console.error('Error fetching breweries:', error);
  
        // Set a generic error message for other errors
        setErrorMessage('An error occurred while fetching data');
      }
    };
  
    return (
      <div className="UEContainer">
        <label htmlFor="cityInput" className="label">Enter your city:</label>
        <input
          type="text"
          id="cityInput"
          value={userCity}
          onChange={(e) => setUserCity(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="button">Search Breweries</button>
  
        {errorMessage && <p className="error">{errorMessage}</p>}
  
        {breweries.length > 0 && (
          <div>
            <h2 className="resultsHeader">Results:</h2>
            <ul className="resultsList">
              {breweries.map((brewery) => (
                <li key={brewery.id} className="resultItem">{brewery.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };