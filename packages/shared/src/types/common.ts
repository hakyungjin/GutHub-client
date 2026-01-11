/**
 * 공통 API 응답 타입
 */
export interface ApiResponse<T = null> {
  code: string;
  message: string;
  data: T;
}

/**
 * 페이지네이션 정보
 */
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

/**
 * 페이지네이션 응답
 */
export interface PageResponse<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

/**
 * 커서 기반 페이지네이션 응답
 */
export interface CursorPageResponse<T> {
  query: string;
  supplementList: T[];
  nextCursor: string | null;
  hasNext: boolean;
}

/**
 * API 응답 코드
 */
export type ApiResponseCode =
  | 'SUCCESS'
  | 'INVALID_PARAMETER'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'UNPROCESSABLE_ENTITY'
  | 'INTERNAL_SERVER_ERROR';
