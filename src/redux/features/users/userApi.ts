import {api} from "../../api/apiSlice";
///api for user operation
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    makeAdmin: builder.mutation({
      query: (email) => ({
        url: `/users/make-admin/${email}`,
        method: "POST",
      }),
      invalidatesTags: ["users", "user"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users", "user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user", "users"],
    }),
  }),
});

export const {useGetUsersQuery, useGetSingleUserQuery, useGetProfileQuery, useUpdateUserMutation, useMakeAdminMutation, useDeleteUserMutation} = userApi;
