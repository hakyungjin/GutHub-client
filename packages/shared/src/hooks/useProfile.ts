import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProfile as getProfileApi,
  updateProfile as updateProfileApi,
  completeSocialSignup as completeSocialSignupApi,
} from '../apis/profile.api';
import { setAccessToken } from '../stores/auth.store';
import type { UpdateProfileRequest, CompleteSocialSignupRequest } from '../types/user';

/**
 * 쿼리 키
 */
export const profileKeys = {
  all: ['profile'] as const,
  detail: () => [...profileKeys.all, 'detail'] as const,
};

/**
 * 프로필 정보 조회 훅
 */
export const useProfile = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: getProfileApi,
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 프로필 정보 수정 훅
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfileApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
    },
  });
};

/**
 * 소셜 회원가입 완료 훅
 */
export const useCompleteSocialSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CompleteSocialSignupRequest) => completeSocialSignupApi(data),
    onSuccess: (response) => {
      // 정식 Access Token 저장
      setAccessToken(response.accessToken);
      // 프로필 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
    },
  });
};
