# 인증 (Auth) 컴포넌트

F-9 로그인/회원가입 시나리오를 기반으로 제작된 React Native 인증 UI 프로토타입입니다.

## 📁 파일 구조

```
components/auth/
├── LoginForm.tsx                    # 로그인 화면
├── SignupForm.tsx                   # 회원가입 화면 (기본)
├── SocialSignupAdditionalInfo.tsx   # SNS 회원가입 추가 정보 입력
└── README.md
```

## 🎯 구현된 기능

### 1. LoginForm (로그인)

**위치**: [LoginForm.tsx](./LoginForm.tsx)

**주요 기능**:
- 이메일/비밀번호 입력
- 유효성 검증 (이메일 형식, 필수 입력)
- SNS 로그인 버튼 (Google, Kakao, Naver)
- 회원가입 링크

**사용 예시**:
```tsx
import { LoginForm } from '../components/auth/LoginForm';

<LoginForm
  onLogin={(credentials) => {
    // 로그인 API 호출
    console.log(credentials.email, credentials.password);
  }}
  onNavigateToSignup={() => router.push('/signup')}
  onSocialLogin={(provider) => {
    // SNS 로그인 처리
    console.log(`${provider} 로그인`);
  }}
/>
```

### 2. SignupForm (회원가입)

**위치**: [SignupForm.tsx](./SignupForm.tsx)

**주요 기능**:
- 이메일, 비밀번호, 비밀번호 확인, 닉네임 입력
- 난이도 선택 (쉬움/보통/어려움)
- 유효성 검증:
  - 이메일 형식 검증
  - 비밀번호 강도 검증 (8자 이상, 영문/숫자/특수문자 중 2가지 이상)
  - 비밀번호 일치 확인
  - 닉네임 길이 검증 (2-10자)
- 이용약관 동의 체크박스
- SNS 간편 회원가입 버튼

**사용 예시**:
```tsx
import { SignupForm } from '../components/auth/SignupForm';

<SignupForm
  onSignup={(userData) => {
    // 회원가입 API 호출
    console.log(userData);
  }}
  onNavigateToLogin={() => router.back()}
  onSocialSignup={(provider) => {
    // SNS 회원가입 처리
    router.push(`/social-signup-additional?provider=${provider}`);
  }}
/>
```

### 3. SocialSignupAdditionalInfo (SNS 회원가입 추가 정보)

**위치**: [SocialSignupAdditionalInfo.tsx](./SocialSignupAdditionalInfo.tsx)

**주요 기능**:
- SNS 연동 후 추가 정보 입력 (닉네임, 난이도)
- SNS에서 받아온 정보 표시 (이메일, 이름)
- 이용약관 동의 체크박스

**사용 예시**:
```tsx
import { SocialSignupAdditionalInfo } from '../components/auth/SocialSignupAdditionalInfo';

<SocialSignupAdditionalInfo
  provider="google"
  userInfo={{
    email: 'user@gmail.com',
    name: '홍길동'
  }}
  onComplete={(data) => {
    // 추가 정보 저장 API 호출
    console.log(data.nickname, data.difficulty);
  }}
/>
```

## 🛣️ 라우팅 구조 (Expo Router)

Expo Router의 파일 기반 라우팅을 사용하며, 인증 관련 화면은 `(auth)` 그룹으로 구성되어 있습니다.

```
app/
├── _layout.tsx                          # 루트 레이아웃
├── index.tsx                            # 메인 화면 (/)
└── (auth)/                              # 인증 그룹 (URL에 표시되지 않음)
    ├── _layout.tsx                      # 인증 레이아웃 (Stack 네비게이션)
    ├── login.tsx                        # 로그인 페이지
    ├── signup.tsx                       # 회원가입 페이지
    └── social-signup-additional.tsx     # SNS 추가 정보 페이지
```

### 라우트 경로

- `/` - 메인 화면
- `/(auth)/login` - 로그인 페이지
- `/(auth)/signup` - 회원가입 페이지
- `/(auth)/social-signup-additional` - SNS 회원가입 추가 정보 페이지

### 네비게이션 예시

```tsx
import { useRouter } from 'expo-router';

const router = useRouter();

// 로그인 화면으로 이동
router.push('/(auth)/login');

// 회원가입 화면으로 이동
router.push('/(auth)/signup');

// 이전 화면으로 돌아가기
router.back();

// 메인 화면으로 이동 (스택 초기화)
router.replace('/');
```

## 🔄 사용자 플로우

### 기본 시나리오 (로그인)

1. 사용자가 앱 실행
2. 메인 화면에서 "로그인 테스트" 버튼 클릭 → `/login` 이동
3. 이메일/비밀번호 입력 후 로그인
4. 또는 SNS 로그인 버튼 클릭
5. 로그인 성공 → 메인 화면으로 이동

### 기본 회원가입 시나리오

1. 로그인 화면에서 "회원가입" 링크 클릭 → `/signup` 이동
2. 이메일, 비밀번호, 닉네임, 난이도 선택
3. 이용약관 동의
4. "회원가입" 버튼 클릭
5. 회원가입 성공 → 로그인 화면으로 이동

### SNS 간편 회원가입 시나리오 (F-9 기반)

1. 회원가입 화면에서 SNS 회원가입 버튼 클릭
2. 이용약관 동의 확인
3. SNS 인증 (Google, Kakao, Naver)
4. 추가 정보 입력 화면 이동 → `/social-signup-additional`
5. 닉네임, 난이도 입력
6. 이용약관 재확인
7. "가입 완료" 버튼 클릭
8. 회원가입 완료 → 메인 화면으로 이동

## 📋 F-9 시나리오 구현 체크리스트

### 로그인/간편 로그인

- ✅ 앱을 실행해야 한다
- ✅ 로그인/간편 로그인 선택 가능
  - ✅ ID/PW 입력 → 로그인 버튼 누르기
  - ✅ SNS 인증 후 확인(F-6 또는 F-7)으로 이동

### 회원가입/간편 회원가입

#### 기본 시나리오 (로그인)
- ✅ 유저가 로그인 화면에서 원하는 SNS 아이콘 선택
- ✅ 시스템이 해당 SNS 로그인 페이지로 유저를 리다이렉트
- ✅ 유저가 SNS 측에서 인증을 완료
- ✅ 시스템이 재정을 생성하고 신규 유저 홈 확면(F-6)으로 이동

#### 기본 시나리오 (회원가입)
- ✅ 유저가 회원가입 화면에서 원하는 SNS 아이콘을 선택
- ✅ 시스템이 해당 SNS 로그인 및 정보 제공 동의 페이지로 유저를 리다이렉트
- ✅ 유저가 SNS 측에서 정보 제공 동의를 완료
- ✅ 서비스에 필요한 추가 정보(닉네임, 이메일 주소, 연령대) 입력하는 화면으로 이동
- ✅ 유저가 추가 정보를 입력하고 '가입 완료' 버튼을 누름
- ✅ 시스템이 SNS 정보를 기반으로 계정을 생성하고 신규 유저 홈 확면(F-6)으로 이동

### 대안 시나리오
- ✅ A2. 로그인 정보가 유효하지 않을 경우 - "ID 또는 비밀번호를 확인해주세요." 메시지 표시

### 기타요구사항
- ✅ 보안을 위한 비밀번호 암호화 처리가 필요 (Note: 실제 구현 시 필요)

## 🎨 디자인 가이드

### 색상
- Primary: `#007AFF` (iOS 블루)
- Error: `#ff3b30` (빨강)
- Google 버튼: `#fff` (흰색 배경)
- Kakao 버튼: `#FEE500` (카카오 노랑)
- Naver 버튼: `#03C75A` (네이버 초록)

### 폰트 크기
- 제목: 28px
- 버튼: 16px
- 레이블: 14px
- 에러 메시지: 12px

## 🔧 TODO (실제 구현 시 필요)

1. **API 연동**
   - 로그인 API
   - 회원가입 API
   - SNS OAuth 연동 (Google, Kakao, Naver)
   - 추가 정보 저장 API

2. **상태 관리**
   - 인증 상태 관리 (Zustand, Context API 등)
   - 토큰 저장 및 관리 (AsyncStorage, SecureStore)

3. **보안**
   - 비밀번호 암호화
   - 토큰 보안 저장
   - HTTPS 통신

4. **에러 처리**
   - 네트워크 에러 처리
   - API 에러 메시지 표시
   - 재시도 로직

5. **UX 개선**
   - 로딩 인디케이터
   - 키보드 처리 최적화
   - 접근성 개선

## 📝 참고 문서

- [F-9. 로그인/회원가입 시나리오](../../../docs/F-9-로그인-회원가입.md)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)
