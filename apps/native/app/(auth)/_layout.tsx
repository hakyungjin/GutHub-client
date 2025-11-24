import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#007AFF",
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerBackTitle: "뒤로",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: "로그인",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "회원가입",
        }}
      />
      <Stack.Screen
        name="social-signup-additional"
        options={{
          title: "추가 정보 입력",
        }}
      />
    </Stack>
  );
}
