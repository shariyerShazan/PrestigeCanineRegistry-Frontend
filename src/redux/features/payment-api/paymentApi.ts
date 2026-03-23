import { baseApi } from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (data: { membershipId: string }) => ({
        url: "/payments/checkout",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        console.log(arg);
        try {
          const { data } = await queryFulfilled;
          if (data?.url) {
            window.location.href = data.url; // Stripe hosted page-e redirect
          }
        } catch (err) {
          console.error("Checkout redirection failed:", err);
        }
      },
    }),

    getAllPayments: builder.query({
      query: (params: { page?: number; limit?: number }) => ({
        url: "/payments/admin/all",
        method: "GET",
        params,
      }),
      providesTags: ["Subscriptions"],
    }),

    // Admin: Get Revenue Stats (Day-wise)
    getRevenueStats: builder.query({
      query: (params: { year?: number; month?: number }) => ({
        url: "/payments/admin/revenue-stats",
        method: "GET",
        params,
      }),
      providesTags: ["Subscriptions"],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetAllPaymentsQuery,
  useGetRevenueStatsQuery,
} = paymentApi;
