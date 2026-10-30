import { Stack, router } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerTitle: () => (
        <Pressable
          onPress={() => router.replace('/home')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text style={{ fontSize: 20 }}>📍</Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '800',
              color: '#FFFFFF',
            }}
          >
            NearMe
          </Text>
        </Pressable>
      ),
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#0F172A',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackVisible: false,
      headerShadowVisible: false,
    }}>
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
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="authentication/login"
        options={{
          headerShown: false,
        }}
      />
    </Stack>

  );
}
