import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Star, Clock, Car, Zap, Crown, UserCheck } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const ecoCarData = [
  {
    id: 1,
    name: 'BMW 3 Series',
    model: '320d Sedan',
    price: '€120',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: false,
    rating: 4.5,
    features: ['GPS', 'Bluetooth', 'AC'],
    badge: 'Eco-Friendly',
  },
  {
    id: 2,
    name: 'Audi A4',
    model: 'Avant Quattro',
    price: '€140',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: false,
    rating: 4.6,
    features: ['Navigation', 'Heated Seats', 'Parking Assist'],
    badge: 'Hybrid',
  },
  {
    id: 3,
    name: 'Mercedes C-Class',
    model: 'C200 AMG Line',
    price: '€160',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: false,
    rating: 4.7,
    features: ['Premium Sound', 'LED Lights', 'Cruise Control'],
    badge: 'Low Emission',
  },
];

const premiumCarData = [
  {
    id: 1,
    name: 'Mercedes S-Class',
    model: 'S 580 4MATIC',
    price: '€450',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: false,
    rating: 4.9,
    features: ['WiFi', 'Premium Sound', 'Massage Seats'],
    badge: 'Luxury',
  },
  {
    id: 2,
    name: 'Bentley Continental GT',
    model: 'V8 Convertible',
    price: '€650',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: false,
    rating: 5.0,
    features: ['Premium Sound', 'Massage Seats', 'Navigation'],
    badge: 'Exclusive',
  },
  {
    id: 3,
    name: 'Rolls-Royce Phantom',
    model: 'Extended Wheelbase',
    price: '€800',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: false,
    rating: 5.0,
    features: ['Starlight Headliner', 'Premium Audio', 'Privacy Glass'],
    badge: 'Ultra Luxury',
  },
  {
    id: 4,
    name: 'BMW 7 Series',
    model: '750Li xDrive',
    price: '€380',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: false,
    rating: 4.8,
    features: ['Executive Lounge', 'Gesture Control', 'Fragrance'],
    badge: 'Executive',
  },
];

const chauffeurCarData = [
  {
    id: 1,
    name: 'Mercedes S-Class',
    model: 'S 580 4MATIC + Chauffeur',
    price: '€650',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: true,
    rating: 4.9,
    features: ['Chauffeur Professionnel', 'WiFi', 'Champagne', 'Airport Pickup'],
    badge: 'VIP Service',
  },
  {
    id: 2,
    name: 'Mercedes V-Class',
    model: 'V 300 d + Chauffeur',
    price: '€450',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: true,
    rating: 4.8,
    features: ['Chauffeur Expérimenté', '8 Places', 'Climatisation', 'Wi-Fi'],
    badge: 'Group Transport',
  },
];

export default function CarsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'eco' | 'premium' | 'chauffeur'>('premium');
  
  const currentCarData = selectedCategory === 'eco' ? ecoCarData : 
                        selectedCategory === 'premium' ? premiumCarData : 
                        chauffeurCarData;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'eco':
        return <Zap size={20} color={selectedCategory === 'eco' ? '#111111' : '#FFD700'} />;
      case 'premium':
        return <Crown size={20} color={selectedCategory === 'premium' ? '#111111' : '#FFD700'} />;
      case 'chauffeur':
        return <UserCheck size={20} color={selectedCategory === 'chauffeur' ? '#111111' : '#FFD700'} />;
      default:
        return <Car size={20} color="#FFD700" />;
    }
  };

  const getCategoryCount = (category: string) => {
    switch (category) {
      case 'eco':
        return ecoCarData.length;
      case 'premium':
        return premiumCarData.length;
      case 'chauffeur':
        return chauffeurCarData.length;
      default:
        return 0;
    }
  };

  const CarCard = ({ car }: { car: any }) => (
    <View style={styles.carCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: car.image }} style={styles.carImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{car.badge}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Star size={12} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{car.rating}</Text>
        </View>
      </View>
      
      <View style={styles.carInfo}>
        <View style={styles.carHeader}>
          <View style={styles.carTitleContainer}>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carModel}>{car.model}</Text>
          </View>
          
          {car.chauffeur && (
            <View style={styles.chauffeurIndicator}>
              <UserCheck size={16} color="#FFD700" />
            </View>
          )}
        </View>
        
        <View style={styles.featuresContainer}>
          {car.features.slice(0, 3).map((feature: string, index: number) => (
            <View key={index} style={styles.featureChip}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.carFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceAmount}>{car.price}</Text>
            <Text style={styles.priceUnit}>/jour</Text>
          </View>
          
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Réserver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Modern Header */}
      <View style={styles.modernHeader}>
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.1)', 'transparent']}
          style={styles.headerGradient}
        />
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Location de</Text>
            <Text style={styles.accentTitle}>Véhicules</Text>
          </View>
          <Text style={styles.subtitle}>
            Découvrez notre collection exclusive de véhicules premium
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{currentCarData.length}</Text>
              <Text style={styles.statLabel}>Véhicules</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5★</Text>
              <Text style={styles.statLabel}>Service</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Enhanced Category Pills */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryScrollContainer}
      >
        <View style={styles.categoryPillsContainer}>
          <TouchableOpacity 
            style={[
              styles.categoryPill,
              selectedCategory === 'eco' && styles.activeCategoryPill
            ]}
            onPress={() => setSelectedCategory('eco')}
          >
            {getCategoryIcon('eco')}
            <View style={styles.categoryTextContainer}>
              <Text style={[
                styles.categoryPillText,
                selectedCategory === 'eco' && styles.activeCategoryPillText
              ]}>
                Eco Cars
              </Text>
              <Text style={[
                styles.categoryCount,
                selectedCategory === 'eco' && styles.activeCategoryCount
              ]}>
                {getCategoryCount('eco')} véhicules
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.categoryPill,
              selectedCategory === 'premium' && styles.activeCategoryPill
            ]}
            onPress={() => setSelectedCategory('premium')}
          >
            {getCategoryIcon('premium')}
            <View style={styles.categoryTextContainer}>
              <Text style={[
                styles.categoryPillText,
                selectedCategory === 'premium' && styles.activeCategoryPillText
              ]}>
                Premium Cars
              </Text>
              <Text style={[
                styles.categoryCount,
                selectedCategory === 'premium' && styles.activeCategoryCount
              ]}>
                {getCategoryCount('premium')} véhicules
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.categoryPill,
              selectedCategory === 'chauffeur' && styles.activeCategoryPill
            ]}
            onPress={() => setSelectedCategory('chauffeur')}
          >
            {getCategoryIcon('chauffeur')}
            <View style={styles.categoryTextContainer}>
              <Text style={[
                styles.categoryPillText,
                selectedCategory === 'chauffeur' && styles.activeCategoryPillText
              ]}>
                Avec Chauffeur
              </Text>
              <Text style={[
                styles.categoryCount,
                selectedCategory === 'chauffeur' && styles.activeCategoryCount
              ]}>
                {getCategoryCount('chauffeur')} véhicules
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Cars List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.carsContainer}>
          {currentCarData.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  modernHeader: {
    position: 'relative',
    paddingBottom: 30,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
    fontFamily: 'Inter',
    marginRight: 8,
  },
  accentTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFD700',
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'Inter',
    lineHeight: 22,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFD700',
    fontFamily: 'Inter',
  },
  statLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    marginHorizontal: 15,
  },
  categoryScrollView: {
    marginBottom: 25,
  },
  categoryScrollContainer: {
    paddingHorizontal: 20,
    paddingRight: 40, // Extra padding pour éviter la coupure
  },
  categoryPillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 30,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  activeCategoryPill: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  categoryTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  categoryPillText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFD700',
    fontFamily: 'Inter',
  },
  activeCategoryPillText: {
    color: '#111111',
  },
  categoryCount: {
    fontSize: 11,
    color: 'rgba(255, 215, 0, 0.7)',
    fontFamily: 'Inter',
    marginTop: 2,
  },
  activeCategoryCount: {
    color: 'rgba(17, 17, 17, 0.7)',
  },
  scrollView: {
    flex: 1,
  },
  carsContainer: {
    paddingBottom: 20,
  },
  carCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  imageContainer: {
    position: 'relative',
    height: 220,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  badgeContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  badgeText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  ratingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  carInfo: {
    padding: 20,
  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  carTitleContainer: {
    flex: 1,
  },
  carName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
    marginBottom: 4,
  },
  carModel: {
    fontSize: 15,
    color: '#CCCCCC',
    fontFamily: 'Inter',
  },
  chauffeurIndicator: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  featureChip: {
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#444444',
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  carFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFD700',
    fontFamily: 'Inter',
  },
  priceUnit: {
    fontSize: 16,
    color: '#CCCCCC',
    marginLeft: 6,
    fontFamily: 'Inter',
  },
  bookButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});