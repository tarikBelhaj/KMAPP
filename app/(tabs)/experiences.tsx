import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Users, Filter, Search, Star, Heart, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

const genevaExperiences = [
  {
    id: 1,
    title: 'Genève : Croisière de 50 minutes sur le lac Léman',
    location: 'Genève',
    duration: '50 minutes',
    price: '€20',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Coupe-file',
    type: 'Croisières et sorties en bateau',
    rating: 4.3,
    reviews: 3476,
    highlights: ['Audioguide en option', 'Vue panoramique', 'Départ du centre-ville'],
    badge: 'Coup de cœur',
    category: 'boat'
  },
  {
    id: 2,
    title: 'Genève : Croisière panoramique sur le lac avec collations et vin',
    location: 'Genève',
    duration: '1 heure',
    price: '€31',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Petit groupe',
    type: 'Croisières et sorties en bateau',
    rating: 4.3,
    reviews: 1133,
    highlights: ['Collations incluses', 'Vin local', 'Guide professionnel'],
    badge: null,
    category: 'boat'
  },
  {
    id: 3,
    title: 'Genève : Visite touristique en bus à toit ouvert',
    location: 'Genève',
    duration: '75 minutes',
    price: '€28',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Audioguide en option',
    type: 'Excursions à la journée',
    rating: 3.6,
    reviews: 510,
    highlights: ['Bus à toit ouvert', 'Audioguide multilingue', 'Arrêts multiples'],
    badge: null,
    category: 'tour'
  },
  {
    id: 4,
    title: 'Au départ de Genève : Excursion guidée à Chamonix et au Mont-Blanc',
    location: 'Genève',
    duration: '9-10 heures',
    price: '€96',
    originalPrice: '€115',
    image: 'https://images.pexels.com/photos/3188018/pexels-photo-3188018.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Groupe',
    type: 'Nature et aventure',
    rating: 4.4,
    reviews: 1382,
    highlights: ['Transport inclus', 'Guide expert', 'Vue sur le Mont-Blanc'],
    badge: null,
    category: 'nature'
  },
  {
    id: 5,
    title: 'Au départ de Genève : Excursion d\'une demi-journée à Annecy',
    location: 'Genève',
    duration: '4.5 heures',
    price: '€45',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Petit groupe',
    type: 'Excursions à la journée',
    rating: 4.2,
    reviews: 892,
    highlights: ['Venise des Alpes', 'Temps libre', 'Transport confortable'],
    badge: 'Originals by GetYourGuide',
    category: 'tour'
  },
  {
    id: 6,
    title: 'Haute-Savoie: descente en rafting découverte et apéritif',
    location: 'Haute-Savoie',
    duration: '3 heures',
    price: '€65',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Petit groupe',
    type: 'Nature et aventure',
    rating: 4.7,
    reviews: 234,
    highlights: ['Rafting découverte', 'Apéritif inclus', 'Équipement fourni'],
    badge: null,
    category: 'nature'
  },
  {
    id: 7,
    title: 'Chamonix : Vol en parapente en tandem avec vue sur le Mont-Blanc',
    location: 'Chamonix',
    duration: '1 heure',
    price: '€120',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Individuel',
    type: 'Nature et aventure',
    rating: 4.8,
    reviews: 567,
    highlights: ['Vol en tandem', 'Vue Mont-Blanc', 'Pilote expérimenté'],
    badge: null,
    category: 'nature'
  },
  {
    id: 8,
    title: 'Atelier chocolat suisse traditionnel à Genève',
    location: 'Genève',
    duration: '2 heures',
    price: '€85',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/3188018/pexels-photo-3188018.jpeg?auto=compress&cs=tinysrgb&w=800',
    groupSize: 'Petit groupe',
    type: 'Ateliers et visites sur le chocolat',
    rating: 4.6,
    reviews: 445,
    highlights: ['Chocolat artisanal', 'Dégustation', 'Techniques traditionnelles'],
    badge: null,
    category: 'chocolate'
  }
];

const categories = [
  { id: 'all', name: 'Tous', icon: '🌟' },
  { id: 'boat', name: 'Croisières et sorties en bateau', icon: '🚢' },
  { id: 'tour', name: 'Excursions à la journée', icon: '🚌' },
  { id: 'chocolate', name: 'Ateliers et visites sur le chocolat', icon: '🍫' },
  { id: 'nature', name: 'Nature et aventure', icon: '🏔️' },
  { id: 'ski', name: 'Ski et snowboard', icon: '⛷️' }
];

const cities = ['Genève', 'Chamonix', 'Annecy', 'Haute-Savoie', 'Montreux'];

export default function ExperiencesScreen() {
  const { theme } = useTheme();
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedCity, setSelectedCity] = useState('Genève');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const filteredExperiences = genevaExperiences.filter(experience => {
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
    const matchesSearch = experience.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         experience.type.toLowerCase().includes(searchText.toLowerCase());
    const matchesCity = selectedCity === 'Tous' || experience.location.includes(selectedCity);
    
    return matchesCategory && matchesSearch && matchesCity;
  });

  const ExperienceCard = ({ experience }: { experience: any }) => (
    <View style={[styles.experienceCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: experience.image }} style={styles.experienceImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.imageGradient}
        />
        
        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        {/* Badge */}
        {experience.badge && (
          <View style={[styles.badge, experience.badge === 'Coup de cœur' && styles.heartBadge]}>
            <Text style={[styles.badgeText, { color: theme.colors.background }]}>{experience.badge}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.experienceInfo}>
        <Text style={[styles.experienceTitle, { color: theme.colors.text }]} numberOfLines={2}>
          {experience.title}
        </Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Clock size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>{experience.duration}</Text>
          </View>
          
          <Text style={[styles.groupSize, { color: theme.colors.textSecondary }]}>• {experience.groupSize}</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={[styles.rating, { color: theme.colors.text }]}>{experience.rating}</Text>
            <Text style={[styles.reviewCount, { color: theme.colors.textSecondary }]}>({experience.reviews})</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={[styles.fromText, { color: theme.colors.textSecondary }]}>À partir de</Text>
            <View style={styles.priceInfo}>
              {experience.originalPrice && (
                <Text style={[styles.originalPrice, { color: theme.colors.textSecondary }]}>{experience.originalPrice}</Text>
              )}
              <Text style={[styles.price, { color: theme.colors.text }]}>{experience.price}</Text>
              <Text style={[styles.priceUnit, { color: theme.colors.textSecondary }]}>par personne</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header with Search */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Genève : explorez</Text>
        
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Rechercher des expériences..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* City Selector and Date */}
        <View style={styles.filtersRow}>
          <TouchableOpacity 
            style={[styles.cityButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            onPress={() => setShowCityDropdown(!showCityDropdown)}
          >
            <Text style={[styles.cityButtonText, { color: theme.colors.text }]}>{selectedCity}</Text>
            <ChevronDown size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.dateButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={[styles.dateButtonText, { color: theme.colors.text }]}>Date flexible</Text>
            <ChevronDown size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.searchButtonText, { color: theme.colors.background }]}>Rechercher</Text>
          </TouchableOpacity>
        </View>

        {/* City Dropdown */}
        {showCityDropdown && (
          <View style={[styles.cityDropdown, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            {cities.map((city) => (
              <TouchableOpacity
                key={city}
                style={styles.cityOption}
                onPress={() => {
                  setSelectedCity(city);
                  setShowCityDropdown(false);
                }}
              >
                <Text style={[styles.cityOptionText, { color: theme.colors.text }]}>{city}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Category Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryScrollContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && [styles.activeCategoryChip, { backgroundColor: theme.colors.primary }],
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && [styles.activeCategoryText, { color: theme.colors.background }],
              { color: theme.colors.text }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: theme.colors.text }]}>
          {filteredExperiences.length} activités trouvées
        </Text>
        
        <View style={styles.resultsActions}>
          <TouchableOpacity 
            style={[styles.sortButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            onPress={() => setSortBy(sortBy === 'recommended' ? 'price' : 'recommended')}
          >
            <Text style={[styles.sortText, { color: theme.colors.text }]}>
              Trier par : {sortBy === 'recommended' ? 'Conseillé' : 'Prix'}
            </Text>
            <ChevronDown size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} color={theme.colors.primary} />
            <Text style={[styles.filterText, { color: theme.colors.primary }]}>Filtres</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Experiences List */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={[
          styles.scrollView, 
          { writingDirection: isRTL ? 'rtl' : 'ltr' },
          isWeb && styles.webScrollView
        ]}
        contentContainerStyle={[
          styles.scrollContent,
          isWeb && styles.webContentContainer
        ]}
      >
        <View style={styles.experiencesGrid}>
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...(isWeb && {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  webScrollView: {
    width: '100%',
  },
  webContentContainer: {
    minHeight: '100vh',
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    ...(isWeb && {
      paddingHorizontal: 40,
      paddingTop: 20,
      paddingBottom: 25,
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 28,
      marginBottom: 20,
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    marginBottom: 15,
    ...(isWeb && {
      paddingVertical: 16,
      marginBottom: 20,
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter',
    ...(isWeb && {
      outlineWidth: 0,
      outlineStyle: 'none',
    }),
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 10,
    ...(isWeb && {
      gap: 15,
    }),
  },
  cityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 16,
    }),
  },
  cityButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 16,
    }),
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  searchButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 16,
      paddingHorizontal: 24,
    }),
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  cityDropdown: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: 200,
    zIndex: 1000,
    ...(isWeb && {
      left: 40,
      right: 40,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    }),
  },
  cityOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...(isWeb && {
      cursor: 'pointer',
    }),
  },
  cityOptionText: {
    fontSize: 16,
    fontFamily: 'Inter',
  },
  categoryScrollView: {
    paddingVertical: 15,
    ...(isWeb && {
      paddingVertical: 20,
    }),
  },
  categoryScrollContainer: {
    paddingHorizontal: 20,
    gap: 10,
    ...(isWeb && {
      paddingHorizontal: 40,
      gap: 15,
    }),
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 20,
      paddingVertical: 12,
      transition: 'all 0.2s ease',
    }),
  },
  activeCategoryChip: {
    borderColor: 'transparent',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
    ...(isWeb && {
      fontSize: 18,
    }),
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  activeCategoryText: {
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...(isWeb && {
      paddingHorizontal: 40,
      paddingVertical: 15,
    }),
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  resultsActions: {
    flexDirection: 'row',
    gap: 10,
    ...(isWeb && {
      gap: 15,
    }),
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 16,
      paddingVertical: 8,
    }),
  },
  sortText: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 4,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 16,
      paddingVertical: 8,
    }),
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    ...(isWeb && {
      paddingBottom: 40,
    }),
  },
  experiencesGrid: {
    paddingHorizontal: 20,
    ...(isWeb && {
      paddingHorizontal: 40,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
    }),
  },
  experienceCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    ...(isWeb && {
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      marginBottom: 0,
    }),
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    ...(isWeb && {
      height: 240,
    }),
  },
  experienceImage: {
    width: '100%',
    height: '100%',
    ...(isWeb && {
      objectFit: 'cover',
    }),
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    ...(isWeb && {
      cursor: 'pointer',
      top: 16,
      right: 16,
    }),
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    ...(isWeb && {
      top: 16,
      left: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
    }),
  },
  heartBadge: {
    backgroundColor: '#FF4757',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  experienceInfo: {
    padding: 16,
    ...(isWeb && {
      padding: 20,
    }),
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 18,
      lineHeight: 24,
      marginBottom: 12,
    }),
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    ...(isWeb && {
      marginBottom: 12,
    }),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  groupSize: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  ratingRow: {
    marginBottom: 12,
    ...(isWeb && {
      marginBottom: 16,
    }),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  reviewCount: {
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    flex: 1,
  },
  fromText: {
    fontSize: 12,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginRight: 6,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 4,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 20,
    }),
  },
  priceUnit: {
    fontSize: 12,
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
});