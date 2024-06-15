import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerUser = async (userInfo) => {
  return axios.post(`${API_URL}/auth/register`, userInfo);
};

export const addService = async (serviceData, token) => {
  return axios.post(`${API_URL}/services`, serviceData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getServices = async (token) => {
  return axios.get(`${API_URL}/services`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
