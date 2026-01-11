import type { ApiResponse } from '../types/common';
import type {
  CheckUsernameRequest,
  CheckUsernameResponse,
  SignupRequest,
  SignupResponse,
  UserInfoResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
} from '../types/user';
import { publicApiInstance, privateApiInstance } from './instance';

/**
 * 아이디 중복 확인
 * - URL: POST /user/exist
 * - 인증: 불필요
 */
export const checkUsername = async (data: CheckUsernameRequest): Promise<CheckUsernameResponse> => {
  const response = await publicApiInstance.post<ApiResponse<CheckUsernameResponse>>('/user/exist', data);
  return response.data.data;
};

/**
 * 회원가입
 * - URL: POST /user
 * - 인증: 불필요
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await publicApiInstance.post<ApiResponse<SignupResponse>>('/user', data);
  return response.data.data;
};

/**
 * 내 정보 조회
 * - URL: GET /user
 * - 인증: 필요
 */
export const getMyInfo = async (): Promise<UserInfoResponse> => {
  const response = await privateApiInstance.get<ApiResponse<UserInfoResponse>>('/user');
  return response.data.data;
};

/**
 * 내 정보 수정
 * - URL: PUT /user
 * - 인증: 필요
 */
export const updateMyInfo = async (data: UpdateUserRequest): Promise<UpdateUserResponse> => {
  const response = await privateApiInstance.put<ApiResponse<UpdateUserResponse>>('/user', data);
  return response.data.data;
};

/**
 * 회원 탈퇴
 * - URL: DELETE /user
 * - 인증: 필요
 */
export const deleteAccount = async (data: DeleteUserRequest): Promise<void> => {
  await privateApiInstance.delete<ApiResponse<null>>('/user', { data });
};
