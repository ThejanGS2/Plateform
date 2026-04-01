import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';

const CATEGORIES = [
  { id: '1', name: 'All', icon: '🔥' },
  { id: '2', name: 'Hot Dog', icon: '🌭' },
  { id: '3', name: 'Burger', icon: '🍔' },
  { id: '4', name: 'Pizza', icon: '🍕' },
];

const AVAILABLE_FOODS = [
  { id: '1', name: 'Pizza Calzone European', restaurant: 'Uttora Coffe House', price: 32, rating: 4.7, category: 'Pizza', icon: 'pizza' },
  { id: '2', name: 'Spicy Chili Hot Dog', restaurant: 'NYC Grill', price: 12, rating: 4.5, category: 'Hot Dog', icon: 'fast-food' },
  { id: '3', name: 'Beef Double Burger', restaurant: 'Burger King', price: 18, rating: 4.8, category: 'Burger', icon: 'fast-food' },
  { id: '4', name: 'Classic Margherita', restaurant: 'Italiano', price: 28, rating: 4.6, category: 'Pizza', icon: 'pizza' },
];

export default function HomeScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFoods = AVAILABLE_FOODS.filter(food => activeCategory === 'All' || food.category === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="menu-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.addressContainer}>
            <Text style={styles.deliverTo}>DELIVER TO</Text>
            <TouchableOpacity style={styles.addressDropdown}>
              <Text style={styles.addressText}>Halal Lab office</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.text} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
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
          <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.name;
            return (
              <TouchableOpacity 
                key={cat.id} 
                style={[styles.categoryCard, isActive && styles.categoryCardActive]}
                onPress={() => setActiveCategory(cat.name)}
              >
                <View style={[styles.categoryIconCircle, isActive ? styles.categoryIconCircleActive : styles.categoryIconCircleInactive]}>
                  <Text style={styles.emoji}>{cat.icon}</Text>
                </View>
                <Text style={[styles.categoryName, isActive && styles.categoryNameActive]}>{cat.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Available Foods Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Foods</Text>
        </View>

        <View style={styles.foodList}>
          {filteredFoods.map(food => (
            <TouchableOpacity 
              key={food.id} 
              style={styles.foodCard} 
              onPress={() => navigation.navigate('FoodDetails', { foodId: food.id })}
            >
              <View style={styles.foodImageContainer}>
                 <Ionicons name={food.icon as any} size={40} color={Colors.white} />
              </View>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
                
                <View style={styles.foodMetaRow}>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color={Colors.white} style={{ marginRight: 4 }} />
                    <Text style={styles.ratingText}>{food.rating}</Text>
                  </View>
                  <Text style={styles.foodPrice}>${food.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {filteredFoods.length === 0 && (
             <Text style={styles.emptyText}>No available foods in this category.</Text>
          )}
        </View>

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
    backgroundColor: '#F6F8FA',
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
    letterSpacing: 0.5,
  },
  addressDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  addressText: {
    fontWeight: '600',
    color: Colors.text,
  },
  cartButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#1A1D2E',
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
    color: Colors.textSecondary,
    marginTop: 20,
    marginBottom: 16,
  },
  greetingBold: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    borderRadius: 16,
    height: 52,
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
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    paddingBottom: 15,
    paddingTop: 5,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingRight: 16,
    backgroundColor: Colors.white,
    borderRadius: 30,
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  categoryCardActive: {
    backgroundColor: Colors.primary,
  },
  categoryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIconCircleInactive: {
    backgroundColor: '#F6F8FA',
  },
  categoryIconCircleActive: {
    backgroundColor: Colors.white,
  },
  emoji: {
    fontSize: 20,
  },
  categoryName: {
    fontWeight: '600',
    color: Colors.text,
    fontSize: 15,
  },
  categoryNameActive: {
    color: Colors.white,
  },
  
  foodList: { marginTop: 4 },
  foodCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  foodImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#FFD29F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  foodInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  foodMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7A28',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  foodPrice: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 15,
    marginTop: 20,
  }
});
