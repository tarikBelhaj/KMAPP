import { Tabs } from 'expo-router';
import { Car, Hotel, MapPin, Chrome as Home } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function TabLayout() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar,
          borderTopColor: theme.colors.border,
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
          title: t('home'),
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cars"
        options={{
          title: t('carRentals'),
          tabBarIcon: ({ size, color }) => (
            <Car size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="hotels"
        options={{
          title: t('hotels'),
          tabBarIcon: ({ size, color }) => (
            <Hotel size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="experiences"
        options={{
          title: t('experiences'),
          tabBarIcon: ({ size, color }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}