import {api} from "../../api/apiSlice";
//api for cart operation
export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCart: builder.query({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),

    deleteToCart: builder.mutation({
      query: (data) => ({
        url: `/cart/deleteProduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
    handleQuantity: builder.mutation({
      query: (data) => ({
        url: `/cart/handleQuantity`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {useGetSingleCartQuery, useAddToCartMutation, useDeleteToCartMutation, useHandleQuantityMutation} = cartApi;
