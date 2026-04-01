import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/theme/colors';
import { AppButton } from '@/components/AppButton';

const ORDER_STATES = [
  { id: 'placed', title: 'Order Placed', time: '12:05 PM', icon: 'receipt-outline' },
  { id: 'preparing', title: 'Chef is cooking', time: '12:10 PM', icon: 'restaurant-outline' },
  { id: 'delivering', title: 'Out for Delivery', time: 'Pending...', icon: 'bicycle-outline' },
  { id: 'delivered', title: 'Delivered', time: 'Pending...', icon: 'home-outline' },
];

export default function OrderTrackerScreen({ navigation }: any) {
  // Simulate state machine progression for demonstration
  // 0 = Placed
  // 1 = Preparing (Current)
  // 2 = Out for Delivery
  // 3 = Delivered
  const [currentStateIndex, setCurrentStateIndex] = useState(1); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Estimated Time Header */}
        <View style={styles.etaContainer}>
          <Text style={styles.etaLabel}>Estimated Delivery</Text>
          <Text style={styles.etaTime}>12:45 PM</Text>
        </View>

        {/* Hero Graphic / Map Placeholder */}
        <View style={styles.mapGraphic}>
           <MaterialCommunityIcons name="moped-electric-outline" size={80} color={Colors.primary} style={{marginBottom: 8}} />
           <Text style={styles.heroText}>Your food is being prepared!</Text>
        </View>

        {/* Timeline State Machine */}
        <View style={styles.timelineContainer}>
          {ORDER_STATES.map((step, index) => {
            const isCompleted = index < currentStateIndex;
            const isActive = index === currentStateIndex;
            const isPending = index > currentStateIndex;

            return (
              <View key={step.id} style={styles.timelineStep}>
                
                {/* Visual Connector Line */}
                {index !== ORDER_STATES.length - 1 && (
                  <View style={[styles.timelineLine, isCompleted ? styles.timelineLineCompleted : styles.timelineLinePending]} />
                )}
                
                {/* Visual Node */}
                <View style={[
                  styles.timelineNode, 
                  isCompleted && styles.timelineNodeCompleted,
                  isActive && styles.timelineNodeActive,
                  isPending && styles.timelineNodePending
                ]}>
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={20} color={Colors.white} />
                  ) : (
                    <Ionicons name={step.icon as any} size={20} color={isActive ? Colors.white : '#A0A5BA'} />
                  )}
                </View>

                {/* Text Content */}
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, (isCompleted || isActive) && styles.stepTitleActive]}>{step.title}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>

              </View>
            );
          })}
        </View>

        {/* Driver Profile Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}>
             <Ionicons name="person" size={24} color={Colors.white} />
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Cameron Williamson</Text>
            <Text style={styles.driverRole}>Delivery Partner</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
             <Ionicons name="call" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Home Button */}
        <View style={{ marginTop: 40 }}>
          <AppButton title="BACK TO HOME" onPress={() => navigation.navigate('Home')} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginVertical: 10 },
  iconButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F5FA', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '600', color: Colors.text },
  
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  
  etaContainer: { alignItems: 'center', marginTop: 12, marginBottom: 32 },
  etaLabel: { fontSize: 14, color: Colors.textSecondary, marginBottom: 8, letterSpacing: 0.5 },
  etaTime: { fontSize: 36, fontWeight: 'bold', color: Colors.text },
  
  mapGraphic: { backgroundColor: '#FFF0E6', borderRadius: 32, padding: 32, alignItems: 'center', marginBottom: 40 },
  heroText: { fontSize: 16, fontWeight: 'bold', color: Colors.primary, marginTop: 12 },

  timelineContainer: { paddingLeft: 10, paddingBottom: 10 },
  timelineStep: { flexDirection: 'row', marginBottom: 40, position: 'relative' },
  timelineLine: { position: 'absolute', left: 23, top: 48, width: 2, height: 40, zIndex: -1 },
  timelineLineCompleted: { backgroundColor: '#00E58F' }, // Vibrant Green
  timelineLinePending: { backgroundColor: '#F0F5FA' }, // Light Grey
  
  timelineNode: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  timelineNodeCompleted: { backgroundColor: '#00E58F' },
  timelineNodeActive: { backgroundColor: Colors.primary, borderWidth: 6, borderColor: '#FFE4CA' },
  timelineNodePending: { backgroundColor: '#F6F8FA' },
  
  stepContent: { flex: 1, justifyContent: 'center' },
  stepTitle: { fontSize: 16, fontWeight: '600', color: '#A0A5BA', marginBottom: 6 },
  stepTitleActive: { color: Colors.text, fontWeight: 'bold' },
  stepTime: { fontSize: 14, color: '#A0A5BA', fontWeight: '500' },
  
  driverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6F8FA', borderRadius: 24, padding: 16, marginTop: 10 },
  driverAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#A0A5BA', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
  driverRole: { fontSize: 14, color: Colors.textSecondary },
  callButton: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#00E58F', justifyContent: 'center', alignItems: 'center' },
});
