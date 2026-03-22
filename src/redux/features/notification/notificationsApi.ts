
import { socketService } from "@/lib/SocketService";
import { baseApi } from "@/redux/api/baseApi";

export const adminNotificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, any>({
      query: (params) => ({
        url: "/notifications",
        params,
      }),
      providesTags: ["Notification"],
      // ✅ Ekhane logic-ti thakbe
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;
          const socket = socketService.connect();

          // Individual notification listener
          socket?.on("notification", () => {
            // Refetch triggers automatically
            dispatch(
              adminNotificationsApi.util.invalidateTags(["Notification"])
            );
          });

          // Global notification listener
          socket?.on("admin-notification", () => {
            dispatch(
              adminNotificationsApi.util.invalidateTags(["Notification"])
            );
          });
        } catch (error) {
          console.error("Socket error:", error);
        }

        await cacheEntryRemoved;
        socketService.getSocket()?.off("notification");
        socketService.getSocket()?.off("admin-notification");
      },
    }),

    // 2. Mark All as Read
    markAllRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    // 3. Mark Selected as Read
    markSelectedRead: builder.mutation<void, { notificationIds: string[] }>({
      query: (body) => ({
        url: "/notifications/mark-selected-read",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),

    // 4. Get Single Notification Details
    getSingleNotification: builder.query<any, string>({
      query: (id) => `/notifications/${id}`,
      providesTags: (result, error, id) => [{ type: "Notification", id }],
    }),

    // 5. Manual Single Mark as Read
    markSingleRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    // 6. Delete Specific Notification
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),

    // 7. Clear All Notifications
    clearAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/clear/all",
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    getAdminStats: builder.query<any, void>({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
      providesTags: ["Notification"], 
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllReadMutation,
  useMarkSelectedReadMutation,
  useGetSingleNotificationQuery,
  useMarkSingleReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
  useGetAdminStatsQuery,
} = adminNotificationsApi;