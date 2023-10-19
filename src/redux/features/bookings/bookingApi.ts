import {api} from "../../api/apiSlice";
///api for booking operation
export const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: `/bookings/getAll`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getBookingsByUser: builder.query({
      query: (user) => ({
        url: `/bookings/getAll/${user}`,
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["booking"],
    }),
    updateBookingStatus: builder.mutation({
      query: (data) => ({
        url: `/bookings/updateStatus`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings", "booking"],
    }),
    reScheduleBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings/reSchedule`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings", "booking"],
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings", "booking"],
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

export const {useAddBookingMutation, useDeleteBookingMutation, useGetBookingsQuery, useGetSingleBookingQuery, useUpdateBookingStatusMutation, useReScheduleBookingMutation, useGetBookingsByUserQuery} = bookingApi;
