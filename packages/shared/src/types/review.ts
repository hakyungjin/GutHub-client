import type { PageResponse } from './common';

// ============ Request DTOs ============

/**
 * 리뷰 작성 요청
 */
export interface CreateReviewRequest {
  supplementId: number;
  rating: number;
  deliveryRating?: number;
  content: string;
}

// ============ Response DTOs ============

/**
 * 리뷰 응답
 */
export interface ReviewResponse {
  reviewId: number;
  supplementId: number;
  writerNickname: string;
  rating: number;
  deliveryRating: number | null;
  content: string;
  createdAt: string;
}

/**
 * 리뷰 목록 응답 (페이지네이션)
 */
export type ReviewListResponse = PageResponse<ReviewResponse>;
