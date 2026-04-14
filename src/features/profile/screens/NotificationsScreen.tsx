import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';

export default function NotificationsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={28} color="#23C4D7" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Order Arriving Soon!</Text>
            <Text style={styles.cardText}>Your order from Halal Lab is 5 minutes away.</Text>
            <Text style={styles.timeText}>10:30 AM</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="card" size={28} color={Colors.primary} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Payment Confirmed</Text>
            <Text style={styles.cardText}>Successfully processed Rs.96 for your recent order.</Text>
            <Text style={styles.timeText}>Yesterday</Text>
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
  card: { flexDirection: 'row', backgroundColor: '#F6F8FA', borderRadius: 16, padding: 16, marginBottom: 16 },
  iconContainer: { marginRight: 16, marginTop: 2 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.text, marginBottom: 6 },
  cardText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20, marginBottom: 8 },
  timeText: { fontSize: 12, color: '#A0A5BA', fontWeight: '500' },
});
