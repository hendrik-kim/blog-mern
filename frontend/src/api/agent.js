import axios from "axios";
import { redirect } from "react-router-dom";

import { store } from "../store/configureStore";
import { setErrorMessage } from "../slices/commonSlice";
import { globalErrors } from "../utils/error";
import { signOutUser } from "../slices/accountSlice";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.request.use(
  function (config) {
    // TODO: Modify the request config, add headers, if needed.
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response || {};
    const errorMessage = globalErrors[status] || globalErrors.default; // FIXME: When the server res data is undefined. Improvement required.
    switch (status) {
      case 400:
        store.dispatch(setErrorMessage(errorMessage));
        break;
      case 401:
        store.dispatch(setErrorMessage(errorMessage));
        store.dispatch(signOutUser());
        redirect("/login");
        break;
      // FIXME: A common error component will need to be created and routed.
      case 403:
        store.dispatch(setErrorMessage(errorMessage));
        redirect("/forbidden");
        break;
      case 404:
        store.dispatch(setErrorMessage(errorMessage));
        redirect("/not-found");
        break;
      case 409:
        //Specify the 409 error case to display corresponding error message to user.
        const error409Message = error.response.data.message;
        store.dispatch(setErrorMessage(error409Message));
        break;
      case 500:
        store.dispatch(setErrorMessage(errorMessage));
        redirect("/server-error");
        break;
      default:
        store.dispatch(setErrorMessage(errorMessage));
    }

    if (!error.response) {
      store.dispatch(
        setErrorMessage("Network error or no response from server")
      );

      return Promise.reject(error);
    }
  }
);

const requests = {
  get: (url, params) => axios.get(url, { params }).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  delete: (id) => axios.delete(`${id}`).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
};

const agent = {
  Account: {
    login: (values) => requests.post("/users/login", values),
    signOut: () => requests.post("/users/signout"),
    register: (values) => requests.post("/users/register", values),
    googleLogin: () => {
      window.location.href = `${process.env.REACT_APP_API_URL}auth/google`;
    },
    validateSession: () => requests.get("/auth/validate"),
    updateUser: (id, user) => requests.put(`/users/${id}`, user),
  },
  Blog: {
    getPosts: () => requests.get("/posts"),
    getPostById: (id) => requests.get(`/posts/${id}`),
    deletePost: (id) => requests.delete(`/posts/${id}`),
    createPost: (post) => requests.post("/posts", post),
    updatePost: (id, post) => requests.put(`/posts/${id}`, post),
    postArticle: (article) => requests.post("/posts", article), // TODO: Exercise code to remove in the future
  },
  Users: {
    getAllUsers: () => requests.get("/users"),
    getUserById: (id) => requests.get(`/users/${id}`),
  },
  Category: {
    getCategories: () => requests.get("/categories"),
    getCategoryById: (id) => requests.get(`/categories/${id}`),
    createCategory: (category) => requests.post("/categories", category),
    updateCategory: (id, category) =>
      requests.put(`/categories/${id}`, {
        id: id,
        name: category,
        description: category,
      }),
    deleteCategory: (id) => requests.delete(`/categories/${id}`),
  },
};

export default agent;
