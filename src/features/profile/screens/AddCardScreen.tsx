import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';

export default function AddCardScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Card</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CARD HOLDER NAME</Text>
            <TextInput style={styles.input} defaultValue="Vishal Khadok" placeholderTextColor={Colors.textSecondary} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CARD NUMBER</Text>
            <TextInput style={styles.input} defaultValue="2134  _ _ _ _  _ _ _ _" keyboardType="numeric" placeholderTextColor={Colors.textSecondary} />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
              <Text style={styles.label}>EXPIRE DATE</Text>
              <TextInput style={styles.input} placeholder="mm/yyyy" placeholderTextColor={Colors.textSecondary} />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVC</Text>
              <TextInput style={styles.input} placeholder="***" secureTextEntry keyboardType="numeric" placeholderTextColor={Colors.textSecondary} />
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <AppButton title="ADD & MAKE PAYMENT" onPress={() => navigation.navigate('PaymentMethod')} />
        </View>
      </KeyboardAvoidingView>
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
  
  inputGroup: { marginBottom: 20 },
  row: { flexDirection: 'row' },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8, letterSpacing: 0.5 },
  input: {
    backgroundColor: '#F6F8FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
  },
  
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 16 },
});
