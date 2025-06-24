import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// GRAPHIQUE 5 : DISTRIBUTION DES SALAIRES (DERNIER GRAPHIQUE)
// Montre combien d'employés gagnent dans chaque tranche salariale
// Utile pour : équité salariale, planification budgétaire, benchmarking
// Histogramme salariale : Voir combien d'employés par tranche
// Concentration 30-50K : La majorité de vos employés
// Barres grises : Tranches vides (90K, 100K+)
// Nombres sur barres : Compte exact d'employés
// Insights : Moyenne 50K, concentration 30-50K

// Données par tranche de salaire (en milliers XAF)
const salaryData = [
  { range: '30K', count: 3, height: 85 },    // 3 employés gagnent ~30K XAF
  { range: '40K', count: 2, height: 70 },    // 2 employés gagnent ~40K XAF
  { range: '50K', count: 2, height: 60 },    // 2 employés gagnent ~50K XAF (salaire moyen)
  { range: '60K', count: 1, height: 45 },    // 1 employé gagne ~60K XAF
  { range: '70K', count: 1, height: 35 },    // 1 employé gagne ~70K XAF
  { range: '80K', count: 1, height: 30 },    // 1 employé gagne ~80K XAF
  { range: '90K', count: 0, height: 25 },    // 0 employé à 90K (barre minimale)
  { range: '100K+', count: 0, height: 65 },  // 0 employé à 100K+ (dirigeants futurs)
];

const SalaryDistributionChart = () => {
  // Calculs pour le résumé
  const totalEmployees = salaryData.reduce((sum, item) => sum + item.count, 0);
  const averageSalaryRange = "50K"; // Basé sur votre KPI "50 400 XAF"

  return (
    <View style={styles.container}>
      {/* TITRE DU GRAPHIQUE */}
      <Text style={styles.chartTitle}>Distribution des salaires</Text>
      
      {/* GRAPHIQUE EN BARRES VERTICALES (HISTOGRAMME) */}
      <View style={styles.chartContainer}>
        {salaryData.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            {/* BARRE : Plus haute = plus d'employés dans cette tranche */}
            <View 
              style={[
                styles.bar, 
                { height: `${item.height}%` },
                // Barre grise si 0 employé, bleue sinon
                { backgroundColor: item.count === 0 ? '#E5E7EB' : '#3B82F6' }
              ]} 
            />
            {/* NOMBRE D'EMPLOYÉS au dessus de la barre */}
            {item.count > 0 && (
              <Text style={styles.countLabel}>{item.count}</Text>
            )}
            {/* TRANCHE SALARIALE en bas */}
            <Text style={styles.barLabel}>{item.range}</Text>
          </View>
        ))}
      </View>
      
      {/* INSIGHTS EN BAS */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Ionicons name="wallet" size={12} color="#10B981" />
          <Text style={styles.summaryText}> Moyenne: {averageSalaryRange} XAF • </Text>
          <Ionicons name="people" size={12} color="#3B82F6" />
          <Text style={styles.summaryText}> {totalEmployees} employés • </Text>
          <Ionicons name="bar-chart" size={12} color="#F59E0B" />
          <Text style={styles.summaryText}> Plus forte concentration: 30-50K</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // CONTENEUR PRINCIPAL (cohérent avec les autres graphiques)
  container: {
    backgroundColor: '#FFFFFF',      // Fond blanc
    borderRadius: 12,               // Coins arrondis
    padding: 20,                    // Espacement intérieur
    marginBottom: 16,               // Espacement avec élément suivant
    borderWidth: 1,                 // Bordure fine
    borderColor: '#E5E7EB',         // Couleur bordure grise
  },
  
  // TITRE DU GRAPHIQUE
  chartTitle: {
    fontSize: 14,                   // Taille texte
    fontWeight: '600',              // Gras
    color: '#000000',               // Noir
    marginBottom: 16,               // Espacement en bas
  },
  
  // CONTENEUR DES BARRES
  chartContainer: {
    flexDirection: 'row',           // Barres côte à côte
    alignItems: 'flex-end',         // Alignées en bas
    justifyContent: 'space-between', // Réparties uniformément
    height: 100,                    // Hauteur fixe du graphique
    marginBottom: 16,               // Espacement en bas
  },
  
  // CONTENEUR DE CHAQUE BARRE + LABELS
  barContainer: {
    alignItems: 'center',           // Centré
    flex: 1,                        // Prend l'espace disponible
    maxWidth: 35,                   // Largeur max
    position: 'relative',           // Pour positionner le count
  },
  
  // BARRE INDIVIDUELLE
  bar: {
    width: 24,                      // Largeur de la barre
    borderRadius: 3,                // Coins légèrement arrondis
    marginBottom: 8,                // Espacement avec le label
  },
  
  // NOMBRE D'EMPLOYÉS au dessus de la barre
  countLabel: {
    position: 'absolute',           // Positionnement absolu
    top: -15,                       // Au dessus de la barre
    fontSize: 10,                   // Petit texte
    fontWeight: '600',              // Gras
    color: '#3B82F6',               // Bleu (même couleur que les barres)
  },
  
  // LABEL DE LA TRANCHE SALARIALE (30K, 40K, etc.)
  barLabel: {
    fontSize: 9,                    // Petit texte
    color: '#6B7280',               // Gris
    textAlign: 'center',            // Centré
    fontWeight: '500',              // Semi-gras pour la lisibilité
  },
  
  // RÉSUMÉ/INSIGHTS EN BAS
  summaryContainer: {
    paddingTop: 12,                 // Espacement en haut
    borderTopWidth: 1,              // Ligne de séparation
    borderTopColor: '#F3F4F6',      // Couleur ligne grise
  },
  
  // LIGNE POUR LES ICÔNES + TEXTE
  summaryRow: {
    flexDirection: 'row',           // Icônes et texte en ligne
    alignItems: 'center',           // Alignement vertical
    justifyContent: 'center',       // Centré horizontalement
    flexWrap: 'wrap',               // Permet le retour à la ligne si nécessaire
  },
  
  summaryText: {
    fontSize: 11,                   // Petit texte
    color: '#6B7280',               // Gris
    fontStyle: 'italic',            // Italique
    lineHeight: 16,                 // Hauteur de ligne pour la lisibilité
  },
});

// EXPORT : Utilisé dans StatisticsView.tsx (DERNIÈRE ÉTAPE!)
export default SalaryDistributionChart;