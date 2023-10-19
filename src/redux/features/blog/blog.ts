import {api} from "../../api/apiSlice";
///api for blog operation
export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: `/blogs/getAll`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
        // body: data,
      }),
      providesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blogs", "blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
    addBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {useGetBlogsQuery, useGetSingleBlogQuery, useUpdateBlogMutation, useAddBlogMutation, useDeleteBlogMutation} = blogApi;
