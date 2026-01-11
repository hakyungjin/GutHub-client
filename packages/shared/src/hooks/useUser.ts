import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  checkUsername as checkUsernameApi,
  signup as signupApi,
  getMyInfo as getMyInfoApi,
  updateMyInfo as updateMyInfoApi,
  deleteAccount as deleteAccountApi,
} from '../apis/user.api';
import { clearAuth } from '../stores/auth.store';
import type {
  CheckUsernameRequest,
  SignupRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from '../types/user';

/**
 * 쿼리 키
 */
export const userKeys = {
  all: ['user'] as const,
  info: () => [...userKeys.all, 'info'] as const,
  checkUsername: (username: string) => [...userKeys.all, 'checkUsername', username] as const,
};

/**
 * 아이디 중복 확인 훅
 */
export const useCheckUsername = (username: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: userKeys.checkUsername(username),
    queryFn: () => checkUsernameApi({ username }),
    enabled: options?.enabled ?? (username.length >= 8),
    staleTime: 30 * 1000, // 30초
  });
};

/**
 * 아이디 중복 확인 뮤테이션 훅 (수동 호출용)
 */
export const useCheckUsernameMutation = () => {
  return useMutation({
    mutationFn: (data: CheckUsernameRequest) => checkUsernameApi(data),
  });
};

/**
 * 회원가입 훅
 */
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => signupApi(data),
  });
};

/**
 * 내 정보 조회 훅
 */
export const useMyInfo = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: userKeys.info(),
    queryFn: getMyInfoApi,
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 내 정보 수정 훅
 */
export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateMyInfoApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.info() });
    },
  });
};

/**
 * 회원 탈퇴 훅
 */
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteUserRequest) => deleteAccountApi(data),
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
};
