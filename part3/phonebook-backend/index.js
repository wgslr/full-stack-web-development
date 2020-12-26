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
  resp.json(persons);
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

app.listen(PORT, () => {
  console.log("Server running at " + PORT);
});
