import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

const GREEN  = '#2DB87E';
const ORANGE = '#FF7A28';
const NAVY   = '#1C1C2E';
const LIGHT_BG = '#F2F3F7';
const WHITE = '#FFFFFF';
const GREY = '#9E9E9E';

export default function DriverHomeScreen({ navigation }: any) {
  const { user, logout, orders, loadOrders, updateOrderStatusRemote } = useStore();
  const [online, setOnline] = useState(true);

  useEffect(() => {
    loadOrders(); // Load all orders to calculate stats
  }, []);

  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const incoming = preparingOrders.length > 0 ? preparingOrders[0] : null;

  // Calculate dynamic stats
  const todayEarnings = deliveredOrders.reduce((acc, o) => acc + (o.totalAmount * 0.25), 0); // Assuming 25% delivery fee
  const tripsCount = deliveredOrders.length;
  const totalDistance = (tripsCount * 3.7).toFixed(1); // Estimated distance: 3.7km per trip

  const handleAccept = async () => {
    if (incoming) {
      await updateOrderStatusRemote(incoming._id, 'out_for_delivery');
      navigation.navigate('DriverOrders');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_BG} />

      {/* Header */}
      <View style={styles.header}>
        {/* Menu Icon Placeholder */}
        <TouchableOpacity style={styles.menuBtn} onPress={logout}>
           <Ionicons name="log-out-outline" size={24} color={NAVY} />
        </TouchableOpacity>

        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>DRIVER STATUS</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={styles.locationName}>{user?.fullName || 'Delivery Partner'}</Text>
          </View>
        </View>

        {/* Online Toggle & Avatar */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.statusToggle, { backgroundColor: online ? GREEN : '#8E8E93' }]}
            onPress={() => setOnline((v) => !v)}
          >
            <View style={[styles.dot, { left: online ? 22 : 2 }]} />
          </TouchableOpacity>
          <Image
            source={{ uri: user?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Earnings Summary */}
        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>Your Total Earnings (Est.)</Text>
          <Text style={styles.earningsValue}>Rs.{todayEarnings.toFixed(2)}</Text>
          <View style={styles.earningsRow}>
            {[
              { label: 'Trips',    value: tripsCount.toString() },
              { label: 'Distance', value: `${totalDistance} km` },
              { label: 'Online',   value: online ? 'Online Now' : 'Offline' },
            ].map((e, i) => (
              <View key={i} style={styles.earningsItem}>
                <Text style={styles.earnItemValue}>{e.value}</Text>
                <Text style={styles.earnItemLabel}>{e.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapBox}>
          <Ionicons name="map" size={56} color="#C0CDD8" />
          <Text style={styles.mapLabel}>Live map coming soon</Text>
        </View>

        {/* Delivery Request */}
        <Text style={styles.sectionTitle}>
          {online ? 'Incoming Delivery' : 'You are Offline'}
        </Text>

        {online ? (
          incoming ? (
            <View style={styles.deliveryCard}>
              <View style={styles.deliveryHeader}>
                <Ionicons name="flash" size={18} color={ORANGE} />
                <Text style={styles.deliveryNew}>New Request: {incoming.items?.[0]?.food?.name || 'Order'}</Text>
              </View>

              {[
                { icon: 'storefront-outline',  label: 'Pickup',   value: incoming.pickupLocation || 'Plateform Kitchen, Main St' },
                { icon: 'location-outline',    label: 'Drop Off', value: incoming.dropoffLocation || 'Customer Location'   },
              ].map((r, i) => (
                <View key={i} style={styles.routeRow}>
                  <View style={[styles.routeIcon, { backgroundColor: i === 0 ? ORANGE + '15' : GREEN + '15' }]}>
                    <Ionicons name={r.icon as any} size={18} color={i === 0 ? ORANGE : GREEN} />
                  </View>
                  <View>
                    <Text style={styles.routeLabel}>{r.label}</Text>
                    <Text style={styles.routeValue}>{r.value}</Text>
                  </View>
                </View>
              ))}

              <View style={styles.deliveryMeta}>
                <View style={styles.metaChip}>
                  <Ionicons name="cash-outline" size={16} color={GREEN} />
                  <Text style={[styles.metaValue, { color: GREEN }]}>Rs.{(incoming?.totalAmount / 4).toFixed(2) || '12.50'} (Est)</Text>
                </View>
                <View style={styles.metaChip}>
                  <Ionicons name="navigate-outline" size={16} color="#4C8EFF" />
                  <Text style={[styles.metaValue, { color: '#4C8EFF' }]}>{incoming.distance || '2.4 km'}</Text>
                </View>
                <View style={styles.metaChip}>
                  <Ionicons name="time-outline" size={16} color={ORANGE} />
                  <Text style={[styles.metaValue, { color: ORANGE }]}>{incoming.time || '~8 min'}</Text>
                </View>
              </View>

              <View style={styles.deliveryBtns}>
                <TouchableOpacity style={styles.declineBtn}>
                  <Text style={styles.declineBtnText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.acceptBtn]}
                  onPress={handleAccept}
                >
                  <Text style={styles.acceptBtnText}>Accept & Pickup</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.offlineBox}>
              <Ionicons name="restaurant-outline" size={48} color={GREY} />
              <Text style={styles.offlineText}>Waiting for restaurants to prepare orders...</Text>
            </View>
          )
        ) : (
          <View style={styles.offlineBox}>
            <Ionicons name="moon-outline" size={48} color={GREY} />
            <Text style={styles.offlineText}>Go online to receive delivery requests</Text>
            <TouchableOpacity style={styles.goOnlineBtn} onPress={() => setOnline(true)}>
              <Text style={styles.goOnlineText}>Go Online</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Bottom Nav to match other dashboards */}
      <View style={styles.navbar}>
        {[
          { icon: 'grid-outline',          screen: 'DriverHome' },
          { icon: 'list-outline',          screen: 'DriverOrders' },
          { icon: 'wallet-outline',        screen: 'DriverWallet' },
          { icon: 'person-outline',        screen: 'DriverProfile' },
        ].map((tab: any, i) => (
          <TouchableOpacity
            key={i}
            style={styles.navItem}
            onPress={() => navigation.navigate(tab.screen)}
          >
            <Ionicons name={tab.icon} size={24} color={i === 0 ? ORANGE : GREY} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: LIGHT_BG },
  header:          { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: LIGHT_BG 
  },
  menuBtn:         { width: 44, height: 44, borderRadius: 22, backgroundColor: WHITE, justifyContent: 'center', alignItems: 'center' },
  locationRow:     { alignItems: 'center' },
  locationLabel:   { fontSize: 10, color: ORANGE, fontWeight: '800', letterSpacing: 0.5, marginBottom: 2 },
  locationName:    { fontSize: 14, color: NAVY, fontWeight: '700' },
  headerRight:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar:          { width: 40, height: 40, borderRadius: 20 },
  
  statusToggle:    { width: 44, height: 24, borderRadius: 12, justifyContent: 'center' },
  dot:             { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff', top: 3 },
  
  scroll:          { padding: 20, paddingBottom: 110 },
  earningsCard:    { backgroundColor: NAVY, borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: NAVY, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
  earningsLabel:   { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '500' },
  earningsValue:   { color: '#fff', fontSize: 36, fontWeight: '800', marginVertical: 8 },
  earningsRow:     { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)', paddingTop: 16, marginTop: 8 },
  earningsItem:    { flex: 1, alignItems: 'center' },
  earnItemValue:   { color: '#fff', fontWeight: '800', fontSize: 16 },
  earnItemLabel:   { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 },
  
  mapBox:          { backgroundColor: WHITE, borderRadius: 20, height: 140, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  mapLabel:        { color: GREY, marginTop: 8, fontWeight: '500' },
  
  sectionTitle:    { fontSize: 16, fontWeight: '800', color: NAVY, marginBottom: 14 },
  
  deliveryCard:    { backgroundColor: WHITE, borderRadius: 20, padding: 20 },
  deliveryHeader:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  deliveryNew:     { color: ORANGE, fontWeight: '800', fontSize: 15 },
  
  routeRow:        { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  routeIcon:       { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  routeLabel:      { fontSize: 11, color: GREY, fontWeight: '600', marginBottom: 2 },
  routeValue:      { fontSize: 14, fontWeight: '700', color: NAVY },
  
  deliveryMeta:    { flexDirection: 'row', gap: 10, marginVertical: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 16 },
  metaChip:        { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: LIGHT_BG, borderRadius: 12, paddingVertical: 10 },
  metaValue:       { fontWeight: '800', fontSize: 13 },
  
  deliveryBtns:    { flexDirection: 'row', gap: 12 },
  declineBtn:      { flex: 1, borderWidth: 1.5, borderColor: '#EBEBEB', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  declineBtnText:  { fontWeight: '700', color: GREY },
  acceptBtn:       { flex: 2, backgroundColor: ORANGE, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  acceptBtnText:   { color: WHITE, fontWeight: '800', fontSize: 15 },
  
  offlineBox:      { backgroundColor: WHITE, borderRadius: 20, padding: 40, alignItems: 'center' },
  offlineText:     { color: GREY, textAlign: 'center', marginTop: 12, marginBottom: 24, fontWeight: '500', lineHeight: 20 },
  goOnlineBtn:     { backgroundColor: GREEN, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14 },
  goOnlineText:    { color: WHITE, fontWeight: '800', fontSize: 15 },

  navbar: {
    position: 'absolute',
    bottom: 20, left: 20, right: 20,
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
