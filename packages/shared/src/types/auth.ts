/**
 * 로그인 요청
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  accessToken: string;
}

/**
 * 토큰 갱신 응답
 */
export interface RefreshTokenResponse {
  accessToken: string;
}
