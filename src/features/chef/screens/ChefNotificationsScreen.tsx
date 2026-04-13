import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ORANGE = '#FF7A28';
const NAVY = '#1C1C2E';
const WHITE = '#FFFFFF';
const GREY = '#9E9E9E';
const BG = '#F9F9F9';

interface NotifItem {
  id: string;
  avatar: string;
  foodThumb: string;
  userName: string;
  action: string;
  time: string;
}

const NOTIFICATIONS: NotifItem[] = [
  {
    id: '1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    foodThumb: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=80&q=80',
    userName: 'Tanbir Ahmed',
    action: 'Placed a new order',
    time: '20 min ago',
  },
  {
    id: '2',
    avatar: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=80&q=80',
    foodThumb: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=80',
    userName: 'Salim Smith',
    action: 'left a 5 star review',
    time: '20 min ago',
  },
  {
    id: '3',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=80&q=80',
    foodThumb: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=80&q=80',
    userName: 'Royal Bengal',
    action: 'agreed to cancel',
    time: '20 min ago',
  },
  {
    id: '4',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&q=80',
    foodThumb: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=80&q=80',
    userName: 'Pabel Vuiya',
    action: 'Placed a new order',
    time: '20 min ago',
  },
];

const MESSAGES: NotifItem[] = [
  {
    id: 'm1',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    foodThumb: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=80&q=80',
    userName: 'Sara Khan',
    action: 'Is my order ready yet?',
    time: '5 min ago',
  },
  {
    id: 'm2',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=80&q=80',
    foodThumb: 'https://images.unsplash.com/photo-1548869190-2a99cf3b5a16?w=80&q=80',
    userName: 'James Riley',
    action: 'Can you add less spice please?',
    time: '12 min ago',
  },
  {
    id: 'm3',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80',
    foodThumb: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=80&q=80',
    userName: 'Nina Patel',
    action: 'Thank you for the quick prep!',
    time: '25 min ago',
  },
];

type TabType = 'Notifications' | 'Messages';

export default function ChefNotificationsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<TabType>('Notifications');

  const data = activeTab === 'Notifications' ? NOTIFICATIONS : MESSAGES;

  const renderItem = ({ item }: { item: NotifItem }) => (
    <View style={styles.notifRow}>
      <Image source={{ uri: item.avatar }} style={styles.notifAvatar} />
      <View style={styles.notifContent}>
        <Text style={styles.notifText} numberOfLines={2}>
          <Text style={styles.notifName}>{item.userName} </Text>
          {item.action}
        </Text>
        <Text style={styles.notifTime}>{item.time}</Text>
      </View>
      <Image source={{ uri: item.foodThumb }} style={styles.notifThumb} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Ionicons name="chevron-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['Notifications', 'Messages'] as TabType[]).map((tab) => {
          const active = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab === 'Messages' ? 'Messages (3)' : tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Nav */}
      <View style={styles.navbar}>
        {[
          { icon: 'grid-outline', screen: 'ChefHome' },
          { icon: 'list-outline', screen: 'ChefOrders' },
          { icon: 'fast-food-outline', screen: 'ChefFoodList' },
          { icon: 'notifications-outline', screen: 'ChefNotifications', active: true },
        ].map((tab: any, i) => (
          <TouchableOpacity
            key={i}
            style={styles.navItem}
            onPress={() => navigation?.navigate?.(tab.screen)}
          >
            <Ionicons name={tab.icon} size={24} color={tab.active ? ORANGE : GREY} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: WHITE,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: NAVY },

  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingHorizontal: 20,
  },
  tab: {
    paddingBottom: 12,
    paddingHorizontal: 4,
    marginRight: 24,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: ORANGE,
  },
  tabText: { fontSize: 14, color: GREY, fontWeight: '500' },
  tabTextActive: { color: ORANGE, fontWeight: '700' },

  list: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },

  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    gap: 12,
  },
  notifAvatar: { width: 46, height: 46, borderRadius: 23 },
  notifContent: { flex: 1 },
  notifText: { fontSize: 13, color: NAVY, lineHeight: 19 },
  notifName: { fontWeight: '700', color: NAVY },
  notifTime: { fontSize: 11, color: GREY, marginTop: 4 },
  notifThumb: { width: 46, height: 46, borderRadius: 10 },

  navbar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 64,
    backgroundColor: WHITE,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
    paddingHorizontal: 10,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
});
