// app/tabs/StaffScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import PageHeader from "@/components/General/PageView/PageHeader";
import GeneralView from '@/components/statf/GeneralView';
import StatisticsView from '@/components/statf/StatisticsView';
import usePageAnimation from "@/hooks/usePageAnimation";
import { Entypo, Feather } from "@expo/vector-icons";
import AddPersonnalModal from "@/components/statf/AddForm/AddPersonalModal";

export default function StaffScreen() {
  const [activeTab, setActiveTab] = useState('general');
  const { getAnimatedStyle } = usePageAnimation();

  // Configuration des tabs
  const tabs = [
    {
      key: 'general',
      title: 'Vue Générale',
      icon: <Entypo name="grid" size={16} />
    },
    {
      key: 'stats',
      title: 'Statistiques',
      icon: <Feather name="bar-chart-2" size={16} />
    }
  ];

  const renderGeneralView = () => (
      <Animated.View
          style={[
            styles.generalContainer,
            getAnimatedStyle()
          ]}
      >
        <GeneralView />
          <AddPersonnalModal/>
      </Animated.View>
  );

  const renderStatsView = () => (
      <Animated.View
          style={[
            styles.statsContainer,
            getAnimatedStyle()
          ]}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Analyse détaillée</Text>
          <Text style={styles.sectionSubtitle}>Statistiques du personnel</Text>
        </View>

        <StatisticsView />
      </Animated.View>
  );

  return (
      <View style={styles.mainContainer}>
        {/* Header Section */}
        <PageHeader
            logo="EASY-RENT"
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            animatedStyle={getAnimatedStyle()}
        />

        {/* Content Section */}
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'general' && renderGeneralView()}
          {activeTab === 'stats' && renderStatsView()}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  generalContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  statsContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
});