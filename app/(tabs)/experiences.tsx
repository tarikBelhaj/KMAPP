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
          <Heart size={18} color="#FFFFFF" strokeWidth={2} />
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
            <Clock size={14} color={theme.colors.textSecondary} strokeWidth={2} />
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
                  size={12} 
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
      {/* Modern Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Genève : explorez</Text>
          <TouchableOpacity style={[styles.filtersButton, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <SlidersHorizontal size={20} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.filtersButtonText, { color: theme.colors.primary }]}>Filtres</Text>
          </TouchableOpacity>
        </View>
        
        {/* Modern Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Search size={20} color={theme.colors.textSecondary} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Rechercher des expériences..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Modern Filter Pills */}
        <View style={styles.filtersRow}>
          <TouchableOpacity 
            style={[styles.filterPill, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
            onPress={() => setShowCityDropdown(!showCityDropdown)}
          >
            <MapPin size={16} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.filterPillText, { color: theme.colors.text }]}>{selectedCity}</Text>
            <ChevronDown size={16} color={theme.colors.textSecondary} strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.filterPill, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Calendar size={16} color={theme.colors.primary} strokeWidth={2} />
            <Text style={[styles.filterPillText, { color: theme.colors.text }]}>Date flexible</Text>
            <ChevronDown size={16} color={theme.colors.textSecondary} strokeWidth={2} />
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

      {/* Modern Category Filters */}
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
      <View style={styles.resultsHeader}>
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
          <ChevronDown size={16} color={theme.colors.textSecondary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Modern Experiences Grid */}
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
        <View style={[styles.experiencesGrid, isWeb && styles.webGrid]}>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    ...(isWeb && {
      paddingHorizontal: 40,
      paddingTop: 24,
      paddingBottom: 32,
    }),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    ...(isWeb && {
      marginBottom: 28,
    }),
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
    ...(isWeb && {
      fontSize: 32,
    }),
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 16,
      transition: 'all 0.2s ease',
    }),
  },
  filtersButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    ...(isWeb && {
      paddingVertical: 18,
      marginBottom: 28,
      borderRadius: 20,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      outlineWidth: 0,
      outlineStyle: 'none',
      fontSize: 18,
    }),
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 12,
    ...(isWeb && {
      gap: 16,
    }),
  },
  filterPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 16,
      borderRadius: 16,
      transition: 'all 0.2s ease',
    }),
  },
  filterPillText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter',
    flex: 1,
    textAlign: 'center',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  searchButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 16,
      boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)',
      transition: 'all 0.2s ease',
    }),
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  cityDropdown: {
    position: 'absolute',
    top: 160,
    left: 24,
    right: 24,
    borderRadius: 16,
    borderWidth: 1,
    maxHeight: 240,
    zIndex: 1000,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
    ...(isWeb && {
      left: 40,
      right: 40,
      borderRadius: 20,
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
    }),
  },
  cityList: {
    maxHeight: 220,
  },
  cityOption: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    ...(isWeb && {
      cursor: 'pointer',
      paddingVertical: 18,
    }),
  },
  selectedCityOption: {
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  cityOptionText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 18,
    }),
  },
  selectedCityOptionText: {
    fontWeight: '700',
  },
  categoryScrollView: {
    paddingVertical: 20,
    ...(isWeb && {
      paddingVertical: 28,
    }),
  },
  categoryScrollContainer: {
    paddingHorizontal: 24,
    gap: 12,
    ...(isWeb && {
      paddingHorizontal: 40,
      gap: 16,
    }),
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 160,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 24,
      paddingVertical: 20,
      borderRadius: 20,
      minWidth: 180,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
    }),
  },
  activeCategoryChip: {
    borderColor: 'transparent',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    ...(isWeb && {
      boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
    }),
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
    ...(isWeb && {
      fontSize: 22,
      marginRight: 16,
    }),
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Inter',
    lineHeight: 20,
    ...(isWeb && {
      fontSize: 16,
      lineHeight: 22,
    }),
  },
  activeCategoryText: {
    fontWeight: '700',
  },
  categoryCount: {
    fontSize: 12,
    fontFamily: 'Inter',
    marginTop: 2,
    ...(isWeb && {
      fontSize: 13,
      marginTop: 4,
    }),
  },
  activeCategoryCount: {},
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    ...(isWeb && {
      paddingHorizontal: 40,
      paddingVertical: 20,
    }),
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 18,
    }),
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    ...(isWeb && {
      cursor: 'pointer',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
      transition: 'all 0.2s ease',
    }),
  },
  sortText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 15,
    }),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
    ...(isWeb && {
      paddingTop: 32,
      paddingBottom: 60,
    }),
  },
  experiencesGrid: {
    paddingHorizontal: 24,
    gap: 20,
    ...(isWeb && {
      paddingHorizontal: 40,
      gap: 24,
    }),
  },
  webGrid: {
    ...(isWeb && {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '24px',
    }),
  },
  experienceCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    ...(isWeb && {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: 24,
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1)',
    }),
  },
  imageContainer: {
    position: 'relative',
    height: 240,
    ...(isWeb && {
      height: 280,
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
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    ...(isWeb && {
      cursor: 'pointer',
      top: 20,
      right: 20,
      width: 44,
      height: 44,
      borderRadius: 22,
      transition: 'all 0.2s ease',
    }),
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FF4757',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    ...(isWeb && {
      top: 20,
      left: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
    }),
  },
  heartBadge: {
    backgroundColor: '#FF4757',
  },
  originalsBadge: {
    backgroundColor: '#FF6B35',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 13,
    }),
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 70,
    backgroundColor: '#00D2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    ...(isWeb && {
      top: 20,
      right: 80,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
    }),
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 13,
    }),
  },
  experienceInfo: {
    padding: 20,
    ...(isWeb && {
      padding: 28,
    }),
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: 'Inter',
    letterSpacing: -0.3,
    ...(isWeb && {
      fontSize: 20,
      lineHeight: 28,
      marginBottom: 16,
    }),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    ...(isWeb && {
      marginBottom: 16,
    }),
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 15,
    }),
  },
  separator: {
    fontSize: 14,
    marginHorizontal: 8,
    ...(isWeb && {
      fontSize: 15,
      marginHorizontal: 12,
    }),
  },
  groupSize: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 15,
    }),
  },
  ratingRow: {
    marginBottom: 16,
    ...(isWeb && {
      marginBottom: 20,
    }),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  rating: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
    ...(isWeb && {
      fontSize: 16,
    }),
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 15,
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
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginBottom: 4,
    ...(isWeb && {
      fontSize: 14,
    }),
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 6,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 17,
    }),
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
    ...(isWeb && {
      fontSize: 24,
    }),
  },
  priceUnit: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: '500',
    ...(isWeb && {
      fontSize: 14,
    }),
  },
});