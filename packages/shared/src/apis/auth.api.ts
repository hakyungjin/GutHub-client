import type { ApiResponse } from '../types/common';
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from '../types/auth';
import { publicApiInstance } from './instance';

/**
 * 로그인
 * - URL: POST /auth/login
 * - 인증: 불필요
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await publicApiInstance.post<ApiResponse<LoginResponse>>('/auth/login', data);
  return response.data.data;
};

/**
 * Access Token 갱신
 * - URL: POST /jwt/refresh
 * - 인증: 불필요 (Refresh Token 쿠키 필요)
 */
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await publicApiInstance.post<ApiResponse<RefreshTokenResponse>>('/jwt/refresh');
  return response.data.data;
};
