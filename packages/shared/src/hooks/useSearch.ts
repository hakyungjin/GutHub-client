import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { searchProducts as searchProductsApi, type SearchProductsParams } from '../apis/search.api';

/**
 * 쿼리 키
 */
export const searchKeys = {
  all: ['search'] as const,
  products: (query: string) => [...searchKeys.all, 'products', query] as const,
};

/**
 * 제품 검색 훅 (단일 페이지)
 */
export const useSearchProducts = (
  params: SearchProductsParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [...searchKeys.products(params.q), params.cursor],
    queryFn: () => searchProductsApi(params),
    enabled: options?.enabled ?? (params.q.length >= 1),
    staleTime: 2 * 60 * 1000, // 2분
  });
};

/**
 * 제품 검색 훅 (무한 스크롤 / 커서 기반)
 */
export const useInfiniteSearchProducts = (
  query: string,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: searchKeys.products(query),
    queryFn: ({ pageParam }) => searchProductsApi({ q: query, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      return lastPage.nextCursor ?? undefined;
    },
    enabled: options?.enabled ?? (query.length >= 1),
    staleTime: 2 * 60 * 1000, // 2분
  });
};
