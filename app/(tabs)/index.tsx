import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';


const { width } = Dimensions.get('window');

const popularCities = [
  'Paris', 'Londres', 'Genève', 'Megève', 'Courchevel',
  'Nice', 'Cannes', 'Istanbul'
];
const featuredDeals = [
  {
    id: 1,
    title: 'Bentley Continental GT',
    subtitle: 'With Professional Chauffeur',
    price: '€850/day',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Premium'
  },
  {
    id: 2,
    title: 'Four Seasons Paris',
    subtitle: 'Luxury Suite with Eiffel View',
    price: '€2,400/night',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'Exclusive'
  },
  {
    id: 3,
    title: 'Private Wine Tasting',
    subtitle: 'Champagne Region Tour',
    price: '€1,200/person',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    badge: 'VIP'
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState('Paris');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isArabic, setIsArabic] = useState(false);

  // Simple theme object
  const theme = {
    colors: {
      background: isDark ? '#111111' : '#FFFFFF',
      surface: isDark ? '#1A1A1A' : '#F5F5F5',
      primary: '#FFD700',
      text: isDark ? '#FFFFFF' : '#111111',
      textSecondary: isDark ? '#CCCCCC' : '#666666',
      border: isDark ? '#333333' : '#E0E0E0',
      tabBar: isDark ? '#111111' : '#FFFFFF',
    }
  };

  // Simple translation function
  const t = (key: string) => {
    const translations: { [key: string]: { en: string; ar: string } } = {
      welcomeBack: { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
      whereToNext: { en: 'Where to next?', ar: 'إلى أين بعد ذلك؟' },
      featuredDeals: { en: 'Featured Deals', ar: 'العروض المميزة' },
      popularCities: { en: 'Popular Cities', ar: 'المدن الشهيرة' },
      carRentals: { en: 'Car Rentals', ar: 'تأجير السيارات' },
      hotels: { en: 'Hotels', ar: 'الفنادق' },
      experiences: { en: 'Experiences', ar: 'التجارب' },
      viewAll: { en: 'View All', ar: 'عرض الكل' },
      darkMode: { en: 'Dark Mode', ar: 'الوضع المظلم' },
      lightMode: { en: 'Light Mode', ar: 'الوضع المضيء' },
      arabic: { en: 'العربية', ar: 'العربية' },
      english: { en: 'English', ar: 'English' },
    };
    return translations[key] ? translations[key][isArabic ? 'ar' : 'en'] : key;
  };

  const isRTL = isArabic;

  const CategoryButton = ({ icon, title, route }: { icon: any, title: string, route: string }) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton,
        { 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        }
      ]}
      onPress={() => router.push(route)}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.background }]}>
        {icon}
      </View>
      <Text style={[styles.categoryText, { color: theme.colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ writingDirection: isRTL ? 'rtl' : 'ltr' }}
      >
        {/* Toggle Buttons */}
        <View style={[{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10, gap: 10 }]}>
          {/* Theme Toggle */}
          <TouchableOpacity
            style={[{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              borderWidth: 1,
              gap: 8,
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }]}
            onPress={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <>
                <Text style={{ fontSize: 20 }}>☀️</Text>
                <Text style={[{ fontSize: 14, fontWeight: '600', fontFamily: 'Inter', color: theme.colors.text }]}>
                  {t('lightMode')}
                </Text>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 20 }}>🌙</Text>
                <Text style={[{ fontSize: 14, fontWeight: '600', fontFamily: 'Inter', color: theme.colors.text }]}>
                  {t('darkMode')}
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Language Toggle */}
          <TouchableOpacity
            style={[{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              borderWidth: 1,
              gap: 8,
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            }]}
            onPress={() => setIsArabic(!isArabic)}
          >
            <Text style={{ fontSize: 20 }}>🌍</Text>
            <Text style={[{ fontSize: 14, fontWeight: '600', fontFamily: 'Inter', color: theme.colors.text }]}>
              {isArabic ? t('english') : t('arabic')}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: theme.colors.text }]}>
            {t('welcomeBack')}
          </Text>
          <Text style={[styles.subText, { color: theme.colors.textSecondary }]}>
            {t('whereToNext')}
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Search size={20} color={theme.colors.textSecondary} />
            <TouchableOpacity 
              style={styles.citySelector}
              onPress={() => setShowCityDropdown(!showCityDropdown)}
            >
              <Text style={[styles.cityText, { color: theme.colors.text }]}>{selectedCity}</Text>
              <ChevronRight 
                size={16} 
                color={theme.colors.primary} 
                style={{ 
                  transform: [{ rotate: showCityDropdown ? '90deg' : '0deg' }] 
                }} 
              />
            </TouchableOpacity>
          </View>
          
          {showCityDropdown && (
            <View style={[styles.cityDropdown, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <ScrollView style={styles.cityList} nestedScrollEnabled>
                {popularCities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    style={[
                      styles.cityOption,
                      selectedCity === city && styles.selectedCityOption
                    ]}
                    onPress={() => {
                      setSelectedCity(city);
                      setShowCityDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.cityOptionText,
                      { color: theme.colors.text },
                      selectedCity === city && [
                        styles.selectedCityOptionText,
                        { color: theme.colors.primary }
                      ]
                    ]}>
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        {/* Featured Deals Carousel */}
        <View style={styles.carouselContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t('featuredDeals')}</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {featuredDeals.map((deal) => (
              <View key={deal.id} style={styles.dealCard}>
                <Image source={{ uri: deal.image }} style={styles.dealImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.gradient}
                />
                <View style={styles.dealContent}>
                  <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.badgeText, { color: theme.colors.background }]}>{deal.badge}</Text>
                  </View>
                  <Text style={[styles.dealTitle, { color: '#FFFFFF' }]}>{deal.title}</Text>
                  <Text style={[styles.dealSubtitle, { color: '#CCCCCC' }]}>{deal.subtitle}</Text>
                  <Text style={[styles.dealPrice, { color: theme.colors.primary }]}>{deal.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('popularCities')}
          </Text>
          <View style={styles.categoriesGrid}>
            <CategoryButton 
              icon={<Text style={{ fontSize: 24 }}>🚗</Text>}
              title={t('carRentals')}
              route="/cars"
            />
            <CategoryButton 
              icon={<Text style={{ fontSize: 24 }}>🏨</Text>}
              title={t('hotels')}
              route="/hotels"
            />
            <CategoryButton 
              icon={<Text style={{ fontSize: 24 }}>🗺️</Text>}
              title={t('experiences')}
              route="/experiences"
            />
          </View>
        </View>

        {/* View All Button */}
        <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.viewAllText, { color: theme.colors.background }]}>{t('viewAll')}</Text>
          <ChevronRight size={20} color={theme.colors.background} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  subText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Inter',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    position: 'relative',
    zIndex: 1000,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  cityDropdown: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 300,
    zIndex: 1001,
    elevation: 1001,
  },
  cityList: {
    maxHeight: 280,
  },
  cityOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedCityOption: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  cityOptionText: {
    fontSize: 16,
    fontFamily: 'Inter',
  },
  selectedCityOptionText: {
    fontWeight: '600',
  },
  carouselContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 15,
    fontFamily: 'Inter',
  },
  carousel: {
    paddingLeft: 20,
  },
  dealCard: {
    width: 280,
    height: 200,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dealContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  dealSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Inter',
  },
  dealPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    fontFamily: 'Inter',
  },
  categoriesContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 5,
    fontFamily: 'Inter',
  },
});