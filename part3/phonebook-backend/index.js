const express = require("express");

const PORT = 3001;
const app = express();

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, resp) => {
  return resp.json(persons);
});

app.get("/info", (req, resp) => {
  resp.send(`<!DOCTYPE html/>
<html>
<body>
<p>Phonebook has info for ${persons.length} people</p>
<p>${new Date()}</p>
</body>
</html>`);
});

app.get("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  const found = persons.find((p) => p.id === id);

  if (!found) {
    return resp.status(404).end();
  }

  return resp.json(found);
});

app.delete("/api/persons/:id", (req, resp) => {
  const id = Number(req.params.id);
  const oldLength = persons.length;
  persons = persons.filter((p) => p.id !== id);
  if (persons.length != oldLength) {
    console.log(`Removed person with id ${id}`);
  } else {
    return resp.status(404).end();
  }
});

app.listen(PORT, () => {
  console.log("Server running at " + PORT);
});
