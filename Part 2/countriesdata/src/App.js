import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
// variable api_key has now the value set in startup

const DisplaySingleCountry = ({singleCountry}) =>{
  const [weatherData, setWeatherData] = useState({});
  const lat = singleCountry.capitalInfo.latlng[0];
  const lon = singleCountry.capitalInfo.latlng[1];
  const weatherApi = () => {
    const promise = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    );
    promise
      .then((response) => {
        let data = response.data;
        setWeatherData({
          temp: data.main.temp,
          icon: data.weather[0].icon,
          wind: data.wind.speed
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (Object.keys(weatherData).length == 0) {
    weatherApi();
  }

  return(
    <div>
      <h2>{singleCountry.name.common}</h2>
      <div>capital {singleCountry.capital}</div>
      <div>area {singleCountry.area}</div>
      <h3>languages</h3>
      <div><ul>{Object.values(singleCountry.languages).map(value => <li key={value}>{value}</li>)}</ul></div>
      <img src={singleCountry.flags.png} style={{width: 175}}/>

      <h2>Weather in {singleCountry.capital[0]}</h2>
      <p>temperature {weatherData.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}></img>
      <p>wind {weatherData.wind} m/s</p>
    </div>
  )
}

const DisplayMultiCountries = ({country}) => {
  const [selectCountries, setSelectCountries] = useState(false)
  const handleSelectCountries = () => {setSelectCountries(true)}
  if(selectCountries){
    return(<div><DisplaySingleCountry singleCountry={country}/></div>)
  }else{
    return(<div> {country.name.common} <button onClick={handleSelectCountries}>show</button></div>)
  }
}

const ShowCountries = ({shownCountries}) =>{
  if (shownCountries.length > 10){
    return(<div>Too many matches, specify another filter</div>)
  }else if( shownCountries.length > 1 && shownCountries.length <= 10 ){
    return (
    <div>
      {shownCountries.map(value => 
      //   <div key={value.name.common}>{value.name.common}</div>
      // )}
        <DisplayMultiCountries key={value.name.common} country={value}/>
      )}
    </div>)
  }else if(shownCountries.length == 1){
    return(
      // <div>
      //   <h2>{shownCountries[0].name.common}</h2>
      //   <div>capital {shownCountries[0].capital}</div>
      //   <div>area {shownCountries[0].area}</div>
      //   <h3>languages:</h3>
      //   <div><ul>{Object.values(shownCountries[0].languages).map((value) => <li key={value}>{value}</li>)}</ul></div>
      //   <img src={shownCountries[0].flags.png} style={{width: 175}}/>
      // </div> 
      <DisplaySingleCountry singleCountry={shownCountries[0]}/>
    )
  }else{
    return(<div></div>)
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  },[])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const shownCountries = (search == "") ? countries : countries.filter(value => value.name.common.toLowerCase().includes(search.toLowerCase()))

  return(
    <div>
      <div>find countries <input value={search} onChange={handleSearch}/></div>
      <div><ShowCountries shownCountries={shownCountries}/></div>
    </div>
  )
}

export default App;
