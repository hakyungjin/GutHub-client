import type { ApiResponse } from '../types/common';
import type { ProductSearchResponse } from '../types/search';
import { publicApiInstance } from './instance';

/**
 * 제품 검색 파라미터
 */
export interface SearchProductsParams {
  q: string;
  cursor?: string;
}

/**
 * 제품 검색
 * - URL: GET /api/search/products
 * - 인증: 불필요
 */
export const searchProducts = async ({ q, cursor }: SearchProductsParams): Promise<ProductSearchResponse> => {
  const response = await publicApiInstance.get<ApiResponse<ProductSearchResponse>>('/api/search/products', {
    params: { q, cursor },
  });
  return response.data.data;
};
