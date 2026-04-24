// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// src/redux/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3003",
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Canine",
    "Breed",
    "Litter",
    "Permissions",
    "AdminList",
    "Transfer",
    "OwnershipTransfer",
    "Reports",
    "HealthRequest",
    "Certificates",
    "Notification",
    "Membership",
    "Subscriptions",
    "BreederProfile",
    "BlogLitter",
  ],
  endpoints: () => ({}),
});
