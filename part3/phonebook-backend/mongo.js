const mongoose = require("mongoose");
const [, , password, name, number] = process.argv;
const DB_URI = `mongodb+srv://fullstack:${password}@cluster0.ny7ua.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

const printUsage = () => {
  console.log(`Usage:
mongo.js PASSWORD    list all persons
mongo.js PASSWORD NAME NUMBER    add person NAME`);
  mongoose.connection.close();
};

const addPerson = (name, number) => {
  const newPerson = new Person({ name, number });
  newPerson.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

const printPeople = () => {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((p) => console.log(`${p.name} ${p.number}`));
    mongoose.connection.close();
  });
};

if (!name && !number) {
  printPeople();
} else if (!number || !name) {
  printUsage();
} else {
  addPerson(name, number);
}
