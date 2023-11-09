import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.request.use((config) => {
  // Example: Set up token (if necessary)
  // const token = ... // Logic to retrieve token
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Axios response interceptor
axios.interceptors.response.use(
  (response) => {
    // Add logic as needed (e.g., response handling, error handling)
    return response;
  },
  (error) => {
    // Error handling logic (e.g., based on status codes)
    // Remove things like toast.error
    return Promise.reject(error);
  }
);

// Axios requests
const requests = {
  get: (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  // Other necessary HTTP methods...
};

// Agent object with only the necessary functionalities
const agent = {
  Account: {
    login: (values) => requests.post('users/login', values),
    register: (values) => requests.post('users/register', values),
  },
  Blog: {
    getPosts: () => requests.get('/api/posts'),
    getPostById: (id) => requests.get(`/api/posts/${id}`),
    deletePost: (id) => requests.delete(`/api/posts/${id}`),
    createPost: (article) => requests.post('/api/posts', article),
    updatePost: (id, article) => requests.put(`/api/posts/${id}`, article),
    postArticle: (article) => requests.post('posts', article), // Example
  },
  // Other functionalities as needed (uncomment or add as required)
};

export default agent;
