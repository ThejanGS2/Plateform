import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';

export default function UserReviewsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Reviews</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <View style={styles.cardHeader}>
               <Text style={styles.cardTitle}>John Doe</Text>
               <View style={styles.ratingBox}>
                 <Ionicons name="star" color="#FFB01D" size={14}/>
                 <Text style={styles.ratingText}>4.5</Text>
               </View>
            </View>
            <Text style={styles.cardText}>"The food was absolutely amazing and arrived blazing fast! Highly recommend the Spicy Chicken Burger."</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <View style={styles.cardHeader}>
               <Text style={styles.cardTitle}>Ananya Sharma</Text>
               <View style={styles.ratingBox}>
                 <Ionicons name="star" color="#FFB01D" size={14}/>
                 <Text style={styles.ratingText}>5.0</Text>
               </View>
            </View>
            <Text style={styles.cardText}>"Best pizza I've had in a long time. The delivery was super courteous and prompt."</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginVertical: 10 },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F5FA', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.text },
  card: { backgroundColor: '#F6F8FA', borderRadius: 16, padding: 16, marginBottom: 16 },
  cardInfo: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.text },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 14, fontWeight: '600', color: Colors.text },
  cardText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, fontStyle: 'italic' },
});
