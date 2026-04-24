import { baseApi } from "@/redux/api/baseApi";


export const adminOwnerTransferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get all transfers with pagination and search
    getAllTransfers: builder.query({
      query: (params) => ({
        url: "/admin-owner-transfer/list",
        method: "GET",
        params,
      }),
      providesTags: ["OwnershipTransfer"],
    }),

    // 2. Get single transfer details by ID
    getTransferById: builder.query({
      query: (id: string) => ({
        url: `/admin-owner-transfer/${id}`,
        method: "GET",
      }),
      providesTags: ( id) => [{ type: "OwnershipTransfer", id }],
    }),

    // 3. Approve transfer with selectedUserId
    approveTransfer: builder.mutation({
      query: ({
        id,
        selectedUserId,
      }: {
        id: string;
        selectedUserId: string;
      }) => ({
        url: `/admin-owner-transfer/approve/${id}`,
        method: "PATCH",
        body: { selectedUserId },
      }),
      invalidatesTags: ["OwnershipTransfer"],
    }),

    // 4. Decline transfer
    declineTransfer: builder.mutation({
      query: (id: string) => ({
        url: `/admin-owner-transfer/decline/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["OwnershipTransfer"],
    }),
  }),
});

export const {
  useGetAllTransfersQuery,
  useGetTransferByIdQuery,
  useApproveTransferMutation,
  useDeclineTransferMutation,
} = adminOwnerTransferApi;
