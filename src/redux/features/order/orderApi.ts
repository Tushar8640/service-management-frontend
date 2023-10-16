import {api} from "../../api/apiSlice";
//api for order operation
export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["order"],
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: `/order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),

    getAllOrder: builder.query({
      query: (id) => ({
        url: `/order/allorder/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({data, id}) => ({
        url: `/order/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    makePayment: builder.mutation({
      query: (data) => ({
        url: `/init`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["orders"],
    }),
  }),
});

export const {useAddOrderMutation, useGetAllOrderQuery, useGetSingleOrderQuery, useUpdateOrderMutation, useMakePaymentMutation} = orderApi;
