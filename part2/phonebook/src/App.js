import React, { useEffect, useState } from "react";
import axios from "axios";

const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const PersonForm = ({ onPersonCreated }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    onPersonCreated({
      name,
      number,
    });
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={(e) => setName(e.target.value)} value={name} />
      </div>
      <div>
        number:{" "}
        <input onChange={(e) => setNumber(e.target.value)} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ filter, setFilter }) => (
  <>
    Search: <input onChange={(e) => setFilter(e.target.value)} />
  </>
);

const Persons = ({ persons }) =>
  persons.map((p) => <Person {...p} key={p.name} />);

const pushPerson = async (person) => {
  const resp = await axios.post("http://127.0.0.1:3001/persons", person);
  return resp.data;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/persons")
      .then((resp) => setPersons(resp.data));
  }, []);

  const handleAdd = async (newPerson) => {
    if (persons.findIndex(({ name }) => name == newPerson.name) >= 0) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    const newPersonServer = await pushPerson(newPerson);
    console.log({ newPerson, newPersonServer });
    setPersons(persons.concat(newPersonServer));
  };

  const displayed = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm onPersonCreated={handleAdd} />
      <h2>Numbers</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Persons persons={displayed} />
    </div>
  );
};

export default App;
