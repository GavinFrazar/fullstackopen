import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
import apiKey from "./api-key";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const all = "https://restcountries.eu/rest/v2/all";
    axios.get(all).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const results = countries.filter((country) =>
    country.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        find countries <input onChange={handleChange} value={query} />
      </form>
      <Results results={results} />
    </div>
  );
};

const Results = ({ results }) => {
  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (results.length > 1) {
    return <Countries countries={results} />;
  } else if (results.length === 1) {
    return <Country country={results[0]} />;
  } else {
    return <div>No matches</div>;
  }
};

const Countries = ({ countries }) => {
  return countries.map((country) => (
    <Country key={country.name} country={country} hidden />
  ));
};

const Country = (props) => {
  const { country } = props;
  const [hidden, setHidden] = useState(props.hidden);

  if (hidden) {
    return (
      <div>
        {country.name}
        <button onClick={() => setHidden(!hidden)}>show</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>{country.name}</h2>
        <div>capital: {country.capital}</div>
        <div>population: {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img
          src={country.flag}
          alt={`Flag of ${country.name}`}
          crossOrigin="anonymous"
          height="128"
          width="128"
        />
        <h2>Weather in {country.name}</h2>
        <Weather country={country.name} />
      </div>
    );
  }
};

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: apiKey,
          query: country,
          units: "m",
        },
        cancelToken: source.token,
      })
      .then((response) => {
        const newWeatherObj = response.data.current;
        setWeather(newWeatherObj);
      })
      .catch((err) => console.log(err.message));

    return () => {
      source.cancel("Unmounted component");
    };
  }, [country]);

  if (!weather) {
    return <div>No weather yet...</div>;
  } else {
    return (
      <div>
        <div>
          <b>temperature:</b> {weather.temperature} Celsius
        </div>
        {weather.weather_icons.map((icon) => (
          <img
            src={icon}
            alt={`Weather in ${country}`}
            height="64"
            width="64"
            key={icon}
          />
        ))}
        <div>
          <b>Wind:</b> {weather.wind_speed} km/h {weather.wind_dir}
        </div>
      </div>
    );
  }
};

export default App;
