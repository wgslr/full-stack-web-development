require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");
const { response } = require("express");

const PORT = process.env.PORT || 3001;
const MAX_ID = 1e9;

morgan.token("body", (req, resp) =>
  req.method == "POST" ? JSON.stringify(req.body) : ""
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const findByName = async (name) => {
  return await Person.findOne({ name });
};

app.get("/api/persons", (req, resp) => {
  Person.find({}).then((persons) => {
    resp.json(persons);
  });
});

app.get("/info", async (req, resp, next) => {
  try {
    const personCount = await Person.count();
    resp.send(`<!DOCTYPE html/>
<html>
<body>
<p>Phonebook has info for ${personCount} people</p>
<p>${new Date()}</p>
</body>
</html>`);
  } catch (err) {
    next(err);
  }
});

app.get("/api/persons/:id", async (req, resp, next) => {
  try {
    const id = req.params.id;
    const found = await Person.findById(id);

    if (found) {
      resp.json(found);
    } else {
      resp.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/persons", async (req, resp, next) => {
  try {
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
    if (await findByName(body.name)) {
      return resp.status(409).json({ error: "name must be unique" });
    }

    const newPerson = new Person({
      name: body.name,
      number: body.number,
    });
    const savedPerson = await newPerson.save();
    console.log("Created a new person:", savedPerson);
    return resp.status(201).json(savedPerson);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/persons/:id", async (req, resp, next) => {
  try {
    const id = req.params.id;

    const result = await Person.findByIdAndDelete(id);
    if (result) {
      console.log(`Removed person with id ${id}`);
      resp.status(204).end();
    } else {
      console.log("Person to be removed not found");
      resp.status(404).json({ error: "Person to be removed does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

app.put("/api/persons/:id", async (req, resp, next) => {
  try {
    const { name, number } = req.body;
    const person = { name, number };
    const updated = await Person.findByIdAndUpdate(req.params.id, person, {
      new: true,
    });
    if (updated) resp.json(updated);
    else resp.status(404).end();
  } catch (err) {
    next(err);
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running at " + PORT);
});
