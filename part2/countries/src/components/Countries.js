import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://api.weatherapi.com/v1";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const fetchWeather = async (city) => {
  console.log("fetching weather");
  const resp = await axios.get(API_URL + "/current.json", {
    params: {
      key: API_KEY,
      q: city,
    },
  });

  return resp.data.current;
};
const LanguageList = ({ languages }) => (
  <>
    <h2>Languages</h2>
    <ul>
      {languages.map((l) => (
        <li key={l.iso639_1}>{l.name}</li>
      ))}
    </ul>
  </>
);

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  console.log("Weather component");
  useEffect(() => {
    fetchWeather(city)
      .then((w) => {
        setWeather({
          icon: w.condition.icon,
          text: w.condition.text,
        });
      })
      .catch((err) => {
        console.error("weather", err);
        setError("Error fetching weather data");
      });
  }, []);

  return weather ? (
    <>
      <h2>Weather in {city}</h2>
      <p>{weather.text} </p>
      <img src={weather.icon} />
    </>
  ) : error ? (
    <p>{error}</p>
  ) : null;
};

const CountryDetails = ({ country }) => (
  <article>
    <h1>{country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <LanguageList languages={country.languages} />
    <img src={country.flag} />
    <Weather city={country.capital} />
  </article>
);

const CountryInList = (props) => {
  const {
    country: { name },
    country,
  } = props;
  const [showDetails, setShowDetails] = useState(false);

  const toggle = () => setShowDetails((old) => !old);

  return (
    <>
      <p>
        {name} <button onClick={toggle}>{showDetails ? "hide" : "show"}</button>
      </p>
      {showDetails ? <CountryDetails country={country} /> : null}
    </>
  );
};

const ManyCountries = ({ countries }) =>
  countries.map((c) => <CountryInList key={c.numericCode} country={c} />);

const Countries = ({ countries }) => {
  const [filter, setFilter] = useState("");

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      Filter:{" "}
      <input onChange={(e) => setFilter(e.target.value)} value={filter} />
      {filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length > 1 ? (
        <ManyCountries countries={filtered} />
      ) : filtered.length === 1 ? (
        <CountryDetails country={filtered[0]} />
      ) : (
        <p>No country matches the filter</p>
      )}
    </div>
  );
};

export default Countries;
