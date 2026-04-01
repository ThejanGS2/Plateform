import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';

const ORDERS = [
  {
    id: '1',
    date: 'Today, 12:05 PM',
    status: 'In Progress',
    items: ['2x Pizza Calzone European', '1x Sprite'],
    total: 96,
    active: true,
  },
  {
    id: '2',
    date: 'Oct 24, 2023, 08:30 PM',
    status: 'Delivered',
    items: ['1x Spicy Chili Hot Dog', '1x French Fries'],
    total: 24,
    active: false,
  },
  {
    id: '3',
    date: 'Oct 15, 2023, 01:15 PM',
    status: 'Delivered',
    items: ['1x Classic Margherita', '2x Garlic Bread'],
    total: 42,
    active: false,
  }
];

export default function OrderHistoryScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {ORDERS.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderDate}>{order.date}</Text>
              <View style={[styles.statusBadge, order.active ? styles.statusActive : styles.statusDelivered]}>
                <Text style={[styles.statusText, order.active ? styles.statusTextActive : styles.statusTextDelivered]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <View key={idx} style={styles.itemRow}>
                   <Ionicons name="ellipse" size={6} color="#A0A5BA" style={{marginRight: 8}} />
                   <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
            </View>

            <View style={styles.actionContainer}>
              {order.active ? (
                <AppButton title="TRACK ORDER" onPress={() => navigation.navigate('OrderTracker')} />
              ) : (
                <View style={styles.splitRow}>
                  <TouchableOpacity style={styles.rateButton} onPress={() => navigation.navigate('RateFood', { foodName: order.items[0] })}>
                    <Text style={styles.rateText}>RATE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reorderButton} onPress={() => navigation.navigate('Cart')}>
                    <Text style={styles.reorderText}>REORDER</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginVertical: 10 },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F5FA', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.text },
  
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 10 },
  
  orderCard: { backgroundColor: '#F6F8FA', borderRadius: 24, padding: 20, marginBottom: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  orderDate: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusActive: { backgroundColor: '#E4F9F0' }, // Light green
  statusDelivered: { backgroundColor: '#E0E8F2' }, // Light grey
  statusText: { fontSize: 12, fontWeight: 'bold' },
  statusTextActive: { color: '#00E58F' },
  statusTextDelivered: { color: Colors.textSecondary },
  
  itemsList: { marginBottom: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  itemText: { fontSize: 15, color: Colors.text, fontWeight: '500' },
  
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E8EAED', paddingTop: 16, marginBottom: 20 },
  totalLabel: { fontSize: 14, color: Colors.textSecondary, fontWeight: '600' },
  totalValue: { fontSize: 18, color: Colors.primary, fontWeight: 'bold' },
  
  actionContainer: {  },
  splitRow: { flexDirection: 'row', gap: 12 },
  rateButton: { flex: 1, backgroundColor: Colors.white, borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#E8EAED' },
  rateText: { color: Colors.text, fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  reorderButton: { flex: 1, backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  reorderText: { color: Colors.white, fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
});
