import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Alert } from 'react-native';

import { SocialSignupAdditionalInfo } from '../../components/auth/SocialSignupAdditionalInfo';

export default function SocialSignupAdditionalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ provider: 'google' | 'kakao' | 'naver' }>();

  const provider = params.provider || 'google';

  // TODO: SNS 로그인 후 받아온 사용자 정보
  const mockUserInfo = {
    email: 'user@example.com',
    name: '홍길동',
  };

  const handleComplete = (data: { nickname: string; difficulty: 'easy' | 'normal' | 'hard' }) => {
    // TODO: 실제 추가 정보 저장 API 호출
    console.log('추가 정보 입력 완료:', {
      provider,
      ...mockUserInfo,
      ...data,
    });

    // 프로토타입용: 성공 시뮬레이션
    Alert.alert('가입 완료', 'SNS 회원가입이 완료되었습니다.', [
      {
        text: '확인',
        onPress: () => router.replace('/'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <SocialSignupAdditionalInfo
        provider={provider}
        userInfo={mockUserInfo}
        onComplete={handleComplete}
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
