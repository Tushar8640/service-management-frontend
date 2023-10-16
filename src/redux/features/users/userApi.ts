import {api} from "../../api/apiSlice";
///api for product operation
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
    }),

  }),
});

export const { useGetUsersQuery} = userApi;
