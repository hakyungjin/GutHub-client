import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi, refreshToken as refreshTokenApi } from '../apis/auth.api';
import { useAuthStore, setAccessToken, clearAuth } from '../stores/auth.store';
import type { LoginRequest } from '../types/auth';

/**
 * 쿼리 키
 */
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * 로그인 훅
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (response) => {
      setAccessToken(response.accessToken);
      // 사용자 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
};

/**
 * 로그아웃 훅
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      clearAuth();
      // 모든 쿼리 캐시 초기화
      queryClient.clear();
    },
  });
};

/**
 * 토큰 갱신 훅
 */
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => refreshTokenApi(),
    onSuccess: (response) => {
      setAccessToken(response.accessToken);
    },
    onError: () => {
      clearAuth();
    },
  });
};

/**
 * 인증 상태 훅
 */
export const useAuth = () => {
  const { isAuthenticated, isLoading, accessToken } = useAuthStore();

  return {
    isAuthenticated,
    isLoading,
    hasToken: !!accessToken,
  };
};
