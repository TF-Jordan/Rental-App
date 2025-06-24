// app/tabs/StaffScreen.tsx
import React, { useState } from 'react';
import {View, Text, StyleSheet, ScrollView, Animated, StatusBar, TouchableOpacity} from 'react-native';
import PageHeader from "@/components/General/PageView/PageHeader";
import GeneralView from '@/components/statf/GeneralView';
import StatisticsView from '@/components/statf/StatisticsView';
import usePageAnimation from "@/hooks/usePageAnimation";
import {Entypo, Feather, Ionicons} from "@expo/vector-icons";
import AddPersonnalModal from "@/components/statf/AddForm/AddPersonalModal";
import {router, Stack} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import TabSelector from "@/components/General/TabSelector";
import {Colors} from "@/utils/colors";

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
        <>
            <GeneralView/>
        </>
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
          <Stack.Screen
              options={{
                  headerShown: false,      // Affiche jus// @ts-ignorete la barre avec bouton retour
                  headerBackTitle: 'Back', // Texte personnalisé
                  headerTransparent: true, // Style optionnel
              }}
          />
          <LinearGradient
              colors={['#066AFF', '#0CB4FF']}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
          >
              <StatusBar barStyle="light-content" backgroundColor="#066AFF" />
              <View style={styles.titleContainer}>
                  <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                          style={styles.backButton}
                          onPress={() => router.back()}
                      >
                          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                      </TouchableOpacity>
                      <Text style={styles.title}>Staff</Text>
                  </View>
                  <Text style={styles.subtitle}>
                      Gestion du Staff
                  </Text>
              </View>
          </LinearGradient>
          <TabSelector
              titre1={tabs[0].title}
              titre2={tabs[1].title}
              icon1={React.cloneElement(tabs[0].icon as React.ReactElement, {
                  // @ts-ignore
                  color: activeTab === tabs[0].key ? Colors.primary : '#64748B'
              })}

              icon2={React.cloneElement(tabs[1].icon as React.ReactElement, {
                  // @ts-ignore
                  color: activeTab === tabs[1].key ? Colors.primary : '#64748B'
              })}
              // @ts-ignore
              activeTab={activeTab}
              // @ts-ignore
              setActiveTab={setActiveTab}
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
    headerContainer: {
        marginBottom: 8,
    },
  generalContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  statsContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
    headerGradient: {
        paddingTop: StatusBar.currentHeight || 0,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
  sectionHeader: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
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

    titleContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
        marginLeft:8
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        marginLeft:45
    },
});