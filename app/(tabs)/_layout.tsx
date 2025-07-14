import { Tabs } from 'expo-router';
import { Chrome as Home } from 'lucide-react-native';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#111111',
          borderTopColor: '#333333',
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cars"
        options={{
          title: 'Car Rentals',
          tabBarIcon: ({ size, color }) => (
            <Text style={{ fontSize: size, color }}>🚗</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="hotels"
        options={{
          title: 'Hotels',
          tabBarIcon: ({ size, color }) => (
            <Text style={{ fontSize: size, color }}>🏨</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="experiences"
        options={{
          title: 'Experiences',
          tabBarIcon: ({ size, color }) => (
            <Text style={{ fontSize: size, color }}>🗺️</Text>
          ),
        }}
      />
    </Tabs>
  );
}