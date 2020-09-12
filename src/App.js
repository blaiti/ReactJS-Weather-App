import React, {useState, useEffect} from 'react';

// API details
const API = {
  key: '2e44c34d496138d586d497a1b76cb42d',
  base: 'https://api.openweathermap.org/data/2.5/'
}

// Date Builder from curent date
const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

function App() {
  // States initializing
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [start, setStart] = useState(true);


  // Get the current position & Fetch the current weather
  useEffect(() => {
    if(start == true) {
      navigator.geolocation.getCurrentPosition(function(position) {
        fetch(`${API.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setStart(false);
          console.log(weather);
        });
      });
    }
  });

  // Fetch current weather when press enter key
  const searchKey = evt => {
    if (query != '') {
      if (evt.key === 'Enter') {
        fetch(`${API.base}weather?q=${query}&units=metric&appid=${API.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(weather);
        });
      }
    }
    else {
      alert('You must put a city or a country !');
    }
  }

  // Fetch current weather when press search button
  const searchBtn = () => {
    if (query != '') {
      fetch(`${API.base}weather?q=${query}&units=metric&appid=${API.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setWeather(result);
        console.log(weather);
      });
    }
    else {
      alert('You must put a city or a country !');
    }
  }

  return (
    <div className="app">
      <main>
        {/* Search box */}
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search.." 
            className="search-bar"
            onKeyPress={searchKey}
            value={query}
            onChange={e => setQuery(e.target.value)} />
          <button className="search-btn" onClick={searchBtn}>Search</button>
        </div>

        {/* Weather box */}
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>  
              <div className="date">{dateBuilder(new Date())}</div> 
            </div>   

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>  
              <div className="weather">{weather.weather[0].main}</div> 
            </div> 
          </div>
        ) : ('') }
      </main>
    </div>
  );
}

export default App;
