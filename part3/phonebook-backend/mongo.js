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

const person = new Person({ name, number });
person.save().then(() => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});
