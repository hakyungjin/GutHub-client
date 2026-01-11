import { useQuery } from '@tanstack/react-query';
import {
  getDailyGutHealth as getDailyGutHealthApi,
  getMonthlyGutHealth as getMonthlyGutHealthApi,
} from '../apis/gut-health.api';

/**
 * 쿼리 키
 */
export const gutHealthKeys = {
  all: ['gutHealth'] as const,
  daily: (date: string) => [...gutHealthKeys.all, 'daily', date] as const,
  monthly: (month: string) => [...gutHealthKeys.all, 'monthly', month] as const,
};

/**
 * 일별 장 건강 점수 조회 훅
 */
export const useDailyGutHealth = (date: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: gutHealthKeys.daily(date),
    queryFn: () => getDailyGutHealthApi(date),
    enabled: options?.enabled ?? !!date,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

/**
 * 월별 장 건강 점수 조회 훅
 */
export const useMonthlyGutHealth = (month: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: gutHealthKeys.monthly(month),
    queryFn: () => getMonthlyGutHealthApi(month),
    enabled: options?.enabled ?? !!month,
    staleTime: 10 * 60 * 1000, // 10분
  });
};
