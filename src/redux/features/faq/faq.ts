import {api} from "../../api/apiSlice";
///api for faq operation
export const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => ({
        url: `/faq`,
        method: "GET",
      }),
      providesTags: ["faqs"],
    }),
    getSingleFaq: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: (data) => ({
        url: `/faq`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faqs", "faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faqs"],
    }),
    addFaq: builder.mutation({
      query: (data) => ({
        url: `/faq`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faqs"],
    }),
  }),
});

export const {useGetFaqsQuery, useGetSingleFaqQuery, useUpdateFaqMutation, useDeleteFaqMutation, useAddFaqMutation} = faqApi;
