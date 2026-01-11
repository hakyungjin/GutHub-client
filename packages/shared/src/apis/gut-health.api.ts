import type { ApiResponse } from '../types/common';
import type { DailyGutHealthResponse, MonthlyGutHealthResponse } from '../types/gut-health';
import { privateApiInstance } from './instance';

/**
 * 일별 장 건강 점수 조회
 * - URL: GET /users/me/gut-health
 * - 인증: 필요
 */
export const getDailyGutHealth = async (date: string): Promise<DailyGutHealthResponse> => {
  const response = await privateApiInstance.get<ApiResponse<DailyGutHealthResponse>>('/users/me/gut-health', {
    params: { date },
  });
  return response.data.data;
};

/**
 * 월별 장 건강 점수 조회
 * - URL: GET /users/me/gut-health/monthly
 * - 인증: 필요
 */
export const getMonthlyGutHealth = async (month: string): Promise<MonthlyGutHealthResponse> => {
  const response = await privateApiInstance.get<ApiResponse<MonthlyGutHealthResponse>>('/users/me/gut-health/monthly', {
    params: { month },
  });
  return response.data.data;
};
