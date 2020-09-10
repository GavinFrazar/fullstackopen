import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const responseToData = (promise) => promise.then((response) => response.data);

const create = (person) => {
  return responseToData(axios.post(baseUrl, person));
};

const update = (id, person) => {
  return responseToData(axios.put(`${baseUrl}/${id}`, person));
};

const getAll = () => {
  return responseToData(axios.get(baseUrl));
};

const remove = (id) => {
  return responseToData(axios.delete(`${baseUrl}/${id}`));
};

export default {
  create,
  update,
  getAll,
  remove,
};
