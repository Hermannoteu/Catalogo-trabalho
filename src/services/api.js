import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/products',
  timeout: 10000,
});

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/category/${category}`);
    return response.data.products;
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};