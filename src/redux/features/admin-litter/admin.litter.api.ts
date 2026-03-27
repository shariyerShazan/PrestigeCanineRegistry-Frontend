/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";


export const litterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Litters with Query Params
    getAdminLitters: builder.query<any, any | void>({
      query: (query) => ({
        url: "/admin-litter/get-litters",
        method: "GET",
        params: query || {},
      }),
      providesTags: ["Litter"],
    }),

    // Get Single Litter by ID
    getAdminLitterById: builder.query<any, string>({
      query: (id) => ({
        url: `/admin-litter/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Litter", id }],
    }),

    // Update Litter
    updateAdminLitter: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/admin-litter/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ({ id }) => [
        "Litter", "Canine",
        { type: "Litter", id },
      ],
    }),

    // Delete Litter
    deleteAdminLitter: builder.mutation<any, string>({
      query: (id) => ({
        url: `/admin-litter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Litter"],
    }),
  }),
});

export const {
  useGetAdminLittersQuery,
  useGetAdminLitterByIdQuery,
  useUpdateAdminLitterMutation,
  useDeleteAdminLitterMutation,
} = litterApi;