import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';
import { AuthHeader } from '../components/AuthHeader';

export default function VerificationScreen({ navigation }: any) {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Verification" 
        subtitle={
          <Text style={{ fontSize: 14, color: Colors.white, opacity: 0.8, marginTop: 8, textAlign: 'center', lineHeight: 22 }}>
            We have sent a code to your email{'\n'}
            <Text style={{ fontWeight: 'bold', color: Colors.white }}>example@gmail.com</Text>
          </Text>
        }
        onBack={() => navigation.goBack()} 
      />
      
      <View style={styles.content}>
        <View style={styles.codeHeaderRow}>
          <Text style={styles.codeLabel}>CODE</Text>
          <View style={styles.resendRow}>
            <TouchableOpacity>
              <Text style={styles.resendLink}>Resend</Text>
            </TouchableOpacity>
            <Text style={styles.timerText}> in 50sec</Text>
          </View>
        </View>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        <AppButton title="VERIFY" onPress={() => navigation.navigate('Location')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 24,
    marginTop: -20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 65,
    height: 65,
    borderRadius: 12,
    backgroundColor: '#F0F5FA',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  codeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  codeLabel: {
    fontSize: 13,
    color: '#8A8A9D',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendLink: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 14,
    color: '#8A8A9D',
  },
});
