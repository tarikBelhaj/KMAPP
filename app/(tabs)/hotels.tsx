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
import { Star, MapPin, Gift, Wifi, Car } from 'lucide-react-native';

const luxuryHotels = [
  {
    id: 1,
    name: 'Four Seasons George V',
    location: 'Paris, France',
    price: '€2,400',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 5.0,
    offer: 'Free breakfast',
    amenities: ['Spa', 'Michelin Restaurant', 'Concierge'],
    discount: null,
  },
  {
    id: 2,
    name: 'The Ritz London',
    location: 'London, UK',
    price: '€1,800',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    offer: 'Save 15%',
    amenities: ['Afternoon Tea', 'Rolls-Royce', 'Butler Service'],
    discount: 15,
  },
  {
    id: 3,
    name: 'Hotel Sacher Wien',
    location: 'Vienna, Austria',
    price: '€1,200',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    offer: 'Complimentary upgrade',
    amenities: ['Historic Palace', 'Sachertorte', 'Opera View'],
    discount: null,
  },
  {
    id: 4,
    name: 'Bulgari Hotel Milano',
    location: 'Milan, Italy',
    price: '€1,600',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    offer: 'Free spa treatment',
    amenities: ['Fashion District', 'Private Garden', 'Jewelry Store'],
    discount: null,
  },
];

export default function HotelsScreen() {
  const HotelCard = ({ hotel }: { hotel: any }) => (
    <View style={styles.hotelCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)']}
          style={styles.imageGradient}
        />
        <View style={styles.offerBadge}>
          <Gift size={12} color="#111111" />
          <Text style={styles.offerText}>{hotel.offer}</Text>
        </View>
      </View>
      
      <View style={styles.hotelInfo}>
        <View style={styles.hotelHeader}>
          <View style={styles.hotelNameContainer}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={12} color="#CCCCCC" />
              <Text style={styles.location}>{hotel.location}</Text>
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{hotel.rating}</Text>
          </View>
        </View>

        <View style={styles.amenitiesContainer}>
          {hotel.amenities.map((amenity: string, index: number) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>{hotel.price}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
          
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>5-Star Hotels</Text>
        <Text style={styles.headerSubtitle}>Luxury accommodations across Europe</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {luxuryHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
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
  hotelCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  imageContainer: {
    position: 'relative',
  },
  hotelImage: {
    width: '100%',
    height: 200,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  offerBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  offerText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  hotelInfo: {
    padding: 16,
  },
  hotelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  hotelNameContainer: {
    flex: 1,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#CCCCCC',
    marginLeft: 4,
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
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  amenityTag: {
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  amenityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceInfo: {
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
  bookButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});