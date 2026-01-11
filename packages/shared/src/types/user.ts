/**
 * 성별 타입
 */
export type Gender = 'MALE' | 'FEMALE';

/**
 * 장 건강 타입 코드
 */
export type GutTypeCode = 'SENSITIVE' | 'NORMAL' | 'STRONG';

/**
 * 장 건강 타입 정보
 */
export interface GutType {
  name: string;
  code: GutTypeCode;
  description: string;
  imageUrl: string;
}

// ============ Request DTOs ============

/**
 * 아이디 중복 확인 요청
 */
export interface CheckUsernameRequest {
  username: string;
}

/**
 * 회원가입 요청
 */
export interface SignupRequest {
  username: string;
  password: string;
  nickname: string;
  email?: string;
}

/**
 * 내 정보 수정 요청
 */
export interface UpdateUserRequest {
  username: string;
  nickname: string;
  email?: string;
}

/**
 * 회원 탈퇴 요청
 */
export interface DeleteUserRequest {
  username: string;
}

/**
 * 프로필 정보 수정 요청
 */
export interface UpdateProfileRequest {
  nickname: string;
  ageRange: number;
  gender: Gender;
  gutType: GutTypeCode;
}

/**
 * 소셜 회원가입 완료 요청
 */
export interface CompleteSocialSignupRequest {
  nickname: string;
  ageRange: number;
  gender: Gender;
  gutType: GutTypeCode;
}

// ============ Response DTOs ============

/**
 * 아이디 중복 확인 응답
 */
export interface CheckUsernameResponse {
  isAvailable: boolean;
}

/**
 * 회원가입 응답
 */
export interface SignupResponse {
  userEntityId: number;
}

/**
 * 내 정보 조회 응답
 */
export interface UserInfoResponse {
  username: string;
  social: boolean;
  nickname: string;
  email: string | null;
}

/**
 * 내 정보 수정 응답
 */
export interface UpdateUserResponse {
  userEntityId: number;
}

/**
 * 프로필 정보 조회 응답
 */
export interface ProfileResponse {
  nickname: string;
  ageRange: number;
  gender: Gender;
  gutType: GutType;
}

/**
 * 프로필 정보 수정 응답
 */
export interface UpdateProfileResponse {
  userEntityId: number;
}

/**
 * 소셜 회원가입 완료 응답
 */
export interface CompleteSocialSignupResponse {
  accessToken: string;
}
