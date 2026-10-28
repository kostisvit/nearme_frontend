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
          title: "Αρχική",
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={24} color={color}  />
          )

        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Αναζήτηση",
          tabBarIcon: ({color}) => (
            <Ionicons name="search" size={24} color={color} />
          )

        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Αγαπημένα",
          tabBarIcon: ({color}) => (
            <Ionicons name="heart-outline" size={24} color={color} />
          )

        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Ρυθμίσεις",
          tabBarIcon: () => (
            <Ionicons name="settings" size={24} color="grey" />
          )

        }}
      />

    </Tabs>
  );
}
