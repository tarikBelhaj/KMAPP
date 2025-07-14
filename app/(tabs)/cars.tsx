import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Star, Clock } from 'lucide-react-native';

const luxuryCars = [
  {
    id: 1,
    name: 'Mercedes S-Class',
    model: 'S 580 4MATIC',
    price: '€650',
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: true,
    rating: 4.9,
    features: ['WiFi', 'Champagne', 'Airport Pickup'],
  },
  {
    id: 2,
    name: 'Bentley Continental GT',
    model: 'V8 Convertible',
    price: '€850',
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: true,
    rating: 5.0,
    features: ['Premium Sound', 'Massage Seats', 'Concierge'],
  },
  {
    id: 3,
    name: 'Rolls-Royce Phantom',
    model: 'Extended Wheelbase',
    price: '€1,200',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: true,
    rating: 5.0,
    features: ['Starlight Headliner', 'Champagne Bar', 'Privacy Glass'],
  },
  {
    id: 4,
    name: 'BMW 7 Series',
    model: '750Li xDrive',
    price: '€550',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    chauffeur: true,
    rating: 4.8,
    features: ['Executive Lounge', 'Gesture Control', 'Fragrance'],
  },
];

export default function CarsScreen() {
  const CarCard = ({ car }: { car: any }) => (
    <View style={styles.carCard}>
      <Image source={{ uri: car.image }} style={styles.carImage} />
      <View style={styles.carInfo}>
        <View style={styles.carHeader}>
          <View>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carModel}>{car.model}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{car.rating}</Text>
          </View>
        </View>
        
        <View style={styles.featuresContainer}>
          {car.features.map((feature: string, index: number) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.carFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{car.price}</Text>
            <Text style={styles.priceUnit}>/day</Text>
          </View>
          
          <View style={styles.chauffeurBadge}>
            <User size={12} color="#FFD700" />
            <Text style={styles.chauffeurText}>Chauffeur</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Premium Car Rentals</Text>
        <Text style={styles.headerSubtitle}>Luxury vehicles with professional chauffeurs</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {luxuryCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 5,
    fontFamily: 'Inter',
  },
  scrollView: {
    flex: 1,
  },
  carCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  carImage: {
    width: '100%',
    height: 200,
  },
  carInfo: {
    padding: 16,
  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  carName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  carModel: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 2,
    fontFamily: 'Inter',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  featureTag: {
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  carFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFD700',
    fontFamily: 'Inter',
  },
  priceUnit: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  chauffeurBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  chauffeurText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  bookButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});