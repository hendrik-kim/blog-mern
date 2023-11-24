import axios from "axios";
import { store } from "../store/configureStore";
import { redirect } from "react-router-dom";
import { setErrorMessage } from "../slices/commonSlice";
import { signOutUser } from "../slices/accountSlice";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.response
  .use
  // (response) => {
  //   console.log('Response:', response);
  //   return response;
  // },
  // (error) => {
  //   console.log('Response Error:', error);
  //   return Promise.reject(error);
  // }
  ();

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error.response || {};
    const errorMessage = data?.message || "An unexpected error occurred"; // FIXME: When the server res data is undefined. Improvement required.
    switch (status) {
      case 400:
        store.dispatch(setErrorMessage(errorMessage)); // FIXME: Needs to be modified to fit front-end team requirements.
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
      case 500:
        store.dispatch(setErrorMessage(errorMessage));
        redirect("/server-error");
      default:
        store.dispatch(setErrorMessage(errorMessage));
    }

    if (!error.response) {
      store.dispatch(
        setErrorMessage("Network error or no response from server")
      );
    }

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
    login: (values) => requests.post("/users/login", values),
    signOut: () => requests.post("/users/signout"),
    register: (values) => requests.post("/users/register", values),
    googleLogin: () => {
      window.location.href = `${process.env.REACT_APP_API_URL}auth/google`;
    },
    validateSession: () => requests.get("/auth/validate"),
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
      requests.put(`/categories`, id, {
        id: id,
        name: category,
        description: category,
      }),
    deleteCategory: (id) => requests.delete(`/categories/`, id),
  },
};

export default agent;
