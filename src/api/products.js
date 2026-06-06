/*
Products API helpers
- Creates an Axios instance pointed at the Fake Store API.
- Exports `fetchProducts(category)` and `fetchCategories()` used by React Query
*/

import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

const handleAxiosError = (err) => {
  const message =
    err?.response?.data?.message ||
    err?.response?.statusText ||
    err?.message ||
    "Request failed";
  const error = new Error(message);
  if (err?.response?.status) error.status = err.response.status;
  throw error;
};

export const fetchProducts = async (category) => {
  try {
    const url =
      category && category !== "all"
        ? `/products/category/${category}`
        : "/products";
    const { data } = await api.get(url);
    return data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await api.get("/products/categories");
    return data;
  } catch (err) {
    handleAxiosError(err);
  }
};
