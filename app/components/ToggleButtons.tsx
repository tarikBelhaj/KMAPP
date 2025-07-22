import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Moon, Sun, Globe } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const isWeb = Platform.OS === 'web';

export const ToggleButtons: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t, isRTL } = useLanguage();

  return (
    <View style={[styles.container, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      {/* Theme Toggle */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          { 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }
        ]}
        onPress={toggleTheme}
      >
        {isDark ? (
          <Sun size={20} color={theme.colors.primary} />
        ) : (
          <Moon size={20} color={theme.colors.primary} />
        )}
        <Text style={[styles.toggleText, { color: theme.colors.text }]}>
          {isDark ? t('lightMode') : t('darkMode')}
        </Text>
      </TouchableOpacity>

      {/* Language Toggle */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          { 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          }
        ]}
        onPress={toggleLanguage}
      >
        <Globe size={20} color={theme.colors.primary} />
        <Text style={[styles.toggleText, { color: theme.colors.text }]}>
          {language === 'en' ? t('arabic') : t('english')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    ...(isWeb && {
      paddingHorizontal: 40,
      paddingVertical: 15,
      gap: 15,
    }),
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 16,
      transition: 'all 0.2s ease',
    }),
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
});