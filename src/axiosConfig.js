// src/axiosConfig.js

import axios from 'axios';

// Set the base URL for all Axios requests
axios.defaults.baseURL = 'https://katigprototypeapi.netlify.app/.netlify/functions/app';

// Set the default Authorization header using the token stored in localStorage
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
