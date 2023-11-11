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
    login: (values) => requests.post('/users/login', values),
    register: (values) => requests.post('/users/register', values),
  },
  Blog: {
    getPosts: () => requests.get('/posts'),
    getPostById: (id) => requests.get(`/posts/${id}`),
    deletePost: (id) => requests.delete(`/posts/${id}`),
    createPost: (post) => requests.post('/posts', post),
    updatePost: (id, post) => requests.put(`/posts/${id}`, post),
    postArticle: (article) => requests.post('/posts', article), // TODO: Exercise code to remove in the future
  },
  Users: {
    getAllUsers: () => requests.get('/users'),
    getUserById: (id) => requests.get(`/users/${id}`),
  },
  Category: {
    getCategories: () => requests.get('/categories'),
    getCategoryById: (id) => requests.get(`/categories/${id}`),
    createCategory: (category) => requests.post('/categories', category),
    updateCategory: (id, category) =>
      requests.put(`/categories/${id}`, category),
    deleteCategory: (id) => requests.delete(`/categories/${id}`),
  },
};

export default agent;
