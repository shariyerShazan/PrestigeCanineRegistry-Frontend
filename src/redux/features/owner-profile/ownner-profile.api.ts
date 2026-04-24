
import { baseApi } from "@/redux/api/baseApi";

export interface AccessPermission {
  id: string;
  resource: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  userId: string;
}

export interface ImageResponse {
  url: string;
  publicId: string;
}
export interface UserProfile {
  id: string;
  email: string;
  pcrId: string;
  pcrPrefix: string;
  pcrIncremental: string;
  pcrRandom: string;
  phoneNumber: string | null;
  ownershipTransferCode: string | null;
  fullName: string | null;
  about: any;
  isVerified: boolean;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  status: "PENDING" | "ACTIVE" | "SUSPENDED";
  emailNotifications: boolean;
  showOwnerId: boolean;
  membershipId: string | null;
  roleType: "USER" | "ADMIN";
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  membership: any | null;
  profileImage: ImageResponse | null; // Fixed type
  coverImage: ImageResponse | null; // Fixed type
  permissions: AccessPermission[];
}

export interface GetMeResponse {
  success: boolean;
  data: UserProfile;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /auth/me
    getMe: builder.query<GetMeResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // PATCH /users/me/profile - Uses FormData for Image support
    updateProfile: builder.mutation<GetMeResponse, FormData>({
      query: (patch) => ({
        url: "/users/me/profile",
        method: "PATCH",
        body: patch,
        // Browser will automatically set multipart/form-data boundary
      }),
      invalidatesTags: ["User"],
    }),

    // PATCH /users/me/settings
    updateSettings: builder.mutation<
      GetMeResponse,
      { emailNotifications?: boolean; showOwnerId?: boolean }
    >({
      query: (settings) => ({
        url: "/users/me/settings",
        method: "PATCH",
        body: settings,
      }),
      invalidatesTags: ["User"],
    }),

    // PATCH /users/me/change-password
    changePassword: builder.mutation<any, ChangePasswordRequest>({
      query: (passwordData) => ({
        url: "/users/me/change-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUpdateSettingsMutation,
  useChangePasswordMutation,
} = userProfileApi;