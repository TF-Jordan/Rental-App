//vue statiques complete
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import KPICard from './KPICard';
import AgeDistributionChart from './AgeDistributionChart';
import GenderRatioChart from './GenderRatioChart';
import ModernDepartmentChart from './ModernDepartmentChart';
import EvolutionChart from './EvolutionChart';
import SalaryDistributionChart from './SalaryDistributionChart';

const StatisticsView = () => (
  <ScrollView style={styles.container}>
    {/* Titre et description de la section statistiques */}
    <View style={styles.headerSection}>
      <Text style={styles.sectionTitle}>
        <Ionicons name="bar-chart" size={16} color="#3B82F6" /> Statistiques du Personnel
      </Text>
      <Text style={styles.sectionDescription}>
        Analyse détaillée des données relatives au personnel.
      </Text>
    </View>
    
    {/* KPI Cards */}
    <View style={styles.kpiContainer}>
      {/* KPI 1 - Effectif total */}
      <KPICard
        title="Effectif total"
        value="10"
        change="+2.5% depuis le mois dernier"
        isPositive={true}
      />
      
      {/* KPI 2 - Salaire moyen */}
      <KPICard
        title="Salaire moyen"
        value="50 400 XAF"
        change="+1.8% depuis le dernier trimestre"
        isPositive={true}
      />
      
      {/* KPI 3 - Ancienneté moyenne */}
      <KPICard
        title="Ancienneté moyenne"
        value="2.7 ans"
        change="Stable depuis 6 mois"
        isPositive={undefined} // Neutre (gris)
      />
      
      {/* KPI 4 - Taux de rétention */}
      <KPICard
        title="Taux de rétention"
        value="92%"
        change="+4% par rapport à l'année dernière"
        isPositive={true}
      />
    </View>

    {/* NOUVEAU : Graphique de distribution des âges */}
    <AgeDistributionChart />

    {/* 2ème graphique : Ratio hommes/femmes */}
    <GenderRatioChart />

    {/* 3ème graphique : Répartition par département (VERSION STYLÉE) */}
    <ModernDepartmentChart />

    {/* 4ème graphique : Évolution des effectifs sur 12 mois */}
    <EvolutionChart />

    {/* 5ème graphique : Distribution des salaires */}
    <SalaryDistributionChart />
    
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  kpiContainer: {
    paddingBottom: 20,  // Espace en bas pour le scroll
  },
});

export default StatisticsView;