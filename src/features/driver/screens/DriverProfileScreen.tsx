import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '@/store/useStore';

const ORANGE = '#FF7A28';
const NAVY   = '#1C1C2E';
const LIGHT_BG = '#F2F3F7';
const WHITE = '#FFFFFF';
const GREY = '#9E9E9E';
const RED    = '#FF3B30';

export default function DriverProfileScreen({ navigation }: any) {
  const { user, logout } = useStore();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_BG} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
         <View style={styles.infoBox}>
            <View style={styles.avatarWrap}>
               <Ionicons name="person" size={40} color={NAVY} />
            </View>
            <Text style={styles.nameText}>{user?.fullName || 'Delivery Partner'}</Text>
            <Text style={styles.roleText}>{user?.role?.toUpperCase() || 'DRIVER'}</Text>
         </View>
         <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Ionicons name="log-out-outline" size={20} color={RED} />
            <Text style={styles.logoutText}>Log Out</Text>
         </TouchableOpacity>
      </ScrollView>
      <View style={styles.navbar}>
        {[
          { icon: 'grid-outline',          screen: 'DriverHome' },
          { icon: 'list-outline',          screen: 'DriverOrders' },
          { icon: 'wallet-outline',        screen: 'DriverWallet' },
          { icon: 'person-outline',        screen: 'DriverProfile' },
        ].map((tab: any, i) => (
          <TouchableOpacity key={i} style={styles.navItem} onPress={() => navigation.navigate(tab.screen)}>
            <Ionicons name={tab.icon} size={24} color={i === 3 ? ORANGE : GREY} />
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
  scroll: { padding: 20, paddingBottom: 100 },
  infoBox: { alignItems: 'center', backgroundColor: WHITE, borderRadius: 20, padding: 30, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, marginBottom: 20 },
  avatarWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: LIGHT_BG, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  nameText: { fontSize: 20, fontWeight: '800', color: NAVY, marginBottom: 4 },
  roleText: { fontSize: 13, color: ORANGE, fontWeight: '600' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBEB', paddingVertical: 16, borderRadius: 16, gap: 8 },
  logoutText: { color: RED, fontWeight: '800', fontSize: 16 },
  navbar: { position: 'absolute', bottom: 20, left: 20, right: 20, height: 64, backgroundColor: WHITE, borderRadius: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', elevation: 12, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 20, paddingHorizontal: 10 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
});
