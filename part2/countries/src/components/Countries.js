import { useState } from "react";

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

const CountryDetails = ({ country }) => (
  <article>
    <h1>{country.name}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <LanguageList languages={country.languages} />
    <img src={country.flag} />
  </article>
);

const CountryInList = (props) => {
  const {
    country: { name },
    country,
  } = props;
  const [showDetails, setShowDetails] = useState(false);

  const toggle = () => {
    setShowDetails((old) => !old);
  };

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
      ) : filtered.length == 1 ? (
        <CountryDetails country={filtered[0]} />
      ) : (
        <p>No country matches the filter</p>
      )}
    </div>
  );
};

export default Countries;
