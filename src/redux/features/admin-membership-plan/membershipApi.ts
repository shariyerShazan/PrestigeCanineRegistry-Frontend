import { baseApi } from "../../api/baseApi";

export const membershipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get all membership plans
    getAllMembershipPlans: builder.query({
      query: () => ({
        url: "/admin/membership-plans",
        method: "GET",
      }),
      providesTags: ["Membership"],
    }),

    // 2. Create a new plan
    createMembershipPlan: builder.mutation({
      query: (data) => ({
        url: "/admin/membership-plans",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Membership"],
    }),

    // 3. Update an existing plan
    updateMembershipPlan: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/membership-plans/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Membership"],
    }),

    // 4. Delete a plan
    deleteMembershipPlan: builder.mutation({
      query: (id) => ({
        url: `/admin/membership-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Membership"],
    }),
  }),
});

export const {
  useGetAllMembershipPlansQuery,
  useCreateMembershipPlanMutation,
  useUpdateMembershipPlanMutation,
  useDeleteMembershipPlanMutation,
} = membershipApi;
