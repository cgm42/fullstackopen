import React, {useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState("");
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${input}`) 
      .then((response) => {
        // console.log('response :>> ', response);
        setCountries(response.data)
      })
  }, [input]);

  const handleSearch = (event) => {
    setInput(event.target.value);
  }
const handleClick = (event) => {
  setInput(event.target.value);
}
  return (
    <div className="App">
     find countries 
     <input value={input} onChange={handleSearch}></input>
     <div>
      <Countries countries={countries} handleClick={handleClick}/>
     </div>
 
    </div>
  );
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    console.log('api_key :>> ', api_key);
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then((response) => {
        console.log('response :>> ', response);
        setWeather(response.data)
      })
  },[capital])
  console.log('weather :>> ', weather);
  return(
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b> {weather.current.temperature} celsius  </p>
      <img alt='weather_icon' src={weather.current.weather_icons} ></img>
      <p><b>wind:</b>     {weather.current.wind_speed} mph direction {weather.current.wind_dir}    </p>
    </div>
  )
}

const Countries = ({countries, handleClick}) => {
  //console.log('countries :>> ', countries);
  if(!countries){
    return(<div></div>)
  }
  if(countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }else if (countries.length > 1) {
    const divs = countries.map((e) => 
      <div> {e.name} 
      <button value={e.name} onClick={handleClick}>show</button>
      </div>)

    return (
      <div>
       {divs}
      </div>
     )
  }else if(countries.length === 1){
    // console.log('countries[0] :>> ', countries[0]);
    return (
      <DisplayCountry country={countries[0]}/>
    )
  }
}
export default App;

const DisplayCountry = ({country}) => {
  // console.log('country :>> ', country);
  return(
    <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    {country.languages.map((e) => 
      <div> {e.name} </div>
    )}
    <img alt='flag' src={country.flag} width='400'></img>
    <Weather capital={country.capital}/>
  </div>

  )
}