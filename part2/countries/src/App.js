import logo from "./logo.svg";
import Countries from "./components/Countries";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState(undefined);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((resp) => setCountries(resp.data));
  }, []);

  return (
    <div className="App">
      {countries ? (
        <Countries countries={countries} />
      ) : (
        "Downloading countries data"
      )}
    </div>
  );
}

export default App;
