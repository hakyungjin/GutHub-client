import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

/**
 * 인증 상태 인터페이스
 */
interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * 인증 액션 인터페이스
 */
interface AuthActions {
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * 인증 스토어 타입
 */
export type AuthStore = AuthState & AuthActions;

/**
 * 초기 상태
 */
const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

/**
 * 플랫폼별 스토리지 추상화
 * - Web: localStorage (기본)
 * - React Native: AsyncStorage (외부에서 주입)
 */
let customStorage: StateStorage | null = null;

/**
 * 커스텀 스토리지 설정 (React Native에서 AsyncStorage/SecureStore 주입용)
 */
export const setAuthStorage = (storage: StateStorage) => {
  customStorage = storage;
};

/**
 * 스토리지 가져오기
 */
const getStorage = (): StateStorage => {
  if (customStorage) {
    return customStorage;
  }

  // 브라우저 환경 체크
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      getItem: (name: string) => {
        const value = localStorage.getItem(name);
        return value ?? null;
      },
      setItem: (name: string, value: string) => {
        localStorage.setItem(name, value);
      },
      removeItem: (name: string) => {
        localStorage.removeItem(name);
      },
    };
  }

  // SSR 또는 스토리지 미지원 환경
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
};

/**
 * 인증 스토어
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      /**
       * Access Token 설정
       */
      setAccessToken: (token: string) => {
        set({
          accessToken: token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      /**
       * 인증 정보 초기화 (로그아웃)
       */
      clearAuth: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      /**
       * 로딩 상태 설정
       */
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'guthub-auth-storage',
      storage: createJSONStorage(() => getStorage()),
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
);

/**
 * 토큰 가져오기 (인터셉터에서 사용)
 */
export const getAccessToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

/**
 * 토큰 설정 (인터셉터에서 사용)
 */
export const setAccessToken = (token: string): void => {
  useAuthStore.getState().setAccessToken(token);
};

/**
 * 로그아웃 (인터셉터에서 사용)
 */
export const clearAuth = (): void => {
  useAuthStore.getState().clearAuth();
};
