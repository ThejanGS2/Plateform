import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';

export default function LocationScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <Image 
          source={require('@/assets/images/map_location.png')} 
          style={styles.mapImage} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>ACCESS LOCATION</Text>
          <View style={styles.iconCircle}>
            <Ionicons name="location-outline" size={16} color={Colors.white} />
          </View>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          DFOOD WILL ACCESS YOUR LOCATION{'\n'}ONLY WHILE USING THE APP
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 300,
  },
  footer: {
    paddingBottom: 40,
  },
  button: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconCircle: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#8A8A9D',
    fontSize: 12,
    marginTop: 20,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
});
