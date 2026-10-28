import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "#0F172A",
      tabBarShowLabel: true,
      headerShown: false,
      }}>

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={24} color={color}  />
          )

        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Searh",
          tabBarIcon: ({color}) => (
            <Ionicons name="search" size={24} color={color} />
          )

        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({color}) => (
            <Ionicons name="heart-outline" size={24} color={color} />
          )

        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: () => (
            <Ionicons name="settings" size={24} color="grey" />
          )

        }}
      />

    </Tabs>
  );
}
