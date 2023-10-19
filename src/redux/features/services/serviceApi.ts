import { api } from "../../api/apiSlice";
///api for product operation
export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (queryString) => ({
        url: `/services?${queryString}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getSingleServices: builder.query({
      query: ({ id }) => ({
        url: `/services/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["singleProduct"],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products", "singleProduct"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: `/services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useGetSingleServicesQuery,
} = productApi;
