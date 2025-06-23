//repartition par département  le bouton switch pour basculer entre les vues cartes et donut

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Type pour les données de département
type DepartmentData = {
  name: string;
  count: number;
  percentage: number;
  colors: [string, string];
};

// Données exemple
const departmentData: DepartmentData[] = [
  { name: 'Marketing', count: 2, percentage: 20.0, colors: ['#3B82F6', '#1D4ED8'] },
  { name: 'Technique', count: 2, percentage: 20.0, colors: ['#10B981', '#047857'] },
  { name: 'Création', count: 1, percentage: 10.0, colors: ['#F59E0B', '#D97706'] },
  { name: 'Finance', count: 1, percentage: 10.0, colors: ['#EF4444', '#DC2626'] },
  { name: 'Ressources Humaines', count: 1, percentage: 10.0, colors: ['#8B5CF6', '#7C3AED'] },
  { name: 'Opérations', count: 1, percentage: 10.0, colors: ['#06B6D4', '#0891B2'] },
  { name: 'Ventes', count: 1, percentage: 10.0, colors: ['#84CC16', '#65A30D'] },
  { name: 'Administration', count: 1, percentage: 10.0, colors: ['#F97316', '#EA580C'] },
];

const ModernDepartmentChart = () => {
  const [showDonut, setShowDonut] = useState(false);

  const renderCardsView = () => (
    <View style={styles.cardsGrid}>
      {departmentData.map((dept, index) => (
        <LinearGradient
          key={index}
          colors={dept.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.deptCard}
        >
          <View style={styles.decorativeCircle} />
          <Text style={styles.deptName}>{dept.name}</Text>
          <View style={styles.deptStats}>
            <Text style={styles.deptCount}>{dept.count}</Text>
            <Text style={styles.deptPercent}>{dept.percentage.toFixed(1)}%</Text>
          </View>
        </LinearGradient>
      ))}
    </View>
  );

  const renderDonutView = () => (
    <View style={styles.donutContainer}>
      {/* Donut Chart simulé avec des barres concentriques */}
      <View style={styles.donutChart}>
        <View style={styles.donutCenter}>
          <Text style={styles.donutTotal}>10</Text>
          <Text style={styles.donutLabel}>employés</Text>
        </View>
        
        {/* Segments colorés autour */}
        {departmentData.map((dept, index) => (
          <View
            key={index}
            style={[
              styles.donutSegment,
              {
                backgroundColor: dept.colors[0],
                transform: [{ rotate: `${index * 45}deg` }],
              }
            ]}
          />
        ))}
      </View>

      {/* Légende à côté */}
      <View style={styles.legendGrid}>
        {departmentData.map((dept, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: dept.colors[0] }]} />
            <Text style={styles.legendText}>{dept.name} ({dept.count})</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.chartTitle}>Répartition par département</Text>
        
        {/* Bouton de switch */}
        <TouchableOpacity 
          style={styles.switchButton}
          onPress={() => setShowDonut(!showDonut)}
        >
          <Text style={styles.switchText}>
            <Ionicons name={showDonut ? "apps" : "pie-chart"} size={12} color="#FFFFFF" />
            {showDonut ? ' Cartes' : ' Donut'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Vue conditionnelle  // Si showDonut = true → affiche renderDonutView()
// Si showDonut = false → affiche renderCardsView()*/}
      
      {showDonut ? renderDonutView() : renderCardsView()}
      
      {/* Résumé */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total : {departmentData.reduce((sum, dept) => sum + dept.count, 0)} employés 
          répartis sur {departmentData.length} départements
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  switchButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  switchText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  
  // Vue cartes
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  deptCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    minHeight: 80,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  decorativeCircle: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  deptName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    zIndex: 2,
    lineHeight: 14,
  },
  deptStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  deptCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deptPercent: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  
  // Vue donut
  donutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  donutChart: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    position: 'relative',
    marginRight: 20,
  },
  donutCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -20 }],
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  donutLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  donutSegment: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 2,
    top: 10,
    left: 42,
  },
  legendGrid: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#6B7280',
    flex: 1,
  },
  
  // Résumé
  summaryContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  summaryText: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ModernDepartmentChart;