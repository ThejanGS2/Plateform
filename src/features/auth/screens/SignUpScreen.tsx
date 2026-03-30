import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/theme/colors';
import { AppInput } from '@/components/AppInput';
import { AppButton } from '@/components/AppButton';
import { AuthHeader } from '../components/AuthHeader';

export default function SignUpScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AuthHeader 
        title="Sign Up" 
        subtitle="Please sign up to get started" 
        onBack={() => navigation.goBack()} 
      />
      
      <View style={styles.form}>
        <AppInput 
          label="NAME" 
          placeholder="John Doe" 
          value={name} 
          onChangeText={setName} 
        />
        <AppInput 
          label="EMAIL" 
          placeholder="example@gmail.com" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address"
        />
        <AppInput 
          label="PASSWORD" 
          placeholder="********" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry
        />
        <AppInput 
          label="RE-TYPE PASSWORD" 
          placeholder="********" 
          value={retypePassword} 
          onChangeText={setRetypePassword} 
          secureTextEntry
        />

        <AppButton 
          title="SIGN UP" 
          onPress={() => navigation.navigate('Verification')} 
          style={{ marginTop: 24 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flexGrow: 1,
  },
  form: {
    padding: 24,
    marginTop: -20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
