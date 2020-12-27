import axios from "axios";

const API_URL_PREFIX = "/api";

export const fetchAll = () =>
  axios.get(API_URL_PREFIX + "/persons").then((resp) => resp.data);

export const add = async (person) => {
  const resp = await axios.post(API_URL_PREFIX + "/persons", person);
  return resp.data;
};

export const overwrite = async (person) => {
  const resp = await axios.put(
    API_URL_PREFIX + `/persons/${person.id}`,
    person
  );
  return resp.data;
};

export const remove = async (id) => {
  await axios.delete(API_URL_PREFIX + "/persons/" + id);
};
