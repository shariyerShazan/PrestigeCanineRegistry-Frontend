import { baseApi } from "@/redux/api/baseApi";

export const certificateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. User: Submit a new certificate request
    createCertificateRequest: builder.mutation<
      any,
      { canineId?: string; litterId?: string; note?: string ; certificateType: "CERTIFICATE" | "PEDIGREE";}
    >({
      query: (body) => ({
        url: "/certificate-request/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Certificates"],
    }),

    // 2. User: Get personal certificate requests
    getMyCertificateRequests: builder.query<any, void>({
      query: () => "/certificate-request/my-requests",
      providesTags: ["Certificates"],
    }),

    // 3. Admin: Get all requests with filters and pagination
    adminGetAllCertificateRequests: builder.query<any, any>({
      query: (params) => ({
        url: "/certificate-request/admin/list",
        method: "GET",
        params,
      }),
      providesTags: ["Certificates"],
    }),

    // 4. Admin: Get specific request details
    adminGetCertificateRequestById: builder.query<any, string>({
      query: (id) => `/certificate-request/admin/${id}`,
      providesTags: (id) => [{ type: "Certificates", id }],
    }),

    // 5. Admin: Update status (Approve/Reject)
    adminUpdateCertificateStatus: builder.mutation<
      any,
      { id: string; status: "APPROVED" | "REJECTED" }
    >({
      query: ({ id, status }) => ({
        url: `/certificate-request/admin/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ( { id }) => [
        "Certificates",
        { type: "Certificates", id },
      ],
    }),

    // 6. Admin: Delete a request
    adminDeleteCertificateRequest: builder.mutation<any, string>({
      query: (id) => ({
        url: `/certificate-request/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Certificates"],
    }),

    getMySingleCertificateRequest: builder.query<any, string>({
      query: (id) => `/certificate-request/my-single/${id}`,
      providesTags: ( id) => [{ type: "Certificates", id }],
    })
  }),
});

export const {
  useCreateCertificateRequestMutation,
  useGetMyCertificateRequestsQuery,
  useAdminGetAllCertificateRequestsQuery,
  useAdminGetCertificateRequestByIdQuery,
  useAdminUpdateCertificateStatusMutation,
  useAdminDeleteCertificateRequestMutation,
  useGetMySingleCertificateRequestQuery,
} = certificateApi;
