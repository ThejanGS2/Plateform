import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';

export default function AddressesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Address</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Address Card 1 */}
        <View style={styles.addressCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="home-outline" size={24} color={Colors.primary} />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>HOME</Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="create-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="trash-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.cardAddress}>2464 Royal Ln. Mesa, New Jersey 45463</Text>
          </View>
        </View>

        {/* Address Card 2 */}
        <View style={styles.addressCard}>
          <View style={styles.iconContainer}>
            <Ionicons name="briefcase-outline" size={24} color={'#5C61F4'} />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>WORK</Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="create-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIcon}>
                  <Ionicons name="trash-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.cardAddress}>3891 Ranchview Dr. Richardson, California 62639</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton title="ADD NEW ADDRESS" onPress={() => navigation.navigate('AddNewAddress')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F5FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.text },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#F6F8FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfo: { flex: 1 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: { fontSize: 14, fontWeight: '600', color: Colors.text, letterSpacing: 0.5 },
  cardActions: { flexDirection: 'row', gap: 12 },
  actionIcon: { padding: 2 },
  cardAddress: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 16 },
});
