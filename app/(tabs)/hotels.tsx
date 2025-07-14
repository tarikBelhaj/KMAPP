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
import { Star, MapPin, Gift, Wifi, Car, Hotel } from 'lucide-react-native';
import { useState } from 'react';

const normalHotels = [
  {
    id: 1,
    name: 'Hotel Malte Opera',
    location: 'Paris, France',
    price: '€180',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    offer: 'Free WiFi',
    amenities: ['Breakfast', 'City Center', '24h Reception'],
    discount: null,
  },
  {
    id: 2,
    name: 'Premier Inn London',
    location: 'London, UK',
    price: '€120',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    offer: 'Early check-in',
    amenities: ['Restaurant', 'Gym', 'Business Center'],
    discount: 10,
  },
  {
    id: 3,
    name: 'Hotel Am Konzerthaus',
    location: 'Vienna, Austria',
    price: '€95',
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.0,
    offer: 'Free cancellation',
    amenities: ['Historic Building', 'Bar', 'Tour Desk'],
    discount: null,
  },
  {
    id: 4,
    name: 'Best Western Milano',
    location: 'Milan, Italy',
    price: '€140',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    offer: 'Late checkout',
    amenities: ['Shopping District', 'Parking', 'Concierge'],
    discount: null,
  },
];
const premiumHotels = [
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
  const [selectedCategory, setSelectedCategory] = useState<'normal' | 'premium'>('premium');
  
  const currentHotelData = selectedCategory === 'normal' ? normalHotels : premiumHotels;

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
        <Text style={styles.headerTitle}>Hotels</Text>
        <Text style={styles.headerSubtitle}>From comfortable stays to luxury accommodations</Text>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity 
          style={[
            styles.categoryButton,
            selectedCategory === 'normal' && styles.activeCategoryButton
          ]}
          onPress={() => setSelectedCategory('normal')}
        >
          <Hotel size={16} color={selectedCategory === 'normal' ? '#111111' : '#CCCCCC'} />
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === 'normal' && styles.activeCategoryButtonText
          ]}>
            Normal Hotels
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.categoryButton,
            selectedCategory === 'premium' && styles.activeCategoryButton
          ]}
          onPress={() => setSelectedCategory('premium')}
        >
          <Star size={16} color={selectedCategory === 'premium' ? '#111111' : '#CCCCCC'} />
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === 'premium' && styles.activeCategoryButtonText
          ]}>
            Premium Hotels
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {currentHotelData.map((hotel) => (
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
  categoryContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    padding: 4,
  },
  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
  },
  activeCategoryButton: {
    backgroundColor: '#FFD700',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginLeft: 6,
    fontFamily: 'Inter',
  },
  activeCategoryButtonText: {
    color: '#111111',
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