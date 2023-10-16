import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//base for all api
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/v1"}),
  tagTypes: ["Products", "singleProduct", "cart", "order", "orders"],
  endpoints: () => ({}),
});
