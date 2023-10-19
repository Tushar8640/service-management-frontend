import { api } from "../../api/apiSlice";
///api for product operation
export const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (queryString) => ({
        url: `/bookings?${queryString}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getSingleBooking: builder.query({
      query: ( id ) => ({
        url: `/bookings/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["singleProduct"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Bookings", "singleProduct"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
    addBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useGetSingleBookingQuery,
} = bookingApi;
