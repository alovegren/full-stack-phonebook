import axios from 'axios'

const baseUrl = '/api/persons';

const getPersons = () => (
  axios.get(baseUrl).then(response => response.data) 
);

const addPerson = newPerson => (
  axios.post(baseUrl, newPerson).then(response => response.data)
);

const deletePerson = id => (
  axios.delete(`${baseUrl}/${id}`).then(response => response.data)
);

const updatePerson = (id, newContact) => (
  axios.put(`${baseUrl}/${id}`, newContact).then(response => response.data)
);

export default { getPersons, addPerson, deletePerson, updatePerson };