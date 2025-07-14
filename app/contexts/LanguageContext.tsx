import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'ar' | 'en';

interface Translations {
  [key: string]: string;
}

const translations = {
  en: {
    home: 'Home',
    carRentals: 'Car Rentals',
    hotels: 'Hotels',
    experiences: 'Experiences',
    welcomeBack: 'Welcome Back',
    whereToNext: 'Where to next?',
    searchDestination: 'Search your destination...',
    popularCities: 'Popular Cities',
    featuredDeals: 'Featured Deals',
    viewAll: 'View All',
    withProfessionalChauffeur: 'With Professional Chauffeur',
    luxurySuiteWithEiffelView: 'Luxury Suite with Eiffel View',
    champagneRegionTour: 'Champagne Region Tour',
    premium: 'Premium',
    exclusive: 'Exclusive',
    vip: 'VIP',
    day: 'day',
    night: 'night',
    person: 'person',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    arabic: 'العربية',
    english: 'English',
  },
  ar: {
    home: 'الرئيسية',
    carRentals: 'تأجير السيارات',
    hotels: 'الفنادق',
    experiences: 'التجارب',
    welcomeBack: 'مرحباً بعودتك',
    whereToNext: 'إلى أين بعد ذلك؟',
    searchDestination: 'ابحث عن وجهتك...',
    popularCities: 'المدن الشهيرة',
    featuredDeals: 'العروض المميزة',
    viewAll: 'عرض الكل',
    withProfessionalChauffeur: 'مع سائق محترف',
    luxurySuiteWithEiffelView: 'جناح فاخر مع إطلالة على برج إيفل',
    champagneRegionTour: 'جولة منطقة الشمبانيا',
    premium: 'مميز',
    exclusive: 'حصري',
    vip: 'في آي بي',
    day: 'يوم',
    night: 'ليلة',
    person: 'شخص',
    settings: 'الإعدادات',
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع المضيء',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'English',
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
        setLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    }
  };

  const toggleLanguage = async () => {
    const newLanguage: Language = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem('language', newLanguage);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};