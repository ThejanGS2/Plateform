import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';

const CATEGORIES = [
  { id: '1', name: 'All', icon: '🔥', active: true },
  { id: '2', name: 'Hot Dog', icon: '🌭', active: false },
  { id: '3', name: 'Burger', icon: '🍔', active: false },
  { id: '4', name: 'Pizza', icon: '🍕', active: false },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.addressContainer}>
            <Text style={styles.deliverTo}>DELIVER TO</Text>
            <TouchableOpacity style={styles.addressDropdown}>
              <Text style={styles.addressText}>Halal Lab office</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.text} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="bag-handle-outline" size={20} color={Colors.white} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Hey Halal, <Text style={styles.greetingBold}>Good Afternoon!</Text></Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search dishes, restaurants"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, cat.active && styles.categoryCardActive]}>
              <View style={[styles.categoryIconCircle, cat.active ? styles.categoryIconCircleActive : styles.categoryIconCircleInactive]}>
                <Text style={styles.emoji}>{cat.icon}</Text>
              </View>
              <Text style={[styles.categoryName, cat.active && styles.categoryNameActive]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Open Restaurants Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        {/* Restaurant Card */}
        <TouchableOpacity style={styles.restaurantCard}>
          <Image source={require('@/assets/images/restaurant_1.png')} style={styles.restaurantImage} />
          <Text style={styles.restaurantName}>Rose Garden Restaurant</Text>
          <Text style={styles.restaurantTags}>Burger - Chiken - Riche - Wings</Text>
          <View style={styles.restaurantStats}>
            <View style={styles.statLine}>
              <Ionicons name="star-outline" size={16} color={Colors.primary} />
              <Text style={styles.statTextHighlight}>4.7</Text>
            </View>
            <View style={styles.statLine}>
              <Ionicons name="car-outline" size={16} color={Colors.primary} />
              <Text style={styles.statText}>Free</Text>
            </View>
            <View style={styles.statLine}>
              <Ionicons name="time-outline" size={16} color={Colors.primary} />
              <Text style={styles.statText}>20 min</Text>
            </View>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    alignItems: 'center',
  },
  deliverTo: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  addressDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  addressText: {
    fontWeight: '500',
    color: Colors.text,
  },
  cartButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 20,
    marginBottom: 16,
  },
  greetingBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FA',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: Colors.text,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginRight: 4,
  },
  categoriesScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingRight: 16,
    backgroundColor: Colors.white,
    borderRadius: 30,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryCardActive: {
    backgroundColor: Colors.primary,
  },
  categoryIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryIconCircleInactive: {
    backgroundColor: '#F0F5FA',
  },
  categoryIconCircleActive: {
    backgroundColor: Colors.white,
  },
  emoji: {
    fontSize: 18,
  },
  categoryName: {
    fontWeight: '600',
    color: Colors.text,
  },
  categoryNameActive: {
    color: Colors.white,
  },
  restaurantCard: {
    marginBottom: 20,
  },
  restaurantImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  restaurantTags: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  restaurantStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statTextHighlight: {
    marginLeft: 6,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statText: {
    marginLeft: 6,
    color: Colors.textSecondary,
  },
});
