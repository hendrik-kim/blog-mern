import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.request.use((config) => {
  // TODO: Auth with tokens is coming
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requests = {
  get: (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  delete: (url, id) => axios.delete(`${url}/${id}`).then(responseBody),
  put: (url, id, body) => axios.put(`${url}/${id}`, body).then(responseBody),
};

const agent = {
  Account: {
    login: (values) => requests.post('/api/users/login', values),
    register: (values) => requests.post('/api/users/register', values),
  },
  Blog: {
    getPosts: () => requests.get('/api/posts'),
    getPostById: (id) => requests.get(`/api/posts/${id}`),
    deletePost: (id) => requests.delete(`/api/posts/${id}`),
    createPost: (post) => requests.post('/api/posts', post),
    updatePost: (id, post) => requests.put(`/api/posts/${id}`, post),
    postArticle: (article) => requests.post('/posts', article), // TODO: Exercise code to remove in the future
  },
  Users: {
    getAllUsers: () => requests.get('/api/users'),
    getUserById: (id) => requests.get(`/api/users/${id}`),
  },
  Category: {
    getCategories: () => requests.get('/api/categories'),
    getCategoryById: (id) => requests.get(`/api/categories/${id}`),
    createCategory: (category) => requests.post('/api/categories', category),
    updateCategory: (id, category) =>
      requests.put(`/api/categories/${id}`, category),
    deleteCategory: (id) => requests.delete(`/api/categories/${id}`),
  },
};

export default agent;
