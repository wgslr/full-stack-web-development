import React, { useState } from "react";

const Person = ({ name }) => <p>{name}</p>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit" onSubmit={handleAdd}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <Person {...p} key={p.name} />
      ))}
    </div>
  );
};

export default App;
