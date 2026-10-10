import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "coral",
      tabBarShowLabel: true,
      headerShown: false,
      }}>

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Ionicons name="home" size={28} color="grey"  />
          )

        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Searh",
          tabBarIcon: () => (
            <Ionicons name="search" size={28} color="grey" />
          )

        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => (
            <Ionicons name="settings" size={28} color="grey" />
          )

        }}
      />

    </Tabs>
  );
}
