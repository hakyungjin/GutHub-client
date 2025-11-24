import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

interface SocialSignupAdditionalInfoProps {
  provider: 'google' | 'kakao' | 'naver';
  userInfo?: {
    email?: string;
    name?: string;
  };
  onComplete?: (data: { nickname: string; difficulty: 'easy' | 'normal' | 'hard' }) => void;
}

/**
 * SNS 간편 회원가입 후 추가 정보 입력 화면
 * F-9 시나리오에 따라 닉네임, 난이도 등 추가 정보를 입력받습니다.
 */
export const SocialSignupAdditionalInfo: React.FC<SocialSignupAdditionalInfoProps> = ({
  provider,
  userInfo,
  onComplete,
}) => {
  const [nickname, setNickname] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ nickname?: string }>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const providerNames = {
    google: 'Google',
    kakao: 'Kakao',
    naver: 'Naver',
  };

  const handleComplete = () => {
    const newErrors: { nickname?: string } = {};

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

    // 추가 정보 입력 완료
    onComplete?.({ nickname, difficulty });

    // 프로토타입용 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{providerNames[provider]} 회원가입</Text>
        <Text style={styles.subtitle}>추가 정보를 입력해주세요</Text>

        {/* 연동된 정보 표시 */}
        {userInfo && (
          <View style={styles.infoBox}>
            {userInfo.email && (
              <Text style={styles.infoText}>이메일: {userInfo.email}</Text>
            )}
            {userInfo.name && <Text style={styles.infoText}>이름: {userInfo.name}</Text>}
          </View>
        )}

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

        {/* 완료 버튼 */}
        <TouchableOpacity
          style={[styles.completeButton, isLoading && styles.completeButtonDisabled]}
          onPress={handleComplete}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.completeButtonText}>가입 완료</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
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
  completeButton: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: '#999',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
