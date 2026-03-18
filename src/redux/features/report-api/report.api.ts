/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export type ReportStatus = "UNREAD" | "READ" | "RESOLVED";

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" ;
export interface IReport {
  id: string;
  reportId: string;
  status: ReportStatus;
  priority: PriorityLevel;
  reason: string;
  subject: string;
  description: string;
  reporterName: string;
  reporterEmail: string;
  reporterId?: string;
  canineId?: string;
  litterId?: string;
  canine?: { name: string; pcrId: string; ownerId: string };
  litter?: { name: string; pcrId: string; ownerId: string };
  reporter?: { fullName: string; email: string; pcrId: string };
  createdAt: string;
  updatedAt: string;
}

export interface ReportQuery {
  page?: number;
  limit?: number;
  status?: ReportStatus;
  priority?: PriorityLevel;
}

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitReport: builder.mutation<IReport, Partial<IReport>>({
      query: (data) => ({
        url: "/reports/submit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),

    getAllReports: builder.query<{ data: IReport[]; meta: any }, ReportQuery>({
      query: (params) => ({
        url: "/reports/admin/all",
        method: "GET",
        params,
      }),
      providesTags: ["Reports"],
    }),

    getSingleReport: builder.query<IReport, string>({
      query: (id) => ({
        url: `/reports/admin/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Reports", id }] as any,
    }),

    resolveReportAction: builder.mutation<
      IReport,
      {
        id: string;
        status: ReportStatus;
        priority?: PriorityLevel;
        action?: string;
      }
    >({
      query: ({ id, action, ...body }) => ({
        url: `/reports/admin/${id}/action`,
        method: "PATCH",
        params: { action },
        body: body,
      }),
      invalidatesTags: ({ id }: any) => ["Reports", { type: "Reports", id }],
    }),
    deleteReport: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/reports/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

export const {
  useSubmitReportMutation,
  useGetAllReportsQuery,
  useGetSingleReportQuery,
  useResolveReportActionMutation,
  useDeleteReportMutation,
} = reportApi;
