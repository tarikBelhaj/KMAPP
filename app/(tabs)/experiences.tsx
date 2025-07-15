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
import { MapPin, Clock, Users, Filter } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const experiences = [
  {
    id: 1,
    title: 'Private Louvre Museum Tour',
    location: 'Paris',
    duration: '3 hours',
    price: '€800',
    image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Up to 6 people',
    type: 'Cultural',
    highlights: ['Skip-the-line access', 'Expert guide', 'Mona Lisa VIP viewing'],
  },
  {
    id: 2,
    title: 'Michelin Star Dining Experience',
    location: 'London',
    duration: '4 hours',
    price: '€1,200',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Up to 8 people',
    type: 'Culinary',
    highlights: ['3-Michelin stars', 'Chef interaction', 'Wine pairing'],
  },
  {
    id: 3,
    title: 'Private Champagne Region Tour',
    location: 'Reims',
    duration: 'Full day',
    price: '€1,500',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Up to 4 people',
    type: 'Wine & Spirits',
    highlights: ['Dom Pérignon cellar', 'Helicopter transfer', 'Lunch included'],
  },
  {
    id: 4,
    title: 'Luxury Spa & Wellness Retreat',
    location: 'Vienna',
    duration: '6 hours',
    price: '€650',
    image: 'https://images.pexels.com/photos/3188018/pexels-photo-3188018.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Up to 2 people',
    type: 'Wellness',
    highlights: ['Thermal baths', 'Personal trainer', 'Organic treatments'],
  },
  {
    id: 5,
    title: 'Private Yacht Mediterranean Cruise',
    location: 'Monaco',
    duration: '8 hours',
    price: '€2,800',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Up to 12 people',
    type: 'Luxury',
    highlights: ['85ft luxury yacht', 'Chef on board', 'Water sports'],
  },
];

export default function ExperiencesScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();

  const ExperienceCard = ({ experience }: { experience: any }) => (
    <View style={styles.experienceCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: experience.image }} style={styles.experienceImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.imageGradient}
        />
        <View style={styles.typeTag}>
          <Text style={styles.typeText}>{experience.type}</Text>
        </View>
      </View>
      
      <View style={styles.experienceInfo}>
        <Text style={styles.experienceTitle}>{experience.title}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MapPin size={14} color="#CCCCCC" />
            <Text style={styles.detailText}>{experience.location}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={14} color="#CCCCCC" />
            <Text style={styles.detailText}>{experience.duration}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={14} color="#CCCCCC" />
            <Text style={styles.detailText}>{experience.groupSize}</Text>
          </View>
        </View>

        <View style={styles.highlightsContainer}>
          {experience.highlights.map((highlight: string, index: number) => (
            <View key={index} style={styles.highlightTag}>
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <View style={styles.priceInfo}>
            <Text style={styles.price}>{experience.price}</Text>
            <Text style={styles.priceUnit}>/group</Text>
          </View>
          
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>{t('bookExperience')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>{t('premiumExperiences')}</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>{t('exclusiveToursAndActivities')}</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color={theme.colors.primary} />
          <Text style={[styles.filterText, { color: theme.colors.primary }]}>{t('filterByCity')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={[styles.scrollView, { writingDirection: isRTL ? 'rtl' : 'ltr' }]}
      >
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
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
    paddingBottom: 10,
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
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    alignSelf: 'flex-start',
  },
  filterText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'Inter',
  },
  scrollView: {
    flex: 1,
  },
  experienceCard: {
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
  experienceImage: {
    width: '100%',
    height: 180,
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  typeTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  experienceInfo: {
    padding: 16,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#CCCCCC',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  highlightTag: {
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  highlightText: {
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
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  bookButtonText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});