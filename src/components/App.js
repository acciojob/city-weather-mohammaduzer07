import React, { useEffect, useState } from "react";
import './../styles/App.css';
import "regenerator-runtime/runtime"

const App = () => {

  const [input, setInput] = useState("")
  const [city, setCity] = useState("")
  const [error, setError] = useState(false)
  const [weather, setWeather] = useState({})

  const API_KEY = "4deb9dcaf8bafa8ecfe2be9e9c7d02ca";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  
  const fetchWeather = () =>{
    try {
      const resp =  fetch(url)
      const data = resp.json();
      setWeather(data)
      setError("")
    } catch (error) {
      console.log("error fetching data",error)
      setError("Error fethching data, please try again")
      setWeather({})
    }
  }
  
  useEffect(() =>{

    fetchWeather()
    console.log("called fetchAPI");

  }, [city])
  
  const handleSearch = (e) =>{
    setInput(e.target.value)
  }

  const handleDisplay = () =>{
    setCity(input)
    setInput("");
  }


  return (
    <div className="main" id="main">
      <div className="search">
        <input type="text" value={input} onChange={handleSearch}/>
        <button onClick={handleDisplay}>Search</button>
      </div>
      <div className="weather">
        {error && <h2>{error}</h2>}
        {!error && weather.main && (
          <>
            <h1>{city}</h1>
            <h2>{weather.main.temp}</h2>
            <h3>{weather.weather[0].description}</h3>
            <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
            alt="cloud image"/>
          </>
        )}

      </div>
      <button></button>
    </div>
  )
}

export default App
