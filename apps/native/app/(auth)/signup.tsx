import { useRouter } from 'expo-router';
import { View, StyleSheet, Alert } from 'react-native';

import { SignupForm } from '../../components/auth/SignupForm';

export default function SignupScreen() {
  const router = useRouter();

  const handleSignup = (userData: {
    email: string;
    password: string;
    nickname: string;
    difficulty: 'easy' | 'normal' | 'hard';
  }) => {
    // TODO: 실제 회원가입 API 호출
    console.log('회원가입 시도:', userData);

    // 프로토타입용: 성공 시뮬레이션
    Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.', [
      {
        text: '확인',
        onPress: () => router.replace('/(auth)/login'),
      },
    ]);
  };

  const handleNavigateToLogin = () => {
    router.back();
  };

  const handleSocialSignup = (provider: 'google' | 'kakao' | 'naver') => {
    // TODO: 실제 SNS 회원가입 연동
    console.log(`${provider} 회원가입 시도`);

    // 프로토타입용: SNS 회원가입 시뮬레이션
    Alert.alert(
      'SNS 회원가입',
      `${provider}로 회원가입을 진행합니다.\n\n(프로토타입: 실제 연동은 구현 필요)`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '계속',
          onPress: () => {
            // SNS 회원가입 후 추가 정보 입력 화면으로 이동
            router.push({
              pathname: '/(auth)/social-signup-additional',
              params: { provider },
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SignupForm
        onSignup={handleSignup}
        onNavigateToLogin={handleNavigateToLogin}
        onSocialSignup={handleSocialSignup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
