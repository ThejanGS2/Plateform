import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

const GREEN  = '#2DB87E';
const ORANGE = '#FF7A28';
const NAVY   = '#1C1C2E';

export default function DriverHomeScreen() {
  const { user, logout } = useStore();
  const [online, setOnline] = useState(true);
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Delivery Partner 🚗</Text>
          <Text style={styles.headerSub}>{user?.fullName}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.statusToggle, { backgroundColor: online ? GREEN : '#8E8E93' }]}
            onPress={() => setOnline((v) => !v)}
          >
            <View style={[styles.dot, { left: online ? 22 : 2 }]} />
          </TouchableOpacity>
          <Text style={styles.statusLabel}>{online ? 'Online' : 'Offline'}</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Earnings Summary */}
        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>Today's Earnings</Text>
          <Text style={styles.earningsValue}>$48.50</Text>
          <View style={styles.earningsRow}>
            {[
              { label: 'Trips',    value: '6'      },
              { label: 'Distance', value: '23 km'  },
              { label: 'Online',   value: '4h 12m' },
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
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryHeader}>
              <Ionicons name="flash" size={18} color={ORANGE} />
              <Text style={styles.deliveryNew}>New Request!</Text>
            </View>

            {[
              { icon: 'storefront-outline',  label: 'Pickup',   value: 'Plateform Kitchen, Main St' },
              { icon: 'location-outline',    label: 'Drop Off', value: '123 Burger St, Food City'   },
            ].map((r, i) => (
              <View key={i} style={styles.routeRow}>
                <View style={[styles.routeIcon, { backgroundColor: i === 0 ? ORANGE + '20' : GREEN + '20' }]}>
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
                <Text style={[styles.metaValue, { color: GREEN }]}>$12.50</Text>
              </View>
              <View style={styles.metaChip}>
                <Ionicons name="navigate-outline" size={16} color="#4C8EFF" />
                <Text style={[styles.metaValue, { color: '#4C8EFF' }]}>2.4 km</Text>
              </View>
              <View style={styles.metaChip}>
                <Ionicons name="time-outline" size={16} color={ORANGE} />
                <Text style={[styles.metaValue, { color: ORANGE }]}>~8 min</Text>
              </View>
            </View>

            <View style={styles.deliveryBtns}>
              <TouchableOpacity style={styles.declineBtn} onPress={() => setAccepted(false)}>
                <Text style={styles.declineBtnText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.acceptBtn, accepted && { backgroundColor: GREEN }]}
                onPress={() => setAccepted(true)}
              >
                <Text style={styles.acceptBtnText}>
                  {accepted ? '✓ Accepted' : 'Accept'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.offlineBox}>
            <Ionicons name="moon-outline" size={48} color="#8E8E93" />
            <Text style={styles.offlineText}>Go online to receive delivery requests</Text>
            <TouchableOpacity style={styles.goOnlineBtn} onPress={() => setOnline(true)}>
              <Text style={styles.goOnlineText}>Go Online</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1, backgroundColor: NAVY },
  header:          { backgroundColor: NAVY, paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle:     { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSub:       { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 2 },
  headerRight:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusToggle:    { width: 44, height: 24, borderRadius: 12, justifyContent: 'center' },
  dot:             { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff', top: 3 },
  statusLabel:     { color: '#fff', fontSize: 12, fontWeight: '600' },
  logoutBtn:       { padding: 6 },
  scroll:          { backgroundColor: '#F5F7FB', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 },
  earningsCard:    { backgroundColor: NAVY, borderRadius: 20, padding: 24, marginBottom: 20 },
  earningsLabel:   { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  earningsValue:   { color: '#fff', fontSize: 36, fontWeight: 'bold', marginVertical: 8 },
  earningsRow:     { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)', paddingTop: 16, marginTop: 4 },
  earningsItem:    { flex: 1, alignItems: 'center' },
  earnItemValue:   { color: '#fff', fontWeight: '700', fontSize: 16 },
  earnItemLabel:   { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  mapBox:          { backgroundColor: '#E6EEF4', borderRadius: 16, height: 140, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  mapLabel:        { color: '#8E8E93', marginTop: 8 },
  sectionTitle:    { fontSize: 16, fontWeight: '700', color: NAVY, marginBottom: 14 },
  deliveryCard:    { backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 10, elevation: 3 },
  deliveryHeader:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  deliveryNew:     { color: ORANGE, fontWeight: 'bold', fontSize: 16 },
  routeRow:        { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
  routeIcon:       { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  routeLabel:      { fontSize: 11, color: '#8E8E93' },
  routeValue:      { fontSize: 14, fontWeight: '600', color: NAVY },
  deliveryMeta:    { flexDirection: 'row', gap: 10, marginVertical: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 16 },
  metaChip:        { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: '#F5F7FB', borderRadius: 10, padding: 8 },
  metaValue:       { fontWeight: '700', fontSize: 14 },
  deliveryBtns:    { flexDirection: 'row', gap: 10 },
  declineBtn:      { flex: 1, borderWidth: 1.5, borderColor: '#ddd', borderRadius: 14, padding: 16, alignItems: 'center' },
  declineBtnText:  { fontWeight: '600', color: '#8E8E93' },
  acceptBtn:       { flex: 2, backgroundColor: ORANGE, borderRadius: 14, padding: 16, alignItems: 'center' },
  acceptBtnText:   { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  offlineBox:      { backgroundColor: '#fff', borderRadius: 20, padding: 40, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  offlineText:     { color: '#8E8E93', textAlign: 'center', marginTop: 12, marginBottom: 20 },
  goOnlineBtn:     { backgroundColor: GREEN, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14 },
  goOnlineText:    { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
