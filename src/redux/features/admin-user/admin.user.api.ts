// import { baseApi } from "./baseApi";

import { baseApi } from "@/redux/api/baseApi";

export const adminUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create User by Admin
    createUserByAdmin: builder.mutation({
      query: (userData) => ({
        url: "/admin-user/create",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // 2. Get All Users with Pagination & Filters
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/admin-user/get-users",
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          status: params?.status,
          isVerified: params?.isVerified,
          search: params?.search,
        },
      }),
      providesTags: ["User"],
    }),

    // 3. Get Single User Details (includes Permissions & Canines)
    getUserById: builder.query({
      query: (userId) => ({
        url: `/admin-user/get-users/${userId}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "User", id }],
    }),

    // 4. Approve User
    approveUser: builder.mutation({
      query: (userId) => ({
        url: `/admin-user/${userId}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // 5. Reject User
    rejectUser: builder.mutation({
      query: (userId) => ({
        url: `/admin-user/${userId}/reject`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // 6. Suspend User
    suspendUser: builder.mutation({
      query: (userId) => ({
        url: `/admin-user/${userId}/suspend`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin-user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserByAdminMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useApproveUserMutation,
  useRejectUserMutation,
  useSuspendUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = adminUserApi;
