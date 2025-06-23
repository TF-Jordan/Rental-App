//Montre l'évolution du nombre d'employés mois par mois
// Pic en Mai : 8 employés (gros recrutements)
// Creux en Janvier/Avril : 4 employés (départs)
// Tendance saisonnière : Septembre = rentrée, recrutements
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// GRAPHIQUE 4 : EVOLUTION DES EFFECTIFS SUR 12 MOIS
// Montre l'évolution du nombre d'employés mois par mois (Jan à Déc)
// Utile pour : voir la croissance/décroissance, identifier les pics de recrutement

// Données mensuelles (nombre d'employés par mois)
const monthlyData = [
  { month: 'Jan', count: 4, height: 40 },   // Janvier : 4 employés
  { month: 'Fév', count: 5, height: 45 },   // Février : 5 employés  
  { month: 'Mar', count: 5, height: 50 },   // Mars : 5 employés
  { month: 'Avr', count: 4, height: 45 },   // Avril : 4 employés (départ)
  { month: 'Mai', count: 8, height: 80 },   // Mai : 8 employés (recrutements++)
  { month: 'Jun', count: 7, height: 65 },   // Juin : 7 employés
  { month: 'Jul', count: 6, height: 55 },   // Juillet : 6 employés
  { month: 'Aoû', count: 5, height: 50 },   // Août : 5 employés
  { month: 'Sep', count: 7, height: 70 },   // Septembre : 7 employés (rentrée)
  { month: 'Oct', count: 6, height: 60 },   // Octobre : 6 employés
  { month: 'Nov', count: 7, height: 65 },   // Novembre : 7 employés
  { month: 'Déc', count: 6, height: 55 },   // Décembre : 6 employés
];

const EvolutionChart = () => {
  return (
    <View style={styles.container}>
      {/* TITRE DU GRAPHIQUE */}
      <Text style={styles.chartTitle}>Évolution des effectifs</Text>
      
      {/* GRAPHIQUE EN BARRES VERTICALES */}
      <View style={styles.chartContainer}>
        {monthlyData.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            {/* BARRE : Plus haute = plus d'employés ce mois-là */}
            <View 
              style={[
                styles.bar, 
                { height: `${item.height}%` }  // Hauteur proportionnelle
              ]} 
            />
            {/* LABEL DU MOIS en bas */}
            <Text style={styles.barLabel}>{item.month}</Text>
          </View>
        ))}
      </View>
      
      {/* RÉSUMÉ EN BAS */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          {/* icon pour les pics */}
          <MaterialIcons name="trending-up" size={14} color="#10B981" />
          <Text style={styles.summaryText}> Pic en Mai (8 employés) • </Text>
          <MaterialIcons name="trending-down" size={14} color="#EF4444" />
          <Text style={styles.summaryText}> Creux en Jan/Avr (4 employés)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // CONTENEUR PRINCIPAL (même style que les autres graphiques)
  container: {
    backgroundColor: '#FFFFFF',      // Fond blanc
    borderRadius: 12,               // Coins arrondis
    padding: 20,                    // Espacement intérieur
    marginBottom: 16,               // Espacement avec le graphique suivant
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
  
  // CONTENEUR DE CHAQUE BARRE + LABEL
  barContainer: {
    alignItems: 'center',           // Centré
    flex: 1,                        // Prend l'espace disponible
    maxWidth: 25,                   // Largeur max pour éviter débordement
  },
  
  // BARRE INDIVIDUELLE
  bar: {
    backgroundColor: '#3B82F6',      // Bleu (même couleur que vos autres graphiques)
    width: 18,                      // Largeur de la barre
    borderRadius: 2,                // Coins légèrement arrondis
    marginBottom: 8,                // Espacement avec le label
  },
  
  // LABEL DU MOIS (Jan, Fév, etc.)
  barLabel: {
    fontSize: 8,                    // Petit texte
    color: '#6B7280',               // Gris
    textAlign: 'center',            // Centré
    transform: [{ rotate: '-45deg' }], // Incliné pour gagner de la place
  },
  
  // RÉSUMÉ EN BAS
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
  },
  
  summaryText: {
    fontSize: 11,                   // Petit texte
    color: '#6B7280',               // Gris
    fontStyle: 'italic',            // Italique
  },
});

// EXPORT : Utilisé dans StatisticsView.tsx
export default EvolutionChart;