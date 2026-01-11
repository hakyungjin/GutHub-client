import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  createReview as createReviewApi,
  getReviews as getReviewsApi,
  type GetReviewsParams,
} from '../apis/review.api';
import type { CreateReviewRequest } from '../types/review';

/**
 * 쿼리 키
 */
export const reviewKeys = {
  all: ['review'] as const,
  list: (supplementId: number) => [...reviewKeys.all, 'list', supplementId] as const,
  listWithParams: (params: Omit<GetReviewsParams, 'page'>) => [...reviewKeys.all, 'list', params] as const,
};

/**
 * 리뷰 작성 훅
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewRequest) => createReviewApi(data),
    onSuccess: (_, variables) => {
      // 해당 제품의 리뷰 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: reviewKeys.list(variables.supplementId) });
    },
  });
};

/**
 * 리뷰 목록 조회 훅 (일반 페이지네이션)
 */
export const useReviews = (
  params: GetReviewsParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: reviewKeys.listWithParams(params),
    queryFn: () => getReviewsApi(params),
    enabled: options?.enabled ?? (params.supplementId > 0),
    staleTime: 2 * 60 * 1000, // 2분
  });
};

/**
 * 리뷰 목록 조회 훅 (무한 스크롤)
 */
export const useInfiniteReviews = (
  supplementId: number,
  options?: { enabled?: boolean; size?: number; sort?: string }
) => {
  const size = options?.size ?? 10;
  const sort = options?.sort;

  return useInfiniteQuery({
    queryKey: reviewKeys.list(supplementId),
    queryFn: ({ pageParam = 0 }) =>
      getReviewsApi({ supplementId, page: pageParam, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.pageable.pageNumber + 1;
    },
    enabled: options?.enabled ?? (supplementId > 0),
    staleTime: 2 * 60 * 1000, // 2분
  });
};
