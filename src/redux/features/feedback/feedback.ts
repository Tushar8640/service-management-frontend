import {api} from "../../api/apiSlice";
///api for feedback operation
export const feedbackApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: () => ({
        url: `/feedbacks`,
        method: "GET",
      }),
      providesTags: ["feedbacks"],
    }),
    getSingleFeedback: builder.query({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "GET",
        // body: data,
      }),
    }),

    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feedbacks"],
    }),
    addFeedback: builder.mutation({
      query: (data) => ({
        url: `/feedbacks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["feedbacks"],
    }),
  }),
});

export const {useGetFeedbackQuery, useGetSingleFeedbackQuery, useAddFeedbackMutation, useDeleteFeedbackMutation} = feedbackApi;
