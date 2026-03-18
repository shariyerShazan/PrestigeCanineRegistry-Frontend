import { baseApi } from "@/redux/api/baseApi";


export const healthRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Send a new health access request
    sendHealthRequest: builder.mutation({
      query: (data) => ({
        url: "/health-requests",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Canine"],
    }),

    // Get all requests (sent and received)
    getHealthRequests: builder.query({
      query: () => "/health-requests/all",
      providesTags: ["HealthRequest"],
    }),

    // Get a specific request (to check status quickly)
    getSingleHealthRequest: builder.query({
      query: (reqId) => `/health-requests/${reqId}`,
      providesTags: ( arg) => [
        { type: "HealthRequest", id: arg },
      ],
    }),

    // Update status (Approve/Reject) - For Owners
    updateHealthRequestStatus: builder.mutation({
      query: ({ requestId, status }) => ({
        url: `/health-requests/${requestId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["HealthRequest", "Canine"],
    }),
  }),
});

export const {
  useSendHealthRequestMutation,
  useGetHealthRequestsQuery,
  useGetSingleHealthRequestQuery,
  useUpdateHealthRequestStatusMutation,
} = healthRequestApi;
