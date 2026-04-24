import { baseApi } from "@/redux/api/baseApi";


export const litterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Register New Litter (Supports Multipart/Form-Data)
    registerLitter: builder.mutation({
      query: (formData) => ({
        url: "/litters/register",
        method: "POST",
        body: formData, // FormData pathate hobe context theke
      }),
      invalidatesTags: ["Litter"],
    }),

    // 2. Get All Litters (with Search & Pagination)
    getLitters: builder.query({
      query: (params) => ({
        url: "/litters",
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          search: params?.search || undefined,
          breedCode: params?.breedCode || undefined,
          sortBy: params?.sortBy || "createdAt",
          sortOrder: params?.sortOrder || "desc",
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: string }) => ({
                type: "Litter",
                id,
              })),
              { type: "Litter", id: "LIST" },
            ]
          : [{ type: "Litter", id: "LIST" }],
    }),

    // 3. Get Single Litter Details
    getLitterDetails: builder.query({
      query: (litterId) => `/litters/${litterId}`,
      providesTags: (id) => [{ type: "Litter", id }],
    }),

    // 4. Update Litter
    updateLitter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/litters/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ({ id }) => [
        { type: "Litter", id },
        { type: "Litter", id: "LIST" },
      ],
    }),

    // 5. Admin Delete Litter
    deleteLitter: builder.mutation({
      query: (id) => ({
        url: `/litters/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Litter"],
    }),

    getMyLitters: builder.query({
      query: (params) => ({
        url: "/litters/my-litters/own",
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          search: params?.search || undefined,
          breedCode: params?.breedCode || undefined,
        },
      }),
      providesTags: ["Litter"],
    }),
  }),
});

export const {
  useRegisterLitterMutation,
  useGetLittersQuery,
  useGetLitterDetailsQuery,
  useUpdateLitterMutation,
  useDeleteLitterMutation,
  useGetMyLittersQuery,
} = litterApi;
