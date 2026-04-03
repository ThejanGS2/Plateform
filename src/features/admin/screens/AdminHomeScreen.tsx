import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { useStore } from '@/store/useStore';

export default function AdminHomeScreen({ navigation }: any) {
  const user = useStore((state) => state.user);
  const logout = () => {
    // Basic logout simulation for now
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome back, {user?.fullName}!</Text>
          <Text style={styles.roleBadge}>System Administrator</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Orders Today</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>$1.2k</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="people" size={20} color={Colors.white} />
          <Text style={styles.actionText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="restaurant" size={20} color={Colors.white} />
          <Text style={styles.actionText}>Edit Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 24,
    backgroundColor: Colors.white
  },
  title: { fontSize: 20, fontWeight: 'bold', color: Colors.text },
  content: { padding: 24 },
  welcomeCard: {
    backgroundColor: Colors.secondary,
    padding: 24,
    borderRadius: 16,
    marginBottom: 24
  },
  welcomeText: { color: 'white', fontSize: 18, fontWeight: '600' },
  roleBadge: { color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statBox: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  statValue: { fontSize: 22, fontWeight: 'bold', color: Colors.primary },
  statLabel: { color: Colors.textSecondary, fontSize: 12, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  actionButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  actionText: { color: 'white', fontWeight: 'bold', marginLeft: 12, fontSize: 16 }
});
