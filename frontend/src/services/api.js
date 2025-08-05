import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API calls
export const productApi = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  getByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },
  create: async (product) => {
    const response = await api.post('/products', product);
    return response.data;
  },
  update: async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Raw Material API calls
export const rawMaterialApi = {
  getAll: async () => {
    const response = await api.get('/raw-materials');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/raw-materials/${id}`);
    return response.data;
  },
  getByCategory: async (category) => {
    const response = await api.get(`/raw-materials/category/${category}`);
    return response.data;
  },
  create: async (rawMaterial) => {
    const response = await api.post('/raw-materials', rawMaterial);
    return response.data;
  },
  update: async (id, rawMaterial) => {
    const response = await api.put(`/raw-materials/${id}`, rawMaterial);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/raw-materials/${id}`);
    return response.data;
  },
};

// Order API calls
export const orderApi = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  getById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
  create: async (order) => {
    const response = await api.post('/orders', order);
    return response.data;
  },
  updateStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, status);
    return response.data;
  },
  getByStatus: async (status) => {
    const response = await api.get(`/orders/status/${status}`);
    return response.data;
  },
  delete: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },
};

// Custom Product API calls
export const customProductApi = {
  create: async (customProduct) => {
    const response = await api.post('/custom-products', customProduct);
    return response.data;
  },
  calculatePrice: async (ingredients) => {
    const response = await api.post('/custom-products/calculate-price', ingredients);
    return response.data;
  },
};

export default api; 