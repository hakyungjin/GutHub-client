import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import WebViewContainer from "../components/webview/WebViewContainer";

const BASE_URL = Constants.expoConfig?.extra?.baseUrl ?? "";

export default function Native() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <WebViewContainer baseURL={BASE_URL} />

      {/* 프로토타입 테스트용 플로팅 버튼 */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.floatingButtonText}>로그인 테스트</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  floatingButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});