const express = require("express");
const morgan = require("morgan");

const PORT = 3001;
const MAX_ID = 1e9;

morgan.token("body", (req, resp) =>
  req.method == "POST" ? JSON.stringify(req.body) : ""
);

const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

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

const generateId = () => {
  return Math.floor(Math.random() * MAX_ID);
};

const findByName = (name) => {
  return persons.find((p) => p.name == name) || null;
};

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

app.post("/api/persons", (req, resp) => {
  const body = req.body;
  if (!body) {
    return resp.status(400).json({ error: "empty payload" });
  }

  if (!body.name) {
    return resp.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return resp.status(400).json({ error: "number missing" });
  }
  if (findByName(body.name)) {
    return resp.status(409).json({ error: "name must be unique" });
  }

  const id = generateId();
  const newPerson = {
    id,
    name: body.name,
    number: body.number,
  };
  persons.push(newPerson);
  console.log("Created a new person:", newPerson);
  return resp.status(201).json(newPerson);
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
  resp.status(204).end();
});

app.listen(PORT, () => {
  console.log("Server running at " + PORT);
});
