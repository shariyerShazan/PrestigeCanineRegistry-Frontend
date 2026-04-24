/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

/** Report Status Options */
export type ReportStatus = "UNREAD" | "READ" | "RESOLVED";

/** Priority Levels */
export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH";

/** Single Report Type */
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
  createdAt: string;
  updatedAt: string;

  /** Optional relational objects */
  canine?: {
    name: string;
    pcrId: string;
    ownerId: string;
    breedRelation?: { name: string };
    owner?: { fullName: string; email: string; pcrId: string };
  };
  litter?: {
    name: string;
    pcrId: string;
    ownerId: string;
    breedRelation?: { name: string };
    owner?: { fullName: string; email: string; pcrId: string };
  };
  reporter?: {
    fullName: string;
    email: string;
    pcrId: string;
  };
}

/** Pagination + Filters for Admin Reports */
export interface ReportQuery {
  page?: number;
  limit?: number;
  status?: ReportStatus;
  priority?: PriorityLevel;
}

/** RTK Query API Definition */
export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Submit a new report */
    submitReport: builder.mutation<IReport, Partial<IReport>>({
      query: (data) => ({
        url: "/reports/submit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),

    /** Get all reports with pagination */
    getAllReports: builder.query<{ data: IReport[]; meta: any }, ReportQuery>({
      query: (params) => ({
        url: "/reports/admin/all",
        method: "GET",
        params,
      }),
      providesTags: ["Reports"],
    }),

    /** Get single report by ID */
    getSingleReport: builder.query<IReport, string>({
      query: (id) => ({
        url: `/reports/admin/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Reports", id }] as any,
    }),

    /** Resolve a report or perform admin actions */
    resolveReportAction: builder.mutation<
      IReport,
      {
        id: string;
        status: ReportStatus;
        priority?: PriorityLevel;
        action?: "SUSPEND_OWNER" | "MARK_AS_RESOLVED";
      }
    >({
      query: ({ id, action, ...body }) => ({
        url: `/reports/admin/${id}/action`,
        method: "PATCH",
        params: { action },
        body,
      }),
      invalidatesTags: ({id}: any) => ["Reports", { type: "Reports", id }],
    }),

    /** Delete a report */
    deleteReport: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/reports/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reports"],
    }),
  }),
});

/** RTK Query Hooks */
export const {
  useSubmitReportMutation,
  useGetAllReportsQuery,
  useGetSingleReportQuery,
  useResolveReportActionMutation,
  useDeleteReportMutation,
} = reportApi;
