import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
//base for all api
// http://localhost:3000/
const uri = "http://localhost:5000/api/v1";
// const uri = "https://service-management-backend.vercel.app/api/v1"
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: uri,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user.token;

      if (token) {
        headers.set("authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Services",
    "singleService",
    "cart",
    "faq",
    "feedback",
    "Bookings",
    "users",
    "reviewRatings",
    "booking",
    "user",
    "faqs",
    "carts",
    "blog",
    "blogs",
    "feedbacks",
  ],
  endpoints: () => ({}),
});
