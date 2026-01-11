import type { OverallGutHealthStatus } from './diet';

/**
 * 일별 장 건강 점수 응답
 */
export interface DailyGutHealthResponse {
  status: OverallGutHealthStatus;
  badCount: number | null;
  violationReason: string | null;
  updatedAt: string | null;
}

/**
 * 월별 장 건강 상태 항목
 */
export interface MonthlyGutHealthItem {
  date: string;
  status: OverallGutHealthStatus;
  badCount: number | null;
  violationReason: string | null;
  updatedAt: string | null;
}

/**
 * 월별 장 건강 점수 응답
 */
export interface MonthlyGutHealthResponse {
  statusList: MonthlyGutHealthItem[];
}
