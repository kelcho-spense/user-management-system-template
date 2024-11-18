// src/config/apiClient.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'  // Replace with your API base URL

const apiClient = axios.create({ baseURL: BASE_URL });

export default apiClient;
