import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';

export default function PersonalInfoScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Avatar Area */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
              <TouchableOpacity style={styles.editBadge}>
                <Ionicons name="pencil" size={14} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput style={styles.input} defaultValue="Vishal Khadok" placeholderTextColor={Colors.textSecondary} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput style={styles.input} defaultValue="hello@halallab.co" keyboardType="email-address" autoCapitalize="none" placeholderTextColor={Colors.textSecondary} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <TextInput style={styles.input} defaultValue="408-841-0926" keyboardType="phone-pad" placeholderTextColor={Colors.textSecondary} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>BIO</Text>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                defaultValue="I love fast food" 
                multiline 
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor={Colors.textSecondary} 
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <AppButton title="SAVE" onPress={() => navigation.goBack()} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
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
  avatarContainer: { alignItems: 'center', marginTop: 24, marginBottom: 32 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  form: { flex: 1 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 8, letterSpacing: 0.5 },
  input: {
    backgroundColor: '#F6F8FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: { minHeight: 100, paddingTop: 16 },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 16 },
});
