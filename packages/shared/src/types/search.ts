/**
 * 건강기능식품 검색 결과
 */
export interface SupplementSearchResult {
  supplementId: string;
  supplementName: string;
  imageUrl: string;
  avgRating: number;
  cntReview: number;
  brand: string;
  price: number;
}

/**
 * 제품 검색 응답
 */
export interface ProductSearchResponse {
  query: string;
  supplementList: SupplementSearchResult[];
  nextCursor: string | null;
  hasNext: boolean;
}
