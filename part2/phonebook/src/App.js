import React, { useState } from "react";

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [filter, setFilter] = useState("");

  const handleAdd = (newPerson) => {
    if (persons.findIndex(({ name }) => name == newPerson.name) >= 0) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
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
