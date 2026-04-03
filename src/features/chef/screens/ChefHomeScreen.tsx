import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { useStore } from '@/store/useStore';

export default function ChefHomeScreen({ navigation }: any) {
  const user = useStore((state) => state.user);

  const pendingOrders = [
    { id: '1', item: 'Chicken Burger', table: 'T4', time: '5m ago' },
    { id: '2', item: 'Italian Pasta', table: 'T2', time: '8m ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Chef Kitchen</Text>
          <Text style={styles.subtitle}>{user?.fullName}</Text>
        </View>
        <TouchableOpacity style={styles.statusBadge}>
          <Text style={styles.statusText}>Online</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Active Orders</Text>
        <FlatList
          data={pendingOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderItem}>{item.item}</Text>
                <Text style={styles.orderMeta}>Table {item.table} • {item.time}</Text>
              </View>
              <TouchableOpacity style={styles.completeBtn}>
                <Ionicons name="checkmark" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.manageBtn}>
          <Text style={styles.manageBtnText}>Manage Menu Availability</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  subtitle: { color: Colors.textSecondary },
  statusBadge: { backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { color: 'white', fontWeight: '600', fontSize: 12 },
  content: { padding: 24, flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  orderCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  orderInfo: {
    flex: 1,
    marginRight: 10
  },
  orderItem: { fontSize: 16, fontWeight: '600' },
  orderMeta: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  completeBtn: { backgroundColor: '#4CAF50', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  manageBtn: { backgroundColor: Colors.secondary, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 'auto' },
  manageBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
