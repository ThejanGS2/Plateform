import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ORANGE = '#FF7A28';
const NAVY = '#1C1C2E';
const BG = '#F2F3F7';
const WHITE = '#FFFFFF';
const GREY = '#9E9E9E';

interface Order {
  id: string;
  orderId: string;
  name: string;
  category: string;
  price: number;
  image: string;
  status: 'pending' | 'done' | 'cancelled';
}

const INITIAL_ORDERS: Order[] = [
  {
    id: '1',
    orderId: '32053',
    name: 'Chicken Thai Biriyani',
    category: 'Breakfast',
    price: 60,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&q=80',
    status: 'pending',
  },
  {
    id: '2',
    orderId: '15253',
    name: 'Chicken Bhuna',
    category: 'Breakfast',
    price: 30,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&q=80',
    status: 'pending',
  },
  {
    id: '3',
    orderId: '21200',
    name: 'Vegetarian Poutine',
    category: 'Breakfast',
    price: 35,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
    status: 'pending',
  },
  {
    id: '4',
    orderId: '53241',
    name: 'Turkey Bacon Strips',
    category: 'Breakfast',
    price: 45,
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=200&q=80',
    status: 'pending',
  },
  {
    id: '5',
    orderId: '58464',
    name: 'Veggie Burrito',
    category: 'Breakfast',
    price: 28,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200&q=80',
    status: 'pending',
  },
];

export default function ChefOrdersScreen({ navigation }: any) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const pendingOrders = orders.filter((o) => o.status === 'pending');

  const markDone = (id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'done' } : o)));
  };

  const markCancelled = (id: string) => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () =>
          setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'cancelled' } : o))),
      },
    ]);
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderCard}>
      <Image source={{ uri: item.image }} style={styles.foodImage} resizeMode="cover" />
      <View style={styles.orderInfo}>
        <Text style={styles.categoryTag}>#{item.category}</Text>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.orderId}>ID: {item.orderId}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => markDone(item.id)}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => markCancelled(item.id)}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 32 }} />

        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>LOCATION</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={styles.locationName}>Halal Lab office</Text>
            <Ionicons name="chevron-down" size={14} color={NAVY} />
          </View>
        </View>

        <TouchableOpacity style={styles.avatarWrap} onPress={() => navigation?.navigate?.('ChefProfile')}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&q=80' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsBg}>
        <View style={styles.statsRow}>
          <View style={styles.bigStatBox}>
            <Text style={styles.bigStatLabel}>RUNNING ORDERS</Text>
            <Text style={styles.bigNum}>{pendingOrders.length}</Text>
          </View>
          <View style={styles.bigStatBox}>
            <Text style={styles.bigStatLabel}>ORDER REQUEST</Text>
            <Text style={styles.bigNum}>05</Text>
          </View>
        </View>
      </View>

      {/* Orders list */}
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>{pendingOrders.length} Running Orders</Text>
        <FlatList
          data={pendingOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="checkmark-circle" size={48} color={ORANGE} />
              <Text style={styles.emptyText}>All orders done! 🎉</Text>
            </View>
          }
        />
      </View>

      {/* Bottom Nav */}
      <View style={styles.navbar}>
        {[
          { icon: 'grid-outline', screen: 'ChefHome' },
          { icon: 'list-outline', screen: 'ChefOrders', active: true },
          { icon: 'fast-food-outline', screen: 'ChefFoodList' },
          { icon: 'notifications-outline', screen: 'ChefNotifications' },
        ].map((tab: any, i) => (
          <TouchableOpacity
            key={i}
            style={styles.navItem}
            onPress={() => navigation?.navigate?.(tab.screen)}
          >
            <Ionicons name={tab.icon} size={24} color={tab.active ? ORANGE : GREY} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: BG,
  },
  menuBtn: { padding: 4 },
  locationRow: { flex: 1, alignItems: 'center' },
  locationLabel: { fontSize: 10, fontWeight: '700', color: ORANGE, letterSpacing: 1.2 },
  locationName: { fontSize: 14, fontWeight: '700', color: NAVY },
  avatarWrap: { width: 38, height: 38, borderRadius: 19, overflow: 'hidden' },
  avatar: { width: 38, height: 38, borderRadius: 19 },

  statsBg: { backgroundColor: BG, paddingHorizontal: 20, paddingBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-evenly' },
  bigStatBox: { flex: 1, alignItems: 'center' },
  bigNum: { fontSize: 52, fontWeight: '900', color: NAVY, lineHeight: 56, textAlign: 'center' },
  bigStatLabel: { fontSize: 10, fontWeight: '700', color: GREY, letterSpacing: 0.8, marginBottom: 2, textAlign: 'center' },

  listContainer: {
    flex: 1,
    backgroundColor: WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listTitle: { fontSize: 18, fontWeight: '800', color: NAVY, marginBottom: 16 },

  orderCard: {
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  foodImage: { width: 90, height: 90, borderRadius: 12 },
  orderInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 6, justifyContent: 'space-between' },
  categoryTag: { fontSize: 11, fontWeight: '700', color: ORANGE },
  foodName: { fontSize: 14, fontWeight: '700', color: NAVY, marginTop: 2 },
  orderId: { fontSize: 12, color: GREY, marginTop: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  price: { fontSize: 15, fontWeight: '800', color: NAVY, marginRight: 4 },
  doneBtn: { backgroundColor: ORANGE, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  doneBtnText: { color: WHITE, fontSize: 12, fontWeight: '700' },
  cancelBtn: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, borderWidth: 1.5, borderColor: '#E0E0E0' },
  cancelBtnText: { color: NAVY, fontSize: 12, fontWeight: '600' },

  emptyBox: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { color: GREY, fontSize: 16 },

  navbar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 64,
    backgroundColor: WHITE,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
    paddingHorizontal: 10,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
});

