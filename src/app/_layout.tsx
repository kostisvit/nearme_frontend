import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Welcome screen */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      {/* Main tab navigation */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
