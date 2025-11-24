import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

interface SignupFormProps {
  onSignup?: (userData: {
    email: string;
    password: string;
    nickname: string;
    difficulty: 'easy' | 'normal' | 'hard';
  }) => void;
  onNavigateToLogin?: () => void;
  onSocialSignup?: (provider: 'google' | 'kakao' | 'naver') => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSignup,
  onNavigateToLogin,
  onSocialSignup,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    passwordConfirm?: string;
    nickname?: string;
  }>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // 최소 8자, 영문/숫자/특수문자 중 2가지 이상 조합
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const validCombinations = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length >= 2;

    return password.length >= 8 && validCombinations;
  };

  const handleSignup = () => {
    const newErrors: {
      email?: string;
      password?: string;
      passwordConfirm?: string;
      nickname?: string;
    } = {};

    // 이메일 검증
    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // 비밀번호 검증
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(password)) {
      newErrors.password = '비밀번호는 8자 이상, 영문/숫자/특수문자 중 2가지 이상 조합이어야 합니다.';
    }

    // 비밀번호 확인 검증
    if (!passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
    } else if (password !== passwordConfirm) {
      newErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
    }

    // 닉네임 검증
    if (!nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (nickname.length < 2 || nickname.length > 10) {
      newErrors.nickname = '닉네임은 2-10자 사이여야 합니다.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!agreedToTerms) {
      alert('이용약관 및 개인정보 처리방침에 동의해주세요.');
      return;
    }

    setErrors({});
    setIsLoading(true);

    // 실제 회원가입 로직은 onSignup 콜백으로 처리
    onSignup?.({ email, password, nickname, difficulty });

    // 프로토타입용 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialSignup = (provider: 'google' | 'kakao' | 'naver') => {
    if (!agreedToTerms) {
      alert('이용약관 및 개인정보 처리방침에 동의해주세요.');
      return;
    }
    onSocialSignup?.(provider);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>회원가입</Text>

          {/* 이메일 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>이메일 *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="이메일을 입력하세요"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* 비밀번호 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>비밀번호 *</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="비밀번호를 입력하세요 (8자 이상)"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              secureTextEntry
              editable={!isLoading}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* 비밀번호 확인 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>비밀번호 확인 *</Text>
            <TextInput
              style={[styles.input, errors.passwordConfirm && styles.inputError]}
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordConfirm}
              onChangeText={(text) => {
                setPasswordConfirm(text);
                if (errors.passwordConfirm)
                  setErrors({ ...errors, passwordConfirm: undefined });
              }}
              secureTextEntry
              editable={!isLoading}
            />
            {errors.passwordConfirm && (
              <Text style={styles.errorText}>{errors.passwordConfirm}</Text>
            )}
          </View>

          {/* 닉네임 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>닉네임 *</Text>
            <TextInput
              style={[styles.input, errors.nickname && styles.inputError]}
              placeholder="닉네임을 입력하세요 (2-10자)"
              value={nickname}
              onChangeText={(text) => {
                setNickname(text);
                if (errors.nickname) setErrors({ ...errors, nickname: undefined });
              }}
              editable={!isLoading}
            />
            {errors.nickname && <Text style={styles.errorText}>{errors.nickname}</Text>}
          </View>

          {/* 난이도 선택 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>우선 순위 (난이도) *</Text>
            <View style={styles.difficultyContainer}>
              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'easy' && styles.difficultyButtonActive,
                ]}
                onPress={() => setDifficulty('easy')}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === 'easy' && styles.difficultyButtonTextActive,
                  ]}
                >
                  쉬움
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'normal' && styles.difficultyButtonActive,
                ]}
                onPress={() => setDifficulty('normal')}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === 'normal' && styles.difficultyButtonTextActive,
                  ]}
                >
                  보통
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.difficultyButton,
                  difficulty === 'hard' && styles.difficultyButtonActive,
                ]}
                onPress={() => setDifficulty('hard')}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === 'hard' && styles.difficultyButtonTextActive,
                  ]}
                >
                  어려움
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 이용약관 동의 */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            disabled={isLoading}
          >
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
              {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              이용약관 및 개인정보 처리방침에 동의합니다. *
            </Text>
          </TouchableOpacity>

          {/* 회원가입 버튼 */}
          <TouchableOpacity
            style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
            onPress={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupButtonText}>회원가입</Text>
            )}
          </TouchableOpacity>

          {/* 구분선 */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>SNS 간편 회원가입</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* SNS 회원가입 버튼들 */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => handleSocialSignup('google')}
              disabled={isLoading}
            >
              <Text style={styles.socialButtonText}>Google로 가입</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.kakaoButton]}
              onPress={() => handleSocialSignup('kakao')}
              disabled={isLoading}
            >
              <Text style={styles.socialButtonText}>Kakao로 가입</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.naverButton]}
              onPress={() => handleSocialSignup('naver')}
              disabled={isLoading}
            >
              <Text style={[styles.socialButtonText, styles.naverButtonText]}>
                Naver로 가입
              </Text>
            </TouchableOpacity>
          </View>

          {/* 로그인 링크 */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>이미 계정이 있으신가요? </Text>
            <TouchableOpacity onPress={onNavigateToLogin} disabled={isLoading}>
              <Text style={styles.loginLink}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  difficultyButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  difficultyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  signupButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signupButtonDisabled: {
    backgroundColor: '#999',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontSize: 14,
  },
  socialContainer: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    borderColor: '#FEE500',
  },
  naverButton: {
    backgroundColor: '#03C75A',
    borderColor: '#03C75A',
  },
  naverButtonText: {
    color: '#fff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
