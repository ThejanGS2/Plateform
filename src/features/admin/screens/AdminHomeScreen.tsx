import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

const ACCENT = '#FF7A28';
const NAVY   = '#1C1C2E';

const StatCard = ({ icon, label, value, color }: any) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <Ionicons name={icon} size={22} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionButton = ({ icon, label, color, onPress }: any) => (
  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]} onPress={onPress}>
    <Ionicons name={icon} size={26} color="#fff" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function AdminHomeScreen({ navigation }: any) {
  const { user, logout } = useStore();

  const handleLogout = () => {
    logout();
  };

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.name}>{user?.fullName ?? 'Admin'} 👋</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.rolePill}>
            <Text style={styles.roleText}>ADMIN</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.statsGrid}>
          <StatCard icon="bag-handle"    label="Orders"      value="124"   color={ACCENT} />
          <StatCard icon="people"        label="Users"       value="1.2k"  color="#4C8EFF" />
          <StatCard icon="cash"          label="Revenue"     value="$3.4k" color="#2DB87E" />
          <StatCard icon="bicycle"       label="Deliveries"  value="38"    color="#A855F7" />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <ActionButton icon="people"      label="Users"    color="#4C8EFF" />
          <ActionButton icon="restaurant"  label="Menu"     color={ACCENT}  />
          <ActionButton icon="receipt"     label="Orders"   color="#2DB87E" />
          <ActionButton icon="bar-chart"   label="Reports"  color="#A855F7" />
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {[
          { icon: 'person-add',     text: 'New user registered',       time: '2m ago',  color: '#4C8EFF' },
          { icon: 'bag-check',      text: 'Order #1042 completed',     time: '5m ago',  color: '#2DB87E' },
          { icon: 'warning',        text: 'Low stock: Chicken Burger', time: '18m ago', color: ACCENT },
          { icon: 'bicycle',        text: 'Driver #7 went offline',    time: '30m ago', color: '#A855F7' },
        ].map((item, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon as any} size={18} color={item.color} />
            </View>
            <Text style={styles.activityText} numberOfLines={1}>{item.text}</Text>
            <Text style={styles.activityTime}>{item.time}</Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: NAVY },
  header:         { backgroundColor: NAVY, paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting:       { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  name:           { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 2 },
  headerRight:    { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rolePill:       { backgroundColor: ACCENT, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  roleText:       { color: '#fff', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  logoutBtn:      { padding: 6 },
  scroll:         { backgroundColor: '#F5F7FB', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 },
  sectionTitle:   { fontSize: 16, fontWeight: '700', color: '#1C1C2E', marginBottom: 14, marginTop: 8 },
  statsGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard:       { backgroundColor: '#fff', borderRadius: 14, padding: 16, width: '47%', borderLeftWidth: 4, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  statValue:      { fontSize: 22, fontWeight: 'bold', color: '#1C1C2E', marginTop: 8 },
  statLabel:      { fontSize: 12, color: '#8E8E93', marginTop: 2 },
  actionsGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  actionBtn:      { borderRadius: 16, padding: 20, width: '47%', alignItems: 'center', gap: 8 },
  actionLabel:    { color: '#fff', fontWeight: '700', fontSize: 13 },
  activityRow:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  activityIcon:   { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  activityText:   { flex: 1, fontSize: 14, color: '#1C1C2E' },
  activityTime:   { fontSize: 12, color: '#8E8E93', marginLeft: 8 },
});
