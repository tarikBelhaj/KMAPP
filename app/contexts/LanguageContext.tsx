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
    // Car Rentals translations
    vehicleRental: 'Vehicle Rental',
    discoverOurExclusiveCollection: 'Discover our exclusive collection of premium vehicles',
    vehicles: 'Vehicles',
    support: 'Support',
    service: 'Service',
    ecoCars: 'Eco Cars',
    premiumCars: 'Premium Cars',
    withChauffeur: 'With Chauffeur',
    reserve: 'Reserve',
    perDay: '/day',
    // Hotels translations
    fromComfortableStays: 'From comfortable stays to luxury accommodations',
    normalHotels: 'Normal Hotels',
    premiumHotels: 'Premium Hotels',
    freeWifi: 'Free WiFi',
    earlyCheckIn: 'Early check-in',
    freeCancellation: 'Free cancellation',
    lateCheckout: 'Late checkout',
    freeBreakfast: 'Free breakfast',
    save15: 'Save 15%',
    complimentaryUpgrade: 'Complimentary upgrade',
    freeSpatreatment: 'Free spa treatment',
    bookNow: 'Book Now',
    perNight: '/night',
    // Experiences translations
    premiumExperiences: 'Premium Experiences',
    exclusiveToursAndActivities: 'Exclusive tours and activities',
    filterByCity: 'Filter by City',
    bookExperience: 'Book Experience',
    perGroup: '/group',
    hours: 'hours',
    fullDay: 'Full day',
    upTo: 'Up to',
    people: 'people',
    cultural: 'Cultural',
    culinary: 'Culinary',
    wineSpirits: 'Wine & Spirits',
    wellness: 'Wellness',
    luxury: 'Luxury',
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
    // Car Rentals translations
    vehicleRental: 'تأجير المركبات',
    discoverOurExclusiveCollection: 'اكتشف مجموعتنا الحصرية من المركبات المميزة',
    vehicles: 'مركبات',
    support: 'دعم',
    service: 'خدمة',
    ecoCars: 'السيارات البيئية',
    premiumCars: 'السيارات المميزة',
    withChauffeur: 'مع سائق',
    reserve: 'احجز',
    perDay: '/يوم',
    // Hotels translations
    fromComfortableStays: 'من الإقامة المريحة إلى أماكن الإقامة الفاخرة',
    normalHotels: 'الفنادق العادية',
    premiumHotels: 'الفنادق المميزة',
    freeWifi: 'واي فاي مجاني',
    earlyCheckIn: 'تسجيل وصول مبكر',
    freeCancellation: 'إلغاء مجاني',
    lateCheckout: 'تسجيل خروج متأخر',
    freeBreakfast: 'إفطار مجاني',
    save15: 'وفر 15%',
    complimentaryUpgrade: 'ترقية مجانية',
    freeSpatreatment: 'علاج سبا مجاني',
    bookNow: 'احجز الآن',
    perNight: '/ليلة',
    // Experiences translations
    premiumExperiences: 'التجارب المميزة',
    exclusiveToursAndActivities: 'جولات وأنشطة حصرية',
    filterByCity: 'تصفية حسب المدينة',
    bookExperience: 'احجز التجربة',
    perGroup: '/مجموعة',
    hours: 'ساعات',
    fullDay: 'يوم كامل',
    upTo: 'حتى',
    people: 'أشخاص',
    cultural: 'ثقافي',
    culinary: 'طهي',
    wineSpirits: 'نبيذ ومشروبات',
    wellness: 'عافية',
    luxury: 'فاخر',
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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