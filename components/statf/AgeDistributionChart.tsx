// Composant réutilisable pour le graphique en barres des âges
// Données dynamiques : vous pouvez facilement changer les valeurs
// Design responsive : s'adapte à votre taille d'écran mobile
// Distribution des âges : Voir si votre équipe est jeune, expérimentée, équilibrée
// Planification RH : Anticiper les départs en retraite, diversité générationnelle
// Management adapté : Adapter votre style selon les génération

//puis on va l'appeller dans le composant StatisticsView.tsx
// Composant réutilisable pour le graphique en barres de distribution des âges

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Type pour les données d'âge
type AgeData = {
  range: string;
  count: number;
  percentage: number;
};

// Données exemple (vous pouvez les remplacer par vos vraies données)
const ageData: AgeData[] = [
  { range: '20-25', count: 3, percentage: 75 },
  { range: '26-30', count: 2, percentage: 60 },
  { range: '31-35', count: 2, percentage: 50 },
  { range: '36-40', count: 1, percentage: 35 },
  { range: '41-45', count: 1, percentage: 40 },
  { range: '46-50', count: 1, percentage: 30 },
  { range: '51-55', count: 0, percentage: 25 },
  { range: '56+', count: 0, percentage: 65 },
];

const AgeDistributionChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Distribution des âges</Text>
      
      <View style={styles.chartContainer}>
        {ageData.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            {/* Barre */}
            <View 
                   style={[
                  styles.bar, 
                  { 
                    height: `${item.percentage}%`,  // ← Virgule ajoutée
                    backgroundColor: item.count === 0 ? '#E5E7EB' : '#3B82F6'  // Gris si 0, bleu sinon
                  }
                ]} 
              />

              {/* Label en bas */}
              <Text style={styles.barLabel}>{item.range}</Text>
          </View>
        ))}
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
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: 16,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 35,
  },
  bar: {
    backgroundColor: '#3B82F6',
    width: 28,
    borderRadius: 4,
    marginBottom: 8,
    // Gradient effect simulé avec une ombre
    shadowColor: '#60A5FA',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  barLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 12,
  },
});

export default AgeDistributionChart;