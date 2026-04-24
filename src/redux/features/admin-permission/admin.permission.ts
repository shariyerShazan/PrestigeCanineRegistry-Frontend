/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Permission {
  resource: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export const adminPermissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. My Permissions (Current User)
    getMyPermissions: builder.query<Permission[], string>({
      query: (userId) => `/admin-permissions/my-permissions?userId=${userId}`,
      providesTags: ["Permissions"],
    }),

    // 2. List Admins with Permissions
    listAdmins: builder.query<
      any,
      { page?: number; limit?: number; search?: string }
    >({
      query: (params) => ({
        url: "/admin-permissions/list",
        params,
      }),
      providesTags: ["AdminList"],
    }),

    // 3. Assign Single Permission
    assignPermission: builder.mutation<
      any,
      { adminId: string; body: Permission }
    >({
      query: ({ adminId, body }) => ({
        url: `/admin-permissions/assign/${adminId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminList"],
    }),

    // 4. Sync/Update All Permissions for an Admin
    syncPermissions: builder.mutation<
      any,
      { adminId: string; body: Permission[] }
    >({
      query: ({ adminId, body }) => ({
        url: `/admin-permissions/update/${adminId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["AdminList", "Permissions"],
    }),

    // 5. Revoke Specific Resource
    revokePermission: builder.mutation<
      any,
      { adminId: string; resource: string }
    >({
      query: ({ adminId, resource }) => ({
        // Resource-ke ensure kora hocche jate UpperCase thake
        url: `/admin-permissions/resource/${adminId}/${resource.toUpperCase()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminList"],
    }),

    getAllAdmins: builder.query<any[], void>({
      query: () => "/admin-permissions/admins",
      providesTags: ["AdminList"],
    }),

    deleteAllPermissions: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (adminId) => ({
        url: `/admin-permissions/all-admin/${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminList"],
    }),
  }),
});

export const {
  useGetMyPermissionsQuery,
  useListAdminsQuery,
  useAssignPermissionMutation,
  useSyncPermissionsMutation,
  useRevokePermissionMutation,
  useDeleteAllPermissionsMutation,
  useGetAllAdminsQuery,
} = adminPermissionApi;
