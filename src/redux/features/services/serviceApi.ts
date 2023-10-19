import {api} from "../../api/apiSlice";
///api for product operation
export const serviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (queryString) => ({
        url: `/services?${queryString}`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
    getSingleService: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["singleService"],
    }),
    updateService: builder.mutation({
      query: ({id, data}) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Services", "singleService"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: `/services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    addReviews: builder.mutation({
      query: (data) => ({
        url: `/reviewRatings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    getReviews: builder.query({
      query: (id) => ({
        url: `/reviewRatings/getByService/${id}`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),
  }),
});

export const {useAddServiceMutation, useDeleteServiceMutation, useGetServicesQuery, useGetSingleServiceQuery, useUpdateServiceMutation, useAddReviewsMutation, useGetReviewsQuery} = serviceApi;
