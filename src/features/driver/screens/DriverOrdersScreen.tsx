import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore, Order } from '@/store/useStore';

const GREEN  = '#2DB87E';
const ORANGE = '#FF7A28';
const NAVY   = '#1C1C2E';
const LIGHT_BG = '#F2F3F7';
const WHITE = '#FFFFFF';
const GREY = '#9E9E9E';

export default function DriverOrdersScreen({ navigation }: any) {
  const { orders, loadOrders, updateOrderStatusRemote } = useStore();

  useEffect(() => {
    loadOrders('out_for_delivery');
  }, []);

  const activeOrders = orders.filter(o => o.status === 'out_for_delivery');
  const pastOrders = orders.filter(o => o.status === 'delivered');

  const renderOrder = ({ item }: { item: Order }) => {
    const firstItem = item.items?.[0];
    const foodName = firstItem?.food?.name || 'Multiple Items';

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderRow}>
          <Ionicons name="fast-food" size={24} color={ORANGE} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.foodName}>{foodName}</Text>
            <Text style={styles.dropoff}>{item.deliveryAddress || 'Customer Address'}</Text>
          </View>
          <Text style={styles.price}>Rs.{item.totalAmount}</Text>
        </View>
        <TouchableOpacity style={styles.finishBtn} onPress={() => updateOrderStatusRemote(item._id, 'delivered')}>
          <Text style={styles.finishBtnText}>Finish Delivery</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_BG} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Active Deliveries</Text>
      </View>
      
      {activeOrders.length === 0 ? (
        <ScrollView contentContainerStyle={styles.scroll}>
           <View style={styles.emptyBox}>
              <Ionicons name="bicycle-outline" size={48} color={GREY} />
              <Text style={styles.emptyText}>No active deliveries.</Text>
           </View>
        </ScrollView>
      ) : (
        <FlatList
          data={activeOrders}
          keyExtractor={o => o._id}
          renderItem={renderOrder}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        />
      )}
      <View style={styles.navbar}>
        {[
          { icon: 'grid-outline',          screen: 'DriverHome' },
          { icon: 'list-outline',          screen: 'DriverOrders' },
          { icon: 'wallet-outline',        screen: 'DriverWallet' },
          { icon: 'person-outline',        screen: 'DriverProfile' },
        ].map((tab: any, i) => (
          <TouchableOpacity key={i} style={styles.navItem} onPress={() => navigation.navigate(tab.screen)}>
            <Ionicons name={tab.icon} size={24} color={i === 1 ? ORANGE : GREY} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: LIGHT_BG },
  header: { padding: 20, backgroundColor: LIGHT_BG },
  headerTitle: { fontSize: 22, fontWeight: '800', color: NAVY },
  scroll: { padding: 20, alignItems: 'center', justifyContent: 'center', flexGrow: 1, paddingBottom: 100 },
  emptyBox: { alignItems: 'center', opacity: 0.6 },
  emptyText: { marginTop: 12, fontSize: 16, color: NAVY, fontWeight: '600' },
  orderCard: { backgroundColor: WHITE, padding: 16, borderRadius: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8 },
  orderRow: { flexDirection: 'row', alignItems: 'center' },
  foodName: { fontSize: 16, fontWeight: '700', color: NAVY },
  dropoff: { fontSize: 12, color: GREY, marginTop: 4 },
  price: { fontSize: 16, fontWeight: '800', color: GREEN },
  finishBtn: { backgroundColor: GREEN, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  finishBtnText: { color: WHITE, fontWeight: '700', fontSize: 14 },
  navbar: { position: 'absolute', bottom: 20, left: 20, right: 20, height: 64, backgroundColor: WHITE, borderRadius: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', elevation: 12, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 20, paddingHorizontal: 10 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
});
