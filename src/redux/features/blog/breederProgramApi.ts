import { baseApi } from "../../api/baseApi";


export const breederProgramApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upsertBreederProfile: builder.mutation({
      query: (data) => ({
        url: "/breeder-program/profile-pa",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BreederProfile"],
    }),
    getBreederProfile: builder.query({
      query: (userId: string) => ({
        url: `/breeder-program/profile-pa/${userId}`,
        method: "GET",
      }),
      providesTags: ["BreederProfile", "BlogLitter"],
    }),

  
    createBlogLitter: builder.mutation({
      query: (data) => ({
        url: "/breeder-program/blog-litter",
        method: "POST",
        body: data, 
      }),
      invalidatesTags: ["BlogLitter"],
    }),

    updateBlogLitter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/breeder-program/blog-litter/${id}`,
        method: "PATCH",
        body: data, 
      }),
      invalidatesTags: ["BlogLitter"],
    }),

    deleteBlogLitter: builder.mutation({
      query: (id: string = "") => ({
        url: `/breeder-program/blog-litter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BlogLitter"],
    }),

    getPaginatedLitters: builder.query({
      query: ({ userId, page = 1, limit = 10 }: { userId: string; page?: number; limit?: number }) => ({
        url: `/breeder-program/${userId}/litters?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["BlogLitter"],
    }),
  }),
});

export const {
  useUpsertBreederProfileMutation,
  useGetBreederProfileQuery,
  useCreateBlogLitterMutation,
  useUpdateBlogLitterMutation,
  useDeleteBlogLitterMutation,
  useGetPaginatedLittersQuery,
} = breederProgramApi;