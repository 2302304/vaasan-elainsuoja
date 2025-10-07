import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Hae kaikki eläimet
export const getAllAnimals = async () => {
  const response = await axios.get(`${API_URL}/animals`);
  return response.data;
};

// Hae yksittäinen eläin
export const getAnimalById = async (id) => {
  const response = await axios.get(`${API_URL}/animals/${id}`);
  return response.data;
};

// Lähetä adoptiohakemus
export const adoptAnimal = async (id, formData) => {
  const response = await axios.post(`${API_URL}/animals/${id}/adopt`, formData);
  return response.data;
};