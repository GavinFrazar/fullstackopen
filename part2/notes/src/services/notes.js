import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const responseToData = (promise) => promise.then((response) => response.data);

const getAll = () => {
  return responseToData(axios.get(baseUrl));
};

const create = (newObject) => {
  return responseToData(axios.post(baseUrl, newObject));
};

const update = (id, newObject) => {
  return responseToData(axios.put(`${baseUrl}/${id}`, newObject));
};

export default {
  getAll,
  create,
  update,
};
