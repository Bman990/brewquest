import '../Stylesheets/Home.css'
import beer from '/bbeer.png'
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
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
    return(

        <div className='homeSection'>

        <div className='homeContentDiv1'>
          <h1>Brew Quest</h1>
          <p>Discover unique flavors, cozy atmospheres, and the best craft spots in town. Start exploring and uncover the vibrant craft culture right in your city!</p>
  
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className='formStyle'>
            <label htmlFor="cityInput" className='label1Style'>Enter your city</label>
            <input
                className='input1Style'
              type="text"
              id="cityInput"
              placeholder="e.g., New York"
              value={userCity}
              onChange={(e) => setUserCity(e.target.value)}
            />
            <button type="submit" className='submitBtnStyle'>Search</button>
          </form>
  
          {errorMessage && <p>{errorMessage}</p>}
  
          {breweries.length > 0 && (
            <div>
              <ul className='resultsStyle2'>
                {breweries.map((brewery) => (
                  <li key={brewery.id} className='listStyle'>
                    <strong className='brewName'>{brewery.name}</strong>
                    <p className='brewInfo'>{brewery.street}, {brewery.city}, {brewery.state_province} {brewery.postal_code}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
  
        <div className='homeContentDiv2'>
        <motion.img 
          src={beer} 
          alt="Beer Mug 1" 
          className='mug1' 
          initial={{ opacity: 0, x: '-50%', y: '55%' }}
          animate={{ opacity: 1, x: 0, y: '55%' }}
          transition={{ duration: 0.5 }}
        />

        <motion.img 
          src={beer} 
          alt="Beer Mug 2" 
          className='mug2' 
          initial={{ opacity: 0, x: '50%', y: '55%' }}
          animate={{ opacity: 1, x: 0, y: '55%' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        </div>
      </div>
    )
}