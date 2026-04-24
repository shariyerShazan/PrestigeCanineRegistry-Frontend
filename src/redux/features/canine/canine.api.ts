import { baseApi } from "@/redux/api/baseApi";


export const canineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ৪. Register Canine (Multipart/Form-data)
    registerCanine: builder.mutation({
      query: (data) => ({
        url: "/canines/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Canine"],
    }),

    // ৫. Get All Canines (With Query Params)
    getAllCanines: builder.query({
      query: (params) => ({
        url: "/canines",
        method: "GET",
        params,
      }),
      providesTags: ["Canine"],
    }),

    // ৬. Get Single Canine
    getCanineById: builder.query({
      query: (canineId) => ({
        url: `/canines/${canineId}`,
        method: "GET",
      }),
      providesTags: (arg) => [{ type: "Canine", id: arg }],
    }),

    // ৭. Update Canine
    updateCanine: builder.mutation({
      query: ({ canineId, ...data }) => ({
        url: `/canines/${canineId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (arg) => [
        "Canine",
        { type: "Canine", id: arg.canineId },
      ],
    }),

    // ৮. Delete Canine
    deleteCanine: builder.mutation({
      query: (canineId) => ({
        url: `/canines/${canineId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Canine"],
    }),

    getMyCanines: builder.query({
      query: (params) => ({
        url: "/canines/owner/my-canines",
        method: "GET",
        params,
      }),
      providesTags: ["Canine"],
    }),

    // Canine Statistics for Owner
    getOwnerStats: builder.query({
      query: () => ({
        url: "/canines/owner/stats",
        method: "GET",
      }),
      providesTags: ["Canine"],
    }),

    getCaninesByOwnerId: builder.query({
      query: ({ ownerId, ...params }) => ({
        url: `/canines/owner/canines/${ownerId}`,
        method: "GET",
        params, // page, limit, search, breedId, gender, tier, etc.
      }),
      providesTags: ({ ownerId }) => [
        { type: "Canine", id: `OWNER_LIST_${ownerId}` },
      ],
    }),
  }),
});

export const {
  useRegisterCanineMutation,
  useGetAllCaninesQuery,
  useGetCanineByIdQuery,
  useUpdateCanineMutation,
  useDeleteCanineMutation,
  useGetMyCaninesQuery,
  useGetOwnerStatsQuery,
  useGetCaninesByOwnerIdQuery
} = canineApi;