import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createDiet as createDietApi,
  getDietsByDate as getDietsByDateApi,
  getDietDetail as getDietDetailApi,
  updateDiet as updateDietApi,
  deleteDiet as deleteDietApi,
  searchFoods as searchFoodsApi,
  getStreak as getStreakApi,
} from '../apis/diet.api';
import type { CreateDietRequest, UpdateDietRequest } from '../types/diet';

/**
 * 쿼리 키
 */
export const dietKeys = {
  all: ['diet'] as const,
  byDate: (date: string) => [...dietKeys.all, 'byDate', date] as const,
  detail: (id: number) => [...dietKeys.all, 'detail', id] as const,
  foods: (keyword: string) => [...dietKeys.all, 'foods', keyword] as const,
  streak: () => [...dietKeys.all, 'streak'] as const,
};

/**
 * 식단 기록 생성 훅
 */
export const useCreateDiet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDietRequest) => createDietApi(data),
    onSuccess: (_, variables) => {
      // 해당 날짜의 식단 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: dietKeys.byDate(variables.logDate) });
      // 스트릭 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: dietKeys.streak() });
    },
  });
};

/**
 * 날짜별 식단 조회 훅
 */
export const useDietsByDate = (date: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: dietKeys.byDate(date),
    queryFn: () => getDietsByDateApi(date),
    enabled: options?.enabled ?? !!date,
    staleTime: 2 * 60 * 1000, // 2분
  });
};

/**
 * 식단 상세 조회 훅
 */
export const useDietDetail = (dietLogId: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: dietKeys.detail(dietLogId),
    queryFn: () => getDietDetailApi(dietLogId),
    enabled: options?.enabled ?? (dietLogId > 0),
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 식단 수정 훅
 */
export const useUpdateDiet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dietLogId, data }: { dietLogId: number; data: UpdateDietRequest }) =>
      updateDietApi(dietLogId, data),
    onSuccess: (response) => {
      // 해당 식단 상세 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: dietKeys.detail(response.dietLogId) });
      // 해당 날짜의 식단 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: dietKeys.byDate(response.logDate) });
    },
  });
};

/**
 * 식단 삭제 훅
 */
export const useDeleteDiet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dietLogId: number) => deleteDietApi(dietLogId),
    onSuccess: () => {
      // 모든 식단 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: dietKeys.all });
    },
  });
};

/**
 * 음식 검색 훅
 */
export const useSearchFoods = (keyword: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: dietKeys.foods(keyword),
    queryFn: () => searchFoodsApi(keyword),
    enabled: options?.enabled ?? (keyword.length >= 1),
    staleTime: 60 * 1000, // 1분
  });
};

/**
 * 음식 검색 뮤테이션 훅 (수동 호출용)
 */
export const useSearchFoodsMutation = () => {
  return useMutation({
    mutationFn: (keyword: string) => searchFoodsApi(keyword),
  });
};

/**
 * 장 건강 연속 유지일 조회 훅
 */
export const useStreak = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: dietKeys.streak(),
    queryFn: getStreakApi,
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
