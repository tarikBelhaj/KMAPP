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
import { Car, Hotel, MapPin, ChevronRight, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const popularCities = [
  'Paris', 'London', 'Rome', 'Barcelona', 'Amsterdam',
  'Vienna', 'Monaco', 'Cannes', 'Milan', 'Zurich',
  'Courchevel', 'Megève'
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

  const CategoryButton = ({ icon, title, route }: { icon: any, title: string, route: string }) => (
    <TouchableOpacity 
      style={styles.categoryButton}
      onPress={() => router.push(route)}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to {selectedCity}, Sultan</Text>
          <Text style={styles.subText}>Discover premium experiences</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#CCCCCC" />
            <TouchableOpacity 
              style={styles.citySelector}
              onPress={() => setShowCityDropdown(!showCityDropdown)}
            >
              <Text style={styles.cityText}>{selectedCity}</Text>
              <ChevronRight 
                size={16} 
                color="#FFD700" 
                style={{ 
                  transform: [{ rotate: showCityDropdown ? '90deg' : '0deg' }] 
                }} 
              />
            </TouchableOpacity>
          </View>
          
          {showCityDropdown && (
            <View style={styles.cityDropdown}>
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
                      selectedCity === city && styles.selectedCityOptionText
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
          <Text style={styles.sectionTitle}>Featured Premium Deals</Text>
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
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{deal.badge}</Text>
                  </View>
                  <Text style={styles.dealTitle}>{deal.title}</Text>
                  <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
                  <Text style={styles.dealPrice}>{deal.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Book Your Premium Experience</Text>
          <View style={styles.categoriesGrid}>
            <CategoryButton 
              icon={<Car size={24} color="#FFD700" />}
              title="Car Rentals"
              route="/cars"
            />
            <CategoryButton 
              icon={<Hotel size={24} color="#FFD700" />}
              title="Hotels"
              route="/hotels"
            />
            <CategoryButton 
              icon={<MapPin size={24} color="#FFD700" />}
              title="Experiences"
              route="/experiences"
            />
          </View>
        </View>

        {/* View All Button */}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Offers</Text>
          <ChevronRight size={20} color="#111111" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  subText: {
    fontSize: 16,
    color: '#CCCCCC',
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
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cityText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  cityDropdown: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
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
    backgroundColor: '#222222',
  },
  cityOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  selectedCityOptionText: {
    color: '#FFD700',
    fontWeight: '600',
  },
  carouselContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
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
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: '#111111',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  dealSubtitle: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 2,
    fontFamily: 'Inter',
  },
  dealPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFD700',
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
    backgroundColor: '#1A1A1A',
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#222222',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 12,
  },
  viewAllText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 5,
    fontFamily: 'Inter',
  },
});