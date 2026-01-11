import type { ApiResponse } from '../types/common';
import type { CreateReviewRequest, ReviewResponse, ReviewListResponse } from '../types/review';
import { publicApiInstance, privateApiInstance } from './instance';

/**
 * 리뷰 작성
 * - URL: POST /api/reviews
 * - 인증: 필요
 */
export const createReview = async (data: CreateReviewRequest): Promise<ReviewResponse> => {
  const response = await privateApiInstance.post<ApiResponse<ReviewResponse>>('/api/reviews', data);
  return response.data.data;
};

/**
 * 리뷰 목록 조회 파라미터
 */
export interface GetReviewsParams {
  supplementId: number;
  page?: number;
  size?: number;
  sort?: string;
}

/**
 * 리뷰 목록 조회
 * - URL: GET /api/reviews/{supplementId}
 * - 인증: 불필요
 */
export const getReviews = async ({ supplementId, page = 0, size = 10, sort }: GetReviewsParams): Promise<ReviewListResponse> => {
  const response = await publicApiInstance.get<ApiResponse<ReviewListResponse>>(`/api/reviews/${supplementId}`, {
    params: { page, size, sort },
  });
  return response.data.data;
};
