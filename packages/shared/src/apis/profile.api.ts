import type { ApiResponse } from '../types/common';
import type {
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  CompleteSocialSignupRequest,
  CompleteSocialSignupResponse,
} from '../types/user';
import { privateApiInstance } from './instance';

/**
 * 프로필 정보 조회
 * - URL: GET /user/profile
 * - 인증: 필요
 */
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await privateApiInstance.get<ApiResponse<ProfileResponse>>('/user/profile');
  return response.data.data;
};

/**
 * 프로필 정보 수정
 * - URL: PUT /user/profile
 * - 인증: 필요
 */
export const updateProfile = async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
  const response = await privateApiInstance.put<ApiResponse<UpdateProfileResponse>>('/user/profile', data);
  return response.data.data;
};

/**
 * 소셜 회원가입 완료
 * - URL: POST /auth/signup/complete
 * - 인증: 필요 (임시 토큰)
 */
export const completeSocialSignup = async (data: CompleteSocialSignupRequest): Promise<CompleteSocialSignupResponse> => {
  const response = await privateApiInstance.post<ApiResponse<CompleteSocialSignupResponse>>('/auth/signup/complete', data);
  return response.data.data;
};
