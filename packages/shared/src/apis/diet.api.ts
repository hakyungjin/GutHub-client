import type { ApiResponse } from '../types/common';
import type {
  CreateDietRequest,
  UpdateDietRequest,
  DietLogResponse,
  DietsByDateResponse,
  FoodSearchResult,
  StreakResponse,
} from '../types/diet';
import { privateApiInstance } from './instance';

/**
 * 식단 기록 생성
 * - URL: POST /api/diets
 * - 인증: 필요
 */
export const createDiet = async (data: CreateDietRequest): Promise<DietLogResponse[]> => {
  const response = await privateApiInstance.post<ApiResponse<DietLogResponse[]>>('/api/diets', data);
  return response.data.data;
};

/**
 * 날짜별 식단 조회
 * - URL: GET /api/diets
 * - 인증: 필요
 */
export const getDietsByDate = async (date: string): Promise<DietsByDateResponse> => {
  const response = await privateApiInstance.get<ApiResponse<DietsByDateResponse>>('/api/diets', {
    params: { date },
  });
  return response.data.data;
};

/**
 * 식단 상세 조회
 * - URL: GET /api/diets/{dietLogId}
 * - 인증: 필요
 */
export const getDietDetail = async (dietLogId: number): Promise<DietLogResponse> => {
  const response = await privateApiInstance.get<ApiResponse<DietLogResponse>>(`/api/diets/${dietLogId}`);
  return response.data.data;
};

/**
 * 식단 수정
 * - URL: PUT /api/diets/{dietLogId}
 * - 인증: 필요
 */
export const updateDiet = async (dietLogId: number, data: UpdateDietRequest): Promise<DietLogResponse> => {
  const response = await privateApiInstance.put<ApiResponse<DietLogResponse>>(`/api/diets/${dietLogId}`, data);
  return response.data.data;
};

/**
 * 식단 삭제
 * - URL: DELETE /api/diets/{dietLogId}
 * - 인증: 필요
 */
export const deleteDiet = async (dietLogId: number): Promise<void> => {
  await privateApiInstance.delete<ApiResponse<null>>(`/api/diets/${dietLogId}`);
};

/**
 * 음식 검색
 * - URL: GET /api/diets/search-foods
 * - 인증: 필요
 */
export const searchFoods = async (keyword: string): Promise<FoodSearchResult[]> => {
  const response = await privateApiInstance.get<ApiResponse<FoodSearchResult[]>>('/api/diets/search-foods', {
    params: { keyword },
  });
  return response.data.data;
};

/**
 * 장 건강 연속 유지일 조회
 * - URL: GET /api/diets/streak
 * - 인증: 필요
 */
export const getStreak = async (): Promise<StreakResponse> => {
  const response = await privateApiInstance.get<ApiResponse<StreakResponse>>('/api/diets/streak');
  return response.data.data;
};
