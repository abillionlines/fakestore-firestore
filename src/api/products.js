/*
Products API helpers
- Creates an Axios instance pointed at the Fake Store API.
- Exports `fetchProducts(category)` and `fetchCategories()` used by React Query
*/

import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const fetchProducts = async (category) => {
  const url =
    category && category !== "all"
      ? `/products/category/${category}`
      : "/products";
  const { data } = await api.get(url);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data;
};
