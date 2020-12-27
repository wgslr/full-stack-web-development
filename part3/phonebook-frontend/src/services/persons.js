import axios from "axios";

export const fetchAll = () =>
  axios.get("http://127.0.0.1:3001/persons").then((resp) => resp.data);

export const add = async (person) => {
  const resp = await axios.post("http://127.0.0.1:3001/persons", person);
  return resp.data;
};

export const overwrite = async (person) => {
  const resp = await axios.put(
    `http://127.0.0.1:3001/persons/${person.id}`,
    person
  );
  return resp.data;
};

export const remove = async (id) => {
  await axios.delete("http://127.0.0.1:3001/persons/" + id);
};
