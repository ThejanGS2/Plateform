import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';

export default function DriverHomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Delivery Partner</Text>
        <Ionicons name="notifications-outline" size={24} color={Colors.text} />
      </View>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={80} color={Colors.gray} />
        <Text style={styles.mapText}>Map Preview</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>New Delivery Request!</Text>
        <Text style={styles.address}>123 Burger St, Food City</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Earn</Text>
            <Text style={styles.detailValue}>$12.50</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Distance</Text>
            <Text style={styles.detailValue}>2.4 km</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.acceptBtn}>
          <Text style={styles.acceptText}>ACCEPT DELIVERY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F5FA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  mapPlaceholder: { flex: 1, backgroundColor: '#E1E9F0', justifyContent: 'center', alignItems: 'center' },
  mapText: { color: Colors.textSecondary, marginTop: 10 },
  card: { backgroundColor: Colors.white, padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  address: { fontSize: 16, color: Colors.text, marginVertical: 8 },
  details: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 },
  detailItem: { alignItems: 'center', width: '45%' },
  detailLabel: { color: Colors.textSecondary, fontSize: 12 },
  detailValue: { fontSize: 18, fontWeight: 'bold' },
  acceptBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 12, alignItems: 'center' },
  acceptText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
