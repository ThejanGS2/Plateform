import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';

export default function FoodDetailsScreen({ navigation }: any) {
  const [size, setSize] = useState('14"');
  const [qty, setQty] = useState(2);
  
  const [ingredients, setIngredients] = useState([
    { id: '1', icon: 'shaker-outline', qty: 1 },
    { id: '2', icon: 'food-drumstick-outline', qty: 1 },
    { id: '3', icon: 'leaf', qty: 1 },
    { id: '4', icon: 'mushroom-outline', qty: 1 },
    { id: '5', icon: 'chili-mild', qty: 1 },
  ]);

  const toggleIngredientQty = (id: string) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.id === id) {
        return { ...ing, qty: ing.qty >= 3 ? 1 : ing.qty + 1 };
      }
      return ing;
    }));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.topArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
          <View style={{ width: 44 }} />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollArea}>
        
        {/* Hero Image Container */}
        <View style={styles.heroContainer}>
          <View style={styles.heroBackground}>
             <Ionicons name="pizza" size={140} color={Colors.white} style={{opacity: 0.9}} />
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentPadding}>
          {/* Details */}
          <Text style={styles.foodTitle}>Pizza Calzone European</Text>
          <Text style={styles.foodDesc}>Prosciutto e funghi is a pizza variety that is topped with tomato sauce.</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star-outline" size={20} color="#FFB01D" />
              <Text style={styles.statText}>4.7</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="bicycle-outline" size={20} color="#FF7A28" />
              <Text style={styles.statText}>Free</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#FF7A28" />
              <Text style={styles.statText}>20 min</Text>
            </View>
          </View>

          {/* Size Selector */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>SIZE:</Text>
            <View style={styles.sizeOptions}>
              {['10"', '14"', '16"'].map(s => (
                <TouchableOpacity 
                  key={s} 
                  style={[styles.sizeBtn, size === s && styles.sizeBtnActive]}
                  onPress={() => setSize(s)}
                >
                  <Text style={[styles.sizeBtnText, size === s && styles.sizeBtnTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Ingredients */}
          <Text style={[styles.sectionLabel, { marginTop: 32, marginBottom: 16 }]}>INGREDIENTS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ingredientsScroll}>
            {ingredients.map(ing => (
              <TouchableOpacity key={ing.id} style={styles.ingredientContainer} onPress={() => toggleIngredientQty(ing.id)}>
                <View style={styles.ingredientCircle}>
                  <MaterialCommunityIcons name={ing.icon as any} size={26} color="#FF7A28" />
                </View>
                {ing.qty > 1 && (
                  <View style={styles.ingredientBadge}>
                    <Text style={styles.ingredientBadgeText}>x{ing.qty}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      {/* Footer / Bottom Sheet */}
      <View style={styles.footerContainer}>
        <View style={styles.footerTopRow}>
          <Text style={styles.priceText}>$32</Text>
          <View style={styles.qtyBox}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty-1))}><Ionicons name="remove" size={16} color={Colors.white}/></TouchableOpacity>
            <Text style={styles.qtyValue}>{qty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty+1)}><Ionicons name="add" size={16} color={Colors.white}/></TouchableOpacity>
          </View>
        </View>
        <AppButton title="ADD TO CART" onPress={() => navigation.navigate('Cart')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  topArea: { backgroundColor: Colors.white, zIndex: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 10 },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F5FA', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.text },
  
  scrollArea: { flex: 1 },
  heroContainer: { paddingHorizontal: 24, marginTop: 16, position: 'relative' },
  heroBackground: { backgroundColor: '#FFD29F', borderRadius: 30, height: 200, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  favoriteButton: { position: 'absolute', bottom: 16, right: 40, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', justifyContent: 'center', alignItems: 'center' },
  
  contentPadding: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  
  foodTitle: { fontSize: 26, fontWeight: 'bold', color: Colors.text, marginBottom: 12 },
  foodDesc: { fontSize: 15, color: '#A0A5BA', lineHeight: 24, marginBottom: 24 },
  
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 24, marginBottom: 32 },
  statItem: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  statText: { fontSize: 15, fontWeight: '600', color: Colors.text },
  
  sectionRow: { flexDirection: 'row', alignItems: 'center' },
  sectionLabel: { fontSize: 13, fontWeight: 'bold', color: '#A0A5BA', letterSpacing: 0.5, marginRight: 10 },
  sizeOptions: { flexDirection: 'row', gap: 12 },
  sizeBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F6F8FA', justifyContent: 'center', alignItems: 'center' },
  sizeBtnActive: { backgroundColor: Colors.primary },
  sizeBtnText: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  sizeBtnTextActive: { color: Colors.white },
  
  ingredientsScroll: { overflow: 'visible', marginHorizontal: -24, paddingHorizontal: 24 },
  ingredientContainer: { position: 'relative', marginRight: 16 },
  ingredientCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFF0E6', justifyContent: 'center', alignItems: 'center' },
  ingredientBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: Colors.primary, width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.white },
  ingredientBadgeText: { color: Colors.white, fontSize: 10, fontWeight: 'bold' },
  
  footerContainer: { backgroundColor: '#F6F8FA', borderTopLeftRadius: 36, borderTopRightRadius: 36, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 34 },
  footerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  priceText: { fontSize: 28, fontWeight: 'bold', color: Colors.text },
  qtyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#161924', borderRadius: 30, paddingHorizontal: 6, paddingVertical: 6, gap: 16 },
  qtyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  qtyValue: { fontSize: 16, fontWeight: '600', color: Colors.white },
});
