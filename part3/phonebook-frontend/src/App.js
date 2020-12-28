import React, { useEffect, useState } from "react";
import { overwrite, fetchAll, remove, add } from "./services/persons";

const Person = ({ id, name, number, onRemoved }) => {
  const handleRemove = () => {
    window.confirm(`remove ${name}?`) && onRemoved(id);
  };
  return (
    <p>
      {name} {number}
      <button onClick={handleRemove}>Remove</button>
    </p>
  );
};

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
    Search: <input onChange={(e) => setFilter(e.target.value)} value={filter} />
  </>
);

const Persons = ({ persons, onRemoved }) =>
  persons.map((p) => <Person {...p} key={p.name} onRemoved={onRemoved} />);

const Notification = ({ message, isGood }) => {
  const color = isGood ? "green" : "red";
  const style = {
    borderColor: color,
    borderWidth: "3px",
    borderStyle: "solid",
    background: "#d2d2d2",
    margin: "1em",
    color,
    padding: "0.3em",
  };
  return <div style={style}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAll().then((p) => setPersons(p));
  }, []);

  const displayMsg = (msg, isGood) => {
    setMessage({ message: msg, isGood });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleAdd = async (newPerson) => {
    const existing = persons.find(({ name }) => name == newPerson.name);
    let newPersonServer;
    if (existing !== undefined) {
      if (!window.confirm(`${newPerson.name} already exists. Update?`)) {
        return;
      }
      newPerson.id = existing.id;
      try {
        newPersonServer = await overwrite(newPerson);
        setPersons((old) =>
          old.map((p) => (p.id === newPersonServer.id ? newPersonServer : p))
        );
        displayMsg(`Updated ${newPersonServer.name}`, true);
      } catch (err) {
        console.error(err);
        displayMsg(
          `Updating person ${newPerson.id} failed: ${err.response.data.error}`,
          false
        );
      }
    } else {
      try {
        newPersonServer = await add(newPerson);
        setPersons(persons.concat(newPersonServer));
        displayMsg(`Added ${newPersonServer.name}`, true);
      } catch (err) {
        console.error(err);
        displayMsg(`Adding person failed: ${err.response.data.error}`, false);
      }
    }
    console.log({ newPerson, newPersonServer });
  };

  const onRemoved = async (id) => {
    try {
      await remove(id);
      setPersons((old) => old.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      displayMsg(
        `Removing person ${id} failed: ${err.response.data.error}`,
        false
      );
    }
  };

  const displayed = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? <Notification {...message} /> : null}
      <PersonForm onPersonCreated={handleAdd} />
      <h2>Numbers</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Persons persons={displayed} onRemoved={onRemoved} />
    </div>
  );
};

export default App;
