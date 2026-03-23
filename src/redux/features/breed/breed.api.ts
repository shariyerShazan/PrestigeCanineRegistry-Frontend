import { baseApi } from "@/redux/api/baseApi";


export const breedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ৩. Create Breed
    createBreed: builder.mutation({
      query: (data) => ({
        url: "/admin/breeds",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Breed"],
    }),

    // ৪. Get All Breeds (Simple List)
    getAllBreeds: builder.query({
      query: () => ({
        url: "/admin/breeds",
        method: "GET",
      }),
      providesTags: ["Breed"],
    }),

    // ৫. Get Breeds with Pagination/Search
    getBreedsWithPagination: builder.query({
      query: (params) => ({
        url: "/admin/breeds/get-all/sort",
        method: "GET",
        params, // page, limit, search, sortBy, sortOrder
      }),
      providesTags: ["Breed"],
    }),

    // ৬. Get Single Breed
    getBreedById: builder.query({
      query: (breedId) => ({
        url: `/admin/breeds/${breedId}`,
        method: "GET",
      }),
      providesTags: (arg) => [{ type: "Breed", id: arg }],
    }),

    // ৭. Update Breed
    updateBreed: builder.mutation({
      query: ({ breedId, ...data }) => ({
        url: `/admin/breeds/${breedId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (arg) => [
        "Breed",
        { type: "Breed", id: arg.breedId },
      ],
    }),

    // ৮. Delete Breed
    deleteBreed: builder.mutation({
      query: (breedId) => ({
        url: `/admin/breeds/${breedId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Breed"],
    }),
  }),
});

export const {
  useCreateBreedMutation,
  useGetAllBreedsQuery,
  useGetBreedsWithPaginationQuery,
  useGetBreedByIdQuery,
  useUpdateBreedMutation,
  useDeleteBreedMutation,
} = breedApi;
