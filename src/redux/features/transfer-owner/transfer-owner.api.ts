/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const ownerTransferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create Transfer Request (Generate Code)
    createTransferRequest: builder.mutation<
      any,
      { canineId?: string; litterId?: string }
    >({
      query: (body) => ({
        url: "/owner-transfer/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transfer"],
    }),

    // 2. Claim Transfer (Input Code)
    claimTransfer: builder.mutation<any, { transferCode: string }>({
      query: (body) => ({
        url: "/owner-transfer/claim",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transfer", "Canine", "Litter"], // Owner change hole canine/litter list-o refresh dorkar
    }),

    // 3. Get User's Sent/Received Transfers
    getMyTransfers: builder.query<any, any>({
      query: (params) => ({
        url: "/owner-transfer/my-list",
        method: "GET",
        params,
      }),
      providesTags: ["Transfer"],
    }),

    // 4. Get History of a Canine or Litter
    getTransferHistory: builder.query<
      any,
      { canineId?: string; litterId?: string }
    >({
      query: (params) => ({
        url: "/owner-transfer/history",
        method: "GET",
        params,
      }),
      providesTags: ["Transfer"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTransferRequestMutation,
  useClaimTransferMutation,
  useGetMyTransfersQuery,
  useGetTransferHistoryQuery,
} = ownerTransferApi;
