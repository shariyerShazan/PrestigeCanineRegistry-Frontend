import { baseApi } from "@/redux/api/baseApi";


export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Canine Endpoints ---
    getAdminCanines: builder.query({
      query: (params) => ({
        url: "/admin-canine/get-canines",
        params,
      }),
      providesTags: ["Canine", "Litter"],
    }),
    getAdminCanineById: builder.query({
      query: (id) => `/admin-canine/${id}`,
      providesTags: (id) => [{ type: "Canine", id }],
    }),
    updateAdminCanine: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin-canine/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ({ id }) => ["Canine", { type: "Canine", id }],
    }),
    deleteAdminCanine: builder.mutation({
      query: (id) => ({
        url: `/admin-canine/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Canine"],
    }),
  }),
});

export const {
  useGetAdminCaninesQuery,
  useGetAdminCanineByIdQuery,
  useUpdateAdminCanineMutation,
  useDeleteAdminCanineMutation,
} = adminApi;