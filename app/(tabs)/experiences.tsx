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
import { MapPin, Clock, Users, Filter, Search, Star, Heart, ChevronDown, Calendar, SlidersHorizontal } from 'lucide-react-native';
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
    category: 'boat',
    discount: null
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
    category: 'boat',
    discount: null
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
    category: 'tour',
    discount: null
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
    category: 'nature',
    discount: 17
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
    category: 'tour',
    discount: null
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
    category: 'nature',
    discount: null
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
    category: 'nature',
    discount: null
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
    category: 'chocolate',
    discount: null
  }
];

const categories = [
  { id: 'all', name: 'Tous', icon: '🌟', count: 176 },
  { id: 'boat', name: 'Croisières et sorties en bateau', icon: '🚢', count: 24 },
  { id: 'tour', name: 'Excursions à la journée', icon: '🚌', count: 45 },
  { id: 'chocolate', name: 'Ateliers et visites sur le chocolat', icon: '🍫', count: 12 },
  { id: 'nature', name: 'Nature et aventure', icon: '🏔️', count: 38 },
  { id: 'ski', name: 'Ski et snowboard', icon: '⛷️', count: 28 }
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
    <TouchableOpacity style={[styles.experienceCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: experience.image }} style={styles.experienceImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        />
        
        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={16} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        
        {/* Badge */}
        {experience.badge && (
          <View style={[
            styles.badge, 
            experience.badge === 'Coup de cœur' && styles.heartBadge,
            experience.badge.includes('Originals') && styles.originalsBadge
          ]}>
            <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>{experience.badge}</Text>
          </View>
        )}

        {/* Discount Badge */}
        {experience.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{experience.discount}%</Text>
          </View>
        )}
      </View>
      
      <View style={styles.experienceInfo}>
        <Text style={[styles.experienceTitle, { color: theme.colors.text }]} numberOfLines={2}>
          {experience.title}
        </Text>
        
        <View style={styles.metaRow}>
          <View style={styles.durationContainer}>
            <Clock size={12} color={theme.colors.textSecondary} strokeWidth={2} />
            <Text style={[styles.durationText, { color: theme.colors.textSecondary }]}>{experience.duration}</Text>
          </View>
          
          <Text style={[styles.separator, { color: theme.colors.textSecondary }]}>•</Text>
          
          <Text style={[styles.groupSize, { color: theme.colors.textSecondary }]}>{experience.groupSize}</Text>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={10} 
                  color={star <= Math.floor(experience.rating) ? "#FFD700" : "#E5E5E5"} 
                  fill={star <= Math.floor(experience.rating) ? "#FFD700" : "transparent"}
                  strokeWidth={1.5}
                />
              ))}
            </View>
            <Text style={[styles.rating, { color: theme.colors.text }]}>{experience.rating}</Text>
            <Text style={[styles.reviewCount, { color: theme.colors.textSecondary }]}>({experience.reviews.toLocaleString()})</Text>
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Genève : explorez</Text>
          <TouchableOpacity style={[styles.filtersButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <SlidersHorizontal size={18} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.filtersButtonText, { color: theme.colors.primary }]}>Filtres</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Search size={18} color={theme.colors.textSecondary} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Rechercher des expériences..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.filtersRow}>
          <TouchableOpacity 
            style={[styles.filterPill, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            onPress={() => setShowCityDropdown(!showCityDropdown)}
          >
            <MapPin size={14} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.filterPillText, { color: theme.colors.text }]}>{selectedCity}</Text>
            <ChevronDown size={14} color={theme.colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterPill, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Calendar size={14} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.filterPillText, { color: theme.colors.text }]}>Date flexible</Text>
            <ChevronDown size={14} color={theme.colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.searchButtonText, { color: theme.colors.background }]}>Rechercher</Text>
          </TouchableOpacity>
        </View>

        {/* City Dropdown */}
        {showCityDropdown && (
          <View style={[styles.cityDropdown, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <ScrollView style={styles.cityList} nestedScrollEnabled>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[
                    styles.cityOption,
                    selectedCity === city && [styles.selectedCityOption, { backgroundColor: `${theme.colors.primary}15` }]
                  ]}
                  onPress={() => {
                    setSelectedCity(city);
                    setShowCityDropdown(false);
                  }}
                >
                  <Text style={[
                    styles.cityOptionText,
                    { color: theme.colors.text },
                    selectedCity === city && [styles.selectedCityOptionText, { color: theme.colors.primary }]
                  ]}>
                    {city}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
            <View style={styles.categoryTextContainer}>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && [styles.activeCategoryText, { color: theme.colors.background }],
                { color: theme.colors.text }
              ]}>
                {category.name}
              </Text>
              <Text style={[
                styles.categoryCount,
                selectedCategory === category.id && [styles.activeCategoryCount, { color: `${theme.colors.background}80` }],
                { color: theme.colors.textSecondary }
              ]}>
                {category.count} activités
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View style={[styles.resultsHeader, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.resultsCount, { color: theme.colors.text }]}>
          <Text style={{ fontWeight: '700' }}>{filteredExperiences.length}</Text> activités trouvées
        </Text>
        
        <TouchableOpacity 
          style={[styles.sortButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={() => setSortBy(sortBy === 'recommended' ? 'price' : 'recommended')}
        >
          <Text style={[styles.sortText, { color: theme.colors.text }]}>
            Trier par : {sortBy === 'recommended' ? 'Conseillé' : 'Prix'}
          </Text>
          <ChevronDown size={14} color={theme.colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
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
        <View style={styles.experiencesContainer}>
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
    paddingTop: 15,
    paddingBottom: 20,
    position: 'relative',
    zIndex: 1000,
    ...(isWeb && {
      paddingHorizontal: 40,
      paddingTop: 20,
      paddingBottom: 25,
    }),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    ...(isWeb && {
      marginBottom: 20,
    }),
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
    ...(isWeb && {
      fontSize: 26,
    }),
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 12,
      transition: 'all 0.2s ease',
    }),
  },
  filtersButtonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    marginBottom: 15,
    ...(isWeb && {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 18,
      borderRadius: 12,
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      outlineWidth: 0,
      outlineStyle: 'none',
      fontSize: 15,
      marginLeft: 12,
    }),
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    ...(isWeb && {
      gap: 10,
    }),
  },
  filterPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 12,
      transition: 'all 0.2s ease',
    }),
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'center',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 12,
      transition: 'all 0.2s ease',
    }),
  },
  searchButtonText: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  cityDropdown: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 180,
    zIndex: 1001,
    elevation: 1001,
    ...(isWeb && {
      left: 40,
      right: 40,
      top: 130,
      borderRadius: 12,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    }),
  },
  cityList: {
    maxHeight: 160,
  },
  cityOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 16,
      paddingVertical: 12,
    }),
  },
  selectedCityOption: {
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  cityOptionText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 15,
    }),
  },
  selectedCityOptionText: {
    fontWeight: '700',
  },
  categoryScrollView: {
    paddingVertical: 12,
    ...(isWeb && {
      paddingVertical: 15,
    }),
  },
  categoryScrollContainer: {
    paddingHorizontal: 20,
    gap: 8,
    ...(isWeb && {
      paddingHorizontal: 40,
      gap: 10,
    }),
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 120,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 12,
      minWidth: 140,
      transition: 'all 0.2s ease',
    }),
  },
  activeCategoryChip: {
    borderColor: 'transparent',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    ...(isWeb && {
      boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)',
    }),
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
    ...(isWeb && {
      fontSize: 18,
      marginRight: 8,
    }),
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    lineHeight: 16,
    ...(isWeb && {
      fontSize: 13,
      lineHeight: 18,
    }),
  },
  activeCategoryText: {
    fontWeight: '700',
  },
  categoryCount: {
    fontSize: 10,
    fontFamily: 'Inter',
    marginTop: 1,
    ...(isWeb && {
      fontSize: 11,
      marginTop: 2,
    }),
  },
  activeCategoryCount: {},
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    ...(isWeb && {
      paddingHorizontal: 40,
      paddingVertical: 12,
    }),
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 15,
    }),
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      transition: 'all 0.2s ease',
    }),
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 13,
    }),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 25,
    ...(isWeb && {
      paddingTop: 15,
      paddingBottom: 35,
    }),
  },
  experiencesContainer: {
    paddingHorizontal: 20,
    gap: 12,
    ...(isWeb && {
      paddingHorizontal: 40,
      gap: 15,
    }),
  },
  experienceCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    ...(isWeb && {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: 16,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    }),
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    ...(isWeb && {
      height: 180,
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
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    ...(isWeb && {
      cursor: 'pointer',
      top: 12,
      right: 12,
      width: 32,
      height: 32,
      borderRadius: 16,
      transition: 'all 0.2s ease',
    }),
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    ...(isWeb && {
      top: 12,
      left: 12,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
    }),
  },
  heartBadge: {
    backgroundColor: '#FF4757',
  },
  originalsBadge: {
    backgroundColor: '#FF6B35',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 11,
    }),
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 50,
    backgroundColor: '#00D2FF',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    ...(isWeb && {
      top: 12,
      right: 55,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 5,
    }),
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 11,
    }),
  },
  experienceInfo: {
    padding: 12,
    ...(isWeb && {
      padding: 16,
    }),
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 8,
    fontFamily: 'Inter',
    letterSpacing: -0.2,
    ...(isWeb && {
      fontSize: 16,
      lineHeight: 20,
      marginBottom: 10,
    }),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    ...(isWeb && {
      marginBottom: 10,
    }),
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  durationText: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 13,
    }),
  },
  separator: {
    fontSize: 12,
    marginHorizontal: 5,
    ...(isWeb && {
      fontSize: 13,
      marginHorizontal: 6,
    }),
  },
  groupSize: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 13,
    }),
  },
  ratingRow: {
    marginBottom: 10,
    ...(isWeb && {
      marginBottom: 12,
    }),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 1,
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 13,
    }),
  },
  reviewCount: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 12,
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
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginBottom: 2,
    ...(isWeb && {
      fontSize: 12,
      marginBottom: 3,
    }),
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 3,
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: -0.3,
    ...(isWeb && {
      fontSize: 18,
    }),
  },
  priceUnit: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 12,
    }),
  },
});