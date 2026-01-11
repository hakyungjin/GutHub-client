import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken, clearAuth } from '../stores/auth.store';
import { publicApiInstance } from './instance';

/**
 * 요청 인터셉터 - Access Token을 헤더에 주입
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (!config?.headers) {
    return config;
  }

  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * 응답 성공 인터셉터
 */
export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public details?: unknown;

  constructor(statusCode: number, message: string, code: string = '', details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = 'ApiError';
  }
}

/**
 * 에러 응답 인터페이스
 */
interface ErrorResponse {
  code: string;
  message: string;
}

/**
 * 토큰 갱신 중 플래그
 */
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * 토큰 갱신 완료 후 대기중인 요청들 처리
 */
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

/**
 * 토큰 갱신 대기열에 추가
 */
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

/**
 * 응답 에러 인터셉터 - 토큰 갱신 및 에러 처리
 */
export const errorInterceptor = async (error: AxiosError<ErrorResponse>): Promise<unknown> => {
  const { config, response } = error;

  if (!config) {
    throw new ApiError(0, '요청이 잘못되었습니다.', 'REQUEST_ERROR');
  }

  const originalRequest = config as InternalAxiosRequestConfig & { _retry?: boolean };

  // 500 Internal Server Error
  if (response?.status === 500) {
    console.error('500 Internal Server Error');
    throw new ApiError(500, response?.data?.message || '서버 내부 오류가 발생했습니다.', 'INTERNAL_SERVER_ERROR', response?.data);
  }

  // 404 Not Found
  if (response?.status === 404) {
    console.error('404 Not Found');
    throw new ApiError(404, response?.data?.message || '요청한 리소스를 찾을 수 없습니다.', 'NOT_FOUND', response?.data);
  }

  // 422 Unprocessable Entity
  if (response?.status === 422) {
    throw new ApiError(422, response?.data?.message || '처리할 수 없는 요청입니다.', 'UNPROCESSABLE_ENTITY', response?.data);
  }

  // 400 Bad Request
  if (response?.status === 400) {
    throw new ApiError(400, response?.data?.message || '잘못된 요청입니다.', 'INVALID_PARAMETER', response?.data);
  }

  // 401 Unauthorized
  if (response?.status === 401) {
    clearAuth();
    throw new ApiError(401, '인증이 필요합니다.', 'UNAUTHORIZED', response?.data);
  }

  // 403 Forbidden - 토큰 만료 처리
  if (response?.status === 403) {
    const { code } = response.data || {};

    // ET: Expired Token - 토큰 갱신 시도
    if (code === 'ET' && !originalRequest._retry) {
      // 이미 갱신 중이면 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(publicApiInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 토큰 갱신 요청 (쿠키의 refresh token 사용)
        const refreshResponse = await publicApiInstance.post<{ data: { accessToken: string } }>('/jwt/refresh');
        const newAccessToken = refreshResponse.data.data.accessToken;

        // 새 토큰 저장
        setAccessToken(newAccessToken);

        // 대기중인 요청들 처리
        onRefreshed(newAccessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return publicApiInstance(originalRequest);
      } catch (refreshError) {
        // 갱신 실패 시 로그아웃
        clearAuth();
        refreshSubscribers = [];
        throw new ApiError(403, '세션이 만료되었습니다. 다시 로그인해주세요.', 'SESSION_EXPIRED');
      } finally {
        isRefreshing = false;
      }
    }

    // 권한 없음
    clearAuth();
    throw new ApiError(403, '권한이 없습니다.', 'FORBIDDEN', response?.data);
  }

  // 기타 에러
  if (response) {
    const { status, data } = response;
    throw new ApiError(status, data?.message || '서버 처리 중 오류가 발생했습니다.', data?.code || 'UNKNOWN_ERROR', data);
  } else if (error.request) {
    throw new ApiError(0, '서버로부터 응답을 받지 못했습니다.', 'NO_RESPONSE', error.request);
  } else {
    throw new ApiError(0, '요청 중 오류가 발생했습니다.', 'REQUEST_ERROR', error.message);
  }
};
