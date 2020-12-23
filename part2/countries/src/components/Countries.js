import { useState } from "react";

const CountryName = ({ country: { name } }) => <p>{name}</p>;

const Countries = ({ countries }) => {
  const [filter, setFilter] = useState("");

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );
  console.log({ filtered });

  return (
    <div>
      Filter:{" "}
      <input onChange={(e) => setFilter(e.target.value)} value={filter} />
      {filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length > 1 ? (
        filtered.map((c) => <CountryName key={c.numericCode} country={c} />)
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Countries;
