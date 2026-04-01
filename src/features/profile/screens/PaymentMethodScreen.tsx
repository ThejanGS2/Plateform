import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';

const CashLogo = () => (
  <View style={{ width: 48, height: 32, borderRadius: 6, borderWidth: 3, borderColor: '#FF7A28', justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#FF7A28', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>1</Text>
    </View>
  </View>
);

const VisaLogo = () => (
  <View style={{ width: 48, height: 32, borderRadius: 6, backgroundColor: '#1A1F71', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 0.5 }}>VISA</Text>
  </View>
);

const MastercardLogo = () => (
  <View style={{ width: 48, height: 32, borderRadius: 6, backgroundColor: '#EB001B', justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFFFFF', marginRight: -5, zIndex: 1 }} />
      <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFFFFF', opacity: 0.8 }} />
    </View>
    <Text style={{ color: 'white', fontSize: 7, fontWeight: '600', letterSpacing: 0.2 }}>mastercard</Text>
  </View>
);

const PaypalLogo = () => (
  <View style={{ width: 48, height: 32, borderRadius: 6, backgroundColor: '#003087', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', fontStyle: 'italic' }}>PayPal</Text>
  </View>
);

const PAYMENT_METHODS = [
  { id: '1', name: 'Cash' },
  { id: '2', name: 'Visa' },
  { id: '3', name: 'Mastercard' },
  { id: '4', name: 'Paypal' },
];

export default function PaymentMethodScreen({ navigation }: any) {
  const [selectedMethod, setSelectedMethod] = useState('3');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Horizontal Payment Selection */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.methodScroll} contentContainerStyle={styles.methodScrollContent}>
          {PAYMENT_METHODS.map(method => {
            const isSelected = selectedMethod === method.id;
            return (
              <View key={method.id} style={styles.methodWrapper}>
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity 
                    style={[styles.methodCard, isSelected && styles.methodCardActive]}
                    onPress={() => setSelectedMethod(method.id)}
                  >
                    {method.id === '1' && <CashLogo />}
                    {method.id === '2' && <VisaLogo />}
                    {method.id === '3' && <MastercardLogo />}
                    {method.id === '4' && <PaypalLogo />}
                  </TouchableOpacity>
                  
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={14} color={Colors.white} />
                    </View>
                  )}
                </View>
                <Text style={styles.methodName}>{method.name}</Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Selected Card UI */}
        <View style={styles.cardInfoBox}>
          <View style={styles.cardInfoLeft}>
            <Text style={styles.cardInfoTitle}>Master Card</Text>
            <View style={styles.cardNumberContainer}>
              <FontAwesome5 name="cc-mastercard" size={20} color="#EB001B" style={{marginRight: 8}} />
              <Text style={styles.cardNumber}>•••• •••• •••• 436</Text>
            </View>
          </View>
          <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
        </View>

        {/* Add New Button */}
        <TouchableOpacity style={styles.addNewButton} onPress={() => navigation.navigate('AddCard')}>
          <Ionicons name="add" size={20} color={Colors.primary} />
          <Text style={styles.addNewText}>ADD NEW</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Footer Area */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>$96</Text>
        </View>
        <AppButton title="PAY & CONFIRM" onPress={() => navigation.navigate('PaymentSuccess')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingBottom: 40 },
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
  
  methodScroll: { marginVertical: 24 },
  methodScrollContent: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 12, gap: 16 },
  methodWrapper: { alignItems: 'center', gap: 10 },
  methodCard: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#F6F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  methodCardActive: { borderColor: Colors.primary, backgroundColor: Colors.white },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
    zIndex: 10,
    elevation: 5,
  },
  methodName: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },

  cardInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F8FA',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 20,
  },
  cardInfoLeft: {},
  cardInfoTitle: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: 8 },
  cardNumberContainer: { flexDirection: 'row', alignItems: 'center' },
  cardNumber: { fontSize: 14, color: Colors.textSecondary, letterSpacing: 1 },

  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderStyle: 'solid',
    gap: 8,
  },
  addNewText: { fontSize: 14, fontWeight: 'bold', color: Colors.primary },

  footer: { paddingHorizontal: 24, paddingBottom: 20, paddingTop: 16 },
  totalRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12, marginBottom: 16 },
  totalLabel: { fontSize: 14, color: Colors.textSecondary, fontWeight: '600', letterSpacing: 1 },
  totalValue: { fontSize: 32, color: Colors.text, fontWeight: 'bold' },
});
