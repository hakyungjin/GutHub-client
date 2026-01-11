/**
 * 식사 타입
 */
export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

/**
 * 식사 타입 한글 표시
 */
export type MealTypeDisplay = '아침' | '점심' | '저녁' | '간식';

/**
 * 영양소 타입
 */
export type Nutrient =
  | 'DIETARY_FIBER'
  | 'PROBIOTICS'
  | 'SATURATED_FAT'
  | 'SUGAR'
  | 'REFINED_CARBS'
  | 'FLOUR';

/**
 * 영양소 상태
 */
export type NutrientStatus = 'OPTIMAL' | 'EXCEEDED' | 'BELOW_MIN';

/**
 * 전체 장 건강 상태
 */
export type OverallGutHealthStatus = 'GOOD' | 'NORMAL' | 'BAD';

// ============ Request DTOs ============

/**
 * 식단 항목
 */
export interface DietItem {
  foodName: string;
  amount?: number;
  mealType: MealType;
}

/**
 * 식단 기록 생성 요청
 */
export interface CreateDietRequest {
  logDate: string; // YYYY-MM-DD
  items: DietItem[];
}

/**
 * 식단 수정 요청
 */
export interface UpdateDietRequest {
  foodName: string;
  amount?: number;
  mealType: MealType;
}

// ============ Response DTOs ============

/**
 * 식단 기록 응답
 */
export interface DietLogResponse {
  dietLogId: number;
  foodId: number;
  foodName: string;
  logDate: string;
  amount: number;
  mealType: MealTypeDisplay;
}

/**
 * 총 영양소 정보
 */
export interface TotalNutrientInfo {
  totalCalories: number;
  totalDietaryFiber: number;
  totalProbiotics: number;
  totalSaturatedFat: number;
  totalSugar: number;
  totalRefinedCarbs: number;
  totalFlour: number;
}

/**
 * 영양소 비교 정보
 */
export interface NutrientComparison {
  nutrientName: string;
  dailyIntake: number;
  minLimit: number | null;
  maxLimit: number | null;
  status: string;
  isExceeded: boolean;
  isBelowMin: boolean;
}

/**
 * 장 건강 분석
 */
export interface GutHealthAnalysis {
  overallStatus: string;
  comparisons: NutrientComparison[];
}

/**
 * 카테고리별 식단 기록
 */
export interface CategorizedDietLogs {
  아침: DietLogResponse[];
  점심: DietLogResponse[];
  저녁: DietLogResponse[];
  간식: DietLogResponse[];
}

/**
 * 날짜별 식단 조회 응답
 */
export interface DietsByDateResponse {
  date: string;
  categorizedDietLogs: CategorizedDietLogs;
  totalNutrientInfo: TotalNutrientInfo;
  gutHealthAnalysis: GutHealthAnalysis;
}

/**
 * 음식 검색 결과
 */
export interface FoodSearchResult {
  id: number;
  name: string;
}

/**
 * 장 건강 연속 유지일 응답
 */
export interface StreakResponse {
  streakCount: number;
  lastRecordDate: string;
}
