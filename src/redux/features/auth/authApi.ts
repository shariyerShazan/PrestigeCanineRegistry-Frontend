/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
export interface User {
  id: string;
  email: string;
  fullName?: string;
  pcrId: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "DEACTIVATED" | "REJECTED";
  isVerified: boolean;
  roleType: "OWNER" | "ADMIN" | "SUPER_ADMIN";
  membership: any;
  membershipId: string;
  profileImage: {
    url: string;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  user?: Partial<User>;
}

export interface ProfileResponse {
  success: boolean;
  data: User;
}

export interface RegisterUserDto {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface AmbassadorsResponse {
  success: boolean;
  meta: Meta;
  data: User[];
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterUserDto>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyOtp: builder.mutation<AuthResponse, VerifyOtpDto>({
      query: (otpData) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: otpData,
      }),
    }),

    resendOtp: builder.mutation<AuthResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<AuthResponse, LoginDto>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(baseApi.util.resetApiState());
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
    }),

    getMe: builder.query<ProfileResponse, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // authApi.ts এর endpoints এর ভেতর
    forgotPassword: builder.mutation<AuthResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<AuthResponse, any>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    getUserProfile: builder.query({
      query: (userId: string) => ({
        url: `/auth/profile/${userId}`,
        method: "GET",
      }),
      providesTags: (userId) => [{ type: "User", id: userId }],
    }),

    getPrestigeAmbassadors: builder.query<AmbassadorsResponse, any>({
      query: (params) => ({
        url: "/auth/prestige-ambassadors",
        method: "GET",
        params, // passes page, limit, searchTerm
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  useGetPrestigeAmbassadorsQuery,
} = authApi;
