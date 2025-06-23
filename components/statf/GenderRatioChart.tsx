// GenderRatioChart.tsx avec :

// Barres horizontales au lieu d'un donut complexe (plus simple à comprendre)
// Couleurs distinctes : Bleu pour hommes, Rose pour femmes
// Pourcentages clairs : 40% hommes, 60% femmes
// Animation des barres qui se remplissent progressivement
// Résumé en bas : "40% hommes • 60% femmes"

// Pourquoi cette approche :

// Plus lisible qu'un donut chart sur mobile
// Facile à comprendre d'un coup d'œil
// Responsive - s'adapte à toutes les tailles d'écran
// Performance - pas de calculs complexes d'angles

// À quoi ça sert :

// Parité : Vérifier l'équilibre hommes/femmes dans l'équipe
// Diversité : Mesurer les efforts d'inclusion
// Conformité légale : Respecter les quotas de genre si applicable
// Management : Adapter les politiques RH selon la composition

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Type pour les données de genre
type GenderData = {
  male: number;
  female: number;
};

// Données exemple (vous pouvez les remplacer par vos vraies données)
const genderData: GenderData = {
  male: 40, // Pourcentage hommes
  female: 60, // Pourcentage femmes
};

const GenderRatioChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Ratio hommes/femmes</Text>
      
      {/* Version avec barres horizontales - plus simple et claire */}
      <View style={styles.barsContainer}>
        {/* Barre Hommes */}
        <View style={styles.barRow}>
          <View style={styles.barInfo}>
            <View style={styles.labelRow}>
              <View style={[styles.colorDot, styles.maleColor]} />
              <Text style={styles.labelText}>Hommes</Text>
            </View>
            <View style={styles.barBackground}>  
              {/* conteneur gris de fond  <View style={styles.barBackground}>*/}
              <View 
                style={[
                  styles.barFill, //barre colorée
                  styles.maleFill,
                  { width: `${genderData.male}%` }// largeur dynamique
                ]} 
              />
            </View>
          </View>
          <Text style={styles.percentageText}>{genderData.male}%</Text>
        </View>

        {/* Barre Femmes */}
        <View style={styles.barRow}>
          <View style={styles.barInfo}>
            <View style={styles.labelRow}>
              <View style={[styles.colorDot, styles.femaleColor]} />
              <Text style={styles.labelText}>Femmes</Text>
            </View>
            <View style={styles.barBackground}>
              <View 
                style={[
                  styles.barFill, 
                  styles.femaleFill,
                  { width: `${genderData.female}%` }
                ]} 
              />
            </View>
          </View>
          <Text style={styles.percentageText}>{genderData.female}%</Text>
        </View>
      </View>

      {/* Résumé en grand */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          <Text style={styles.maleText}>{genderData.male}% hommes</Text>
          {' • '}
          <Text style={styles.femaleText}>{genderData.female}% femmes</Text>
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
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  barsContainer: {
    marginBottom: 16,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  barInfo: {
    flex: 1,
    marginRight: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  maleColor: {
    backgroundColor: '#3B82F6',
  },
  femaleColor: {
    backgroundColor: '#EC4899',
  },
  labelText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  maleFill: {
    backgroundColor: '#3B82F6',
  },
  femaleFill: {
    backgroundColor: '#EC4899',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    minWidth: 35,
    textAlign: 'right',
  },
  summaryContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  summaryText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6B7280',
  },
  maleText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  femaleText: {
    color: '#EC4899',
    fontWeight: '600',
  },
});

export default GenderRatioChart;