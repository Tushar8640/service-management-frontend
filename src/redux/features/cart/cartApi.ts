import {api} from "../../api/apiSlice";
//api for cart operation
export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCart: builder.query({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/carts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),

    deleteToCart: builder.mutation({
      query: (data) => ({
        url: `/carts/deleteProduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    handleQuantity: builder.mutation({
      query: (data) => ({
        url: `/carts/handleQuantity`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {useGetSingleCartQuery, useAddToCartMutation, useDeleteToCartMutation, useHandleQuantityMutation} = cartApi;
