import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { useStore } from '@/store/useStore';

const ORANGE = '#FF7A28';
const NAVY = '#1C1C2E';
const LIGHT_BG = '#F2F3F7';
const WHITE = '#FFFFFF';
const GREY_TEXT = '#9E9E9E';

const W = Dimensions.get('window').width;
const CHART_W = W - 48;
const CHART_H = 120;

// ── Revenue chart data (normalised to chart height) ──────────────────────────
const RAW = [30, 80, 55, 90, 60, 95, 110]; // $ hundreds
const MAX_VAL = Math.max(...RAW);
const TIMES = ['10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'];

function buildChartPath(data: number[], w: number, h: number) {
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => ({
    x: i * step,
    y: h - (v / MAX_VAL) * (h - 20),
  }));

  // Smooth bezier path
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1].x + pts[i].x) / 2;
    d += ` C ${cx} ${pts[i - 1].y}, ${cx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
  }
  return { d, pts };
}

// ── Popular dish image placeholders (online thumbnails) ──────────────────────
const POPULAR = [
  {
    name: 'Butter Chicken',
    uri: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&q=80',
    orders: 42,
  },
  {
    name: 'Spring Rolls',
    uri: 'https://images.unsplash.com/photo-1548869190-2a99cf3b5a16?w=300&q=80',
    orders: 36,
  },
];

// ── Tab icons ─────────────────────────────────────────────────────────────────
const TABS = [
  { icon: 'grid-outline', label: 'Dashboard' },
  { icon: 'list-outline', label: 'Orders' },
  { icon: 'add-circle', label: '', fab: true },
  { icon: 'notifications-outline', label: 'Alerts' },
  { icon: 'person-outline', label: 'Profile' },
];

export default function ChefHomeScreen({ navigation }: any) {
  const { user, logout } = useStore();
  const [activeTab, setActiveTab] = useState(0);
  const [revenueRange, setRevenueRange] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [tooltipIdx, setTooltipIdx] = useState<number | null>(2); // show tooltip on 12PM by default

  const { d: chartPath, pts } = buildChartPath(RAW, CHART_W, CHART_H);

  // Filled area path
  const areaPath =
    chartPath +
    ` L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`;

  const tooltipPt = tooltipIdx !== null ? pts[tooltipIdx] : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_BG} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="menu-outline" size={24} color={NAVY} />
        </TouchableOpacity>

        <View style={styles.locationRow}>
          <Text style={styles.locationLabel}>LOCATION</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={styles.locationName}>
              {user?.fullName ?? 'Chef Kitchen'}
            </Text>
            <Ionicons name="chevron-down" size={14} color={NAVY} />
          </View>
        </View>

        <TouchableOpacity onPress={logout} style={styles.avatarWrap}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Stats Row ──────────────────────────────────────────────────── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>RUNNING ORDERS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>05</Text>
            <Text style={styles.statLabel}>ORDER REQUEST</Text>
          </View>
        </View>

        {/* ── Revenue Chart ──────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.revenueHeader}>
            <View>
              <Text style={styles.revenueTitle}>Total Revenue</Text>
              <Text style={styles.revenueAmount}>$2,241</Text>
            </View>
            <View style={styles.revenueRight}>
              {/* Range selector */}
              <TouchableOpacity style={styles.rangePicker}>
                <Text style={styles.rangeText}>{revenueRange}</Text>
                <Ionicons name="chevron-down" size={12} color={NAVY} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.seeDetails}>See Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* SVG Chart */}
          <View style={{ marginTop: 12 }}>
            <Svg width={CHART_W} height={CHART_H + 8}>
              <Defs>
                <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={ORANGE} stopOpacity="0.25" />
                  <Stop offset="100%" stopColor={ORANGE} stopOpacity="0.01" />
                </LinearGradient>
              </Defs>

              {/* Filled area */}
              <Path d={areaPath} fill="url(#areaGrad)" />

              {/* Line */}
              <Path
                d={chartPath}
                stroke={ORANGE}
                strokeWidth={2.5}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Tooltip dot + label */}
              {tooltipPt && (
                <>
                  <Circle
                    cx={tooltipPt.x}
                    cy={tooltipPt.y}
                    r={6}
                    fill={WHITE}
                    stroke={ORANGE}
                    strokeWidth={2}
                  />
                  {/* Tooltip box rendered via View because SVG foreignObject isn't well-supported */}
                </>
              )}
            </Svg>

            {/* Tooltip box (absolute overlay) */}
            {tooltipPt && (
              <View
                style={[
                  styles.tooltip,
                  {
                    left: tooltipPt.x - 28,
                    top: tooltipPt.y - 44,
                  },
                ]}
              >
                <Text style={styles.tooltipText}>
                  ${RAW[tooltipIdx!] * 5}
                </Text>
              </View>
            )}

            {/* X-axis labels */}
            <View style={styles.xAxis}>
              {TIMES.map((t, i) => (
                <Text key={i} style={styles.xLabel}>
                  {t}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* ── Reviews ────────────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All Reviews</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewRow}>
            <Ionicons name="star" size={22} color="#FFB800" />
            <Text style={styles.ratingNum}>4.9</Text>
            <Text style={styles.ratingMeta}>  Total 20 Reviews</Text>
          </View>
        </View>

        {/* ── Popular Items ───────────────────────────────────────────────── */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Popular Items This Week</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.popularGrid}>
            {POPULAR.map((item, i) => (
              <View key={i} style={styles.popularCard}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.popularImage}
                  resizeMode="cover"
                />
                <View style={styles.popularOverlay}>
                  <Text style={styles.popularName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.popularOrders}>{item.orders} orders</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Bottom Navigation Bar ──────────────────────────────────────── */}
      <View style={styles.navbar}>
        {TABS.map((tab, i) => {
          if (tab.fab) {
            return (
              <TouchableOpacity key={i} style={styles.fabBtn} onPress={() => navigation?.navigate?.('ChefAddItem')}>
                <Ionicons name="add" size={28} color={WHITE} />
              </TouchableOpacity>
            );
          }
          const isActive = activeTab === i;
          const screens = ['ChefHome', 'ChefOrders', '', 'ChefNotifications', 'ChefFoodList'];
          return (
            <TouchableOpacity
              key={i}
              style={styles.navItem}
              onPress={() => {
                setActiveTab(i);
                const dest = screens[i];
                if (dest && dest !== 'ChefHome') navigation?.navigate?.(dest);
              }}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={isActive ? ORANGE : GREY_TEXT}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: LIGHT_BG },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: LIGHT_BG,
  },
  menuBtn: { padding: 4 },
  locationRow: { flex: 1, alignItems: 'center' },
  locationLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: ORANGE,
    letterSpacing: 1.2,
  },
  locationName: { fontSize: 14, fontWeight: '700', color: NAVY },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: { width: 40, height: 40 },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },

  // Stats
  statsRow: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  statNumber: {
    fontSize: 38,
    fontWeight: '800',
    color: NAVY,
    lineHeight: 44,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: GREY_TEXT,
    letterSpacing: 0.8,
    marginTop: 4,
  },

  // Generic card
  card: {
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  // Revenue
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  revenueTitle: { fontSize: 12, color: GREY_TEXT, fontWeight: '500' },
  revenueAmount: { fontSize: 24, fontWeight: '800', color: NAVY, marginTop: 2 },
  revenueRight: { alignItems: 'flex-end', gap: 6 },
  rangePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_BG,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  rangeText: { fontSize: 12, color: NAVY, fontWeight: '600' },
  seeDetails: { fontSize: 12, color: ORANGE, fontWeight: '600' },

  // Tooltip
  tooltip: {
    position: 'absolute',
    backgroundColor: NAVY,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 56,
    alignItems: 'center',
  },
  tooltipText: { color: WHITE, fontSize: 13, fontWeight: '700' },

  // X-axis
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  xLabel: { fontSize: 10, color: GREY_TEXT },

  // Section helpers
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: NAVY },
  seeAll: { fontSize: 13, color: ORANGE, fontWeight: '600' },

  // Reviews
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingNum: { fontSize: 22, fontWeight: '800', color: NAVY },
  ratingMeta: { fontSize: 13, color: GREY_TEXT },

  // Popular items
  popularGrid: { flexDirection: 'row', gap: 12 },
  popularCard: {
    flex: 1,
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: LIGHT_BG,
  },
  popularImage: { width: '100%', height: '100%' },
  popularOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  popularName: { color: WHITE, fontWeight: '700', fontSize: 11 },
  popularOrders: { color: 'rgba(255,255,255,0.8)', fontSize: 10, marginTop: 1 },

  // Bottom nav
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
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
    paddingHorizontal: 10,
  },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  fabBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: ORANGE,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 16,
  },
});
