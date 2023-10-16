import {api} from "../../api/apiSlice";
///api for product operation
export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryString) => ({
        url: `/products?${queryString}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query({
      query: ({id}) => ({
        url: `/products/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["singleProduct"],
    }),
    updateProduct: builder.mutation({
      query: ({id, data}) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products", "singleProduct"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useGetSingleProductQuery, useUpdateProductMutation} = productApi;
