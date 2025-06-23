//cartes  statistiques et les  mini 1er cartes dans la page statistiques
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Props du composant KPICard
interface KPICardProps {
  title: string;          // Titre de la métrique (ex: "Effectif total")
  value: string;          // Valeur principale (ex: "10", "50 400 XAF")
  change: string;         // Texte d'évolution (ex: "+2.5% depuis le mois dernier")
  isPositive?: boolean;   // true = vert, false = rouge, undefined = gris
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isPositive
}) => {
  
  // Fonction pour déterminer la couleur du texte d'évolution
  const getChangeColor = () => {
    if (isPositive === true) return '#10B981';  // Vert
    if (isPositive === false) return '#EF4444'; // Rouge
    return '#6B7280';                           // Gris neutre
  };

  return (
    <View style={styles.container}>
      {/* Titre de la métrique */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Valeur principale (gros chiffre) */}
      <Text style={styles.value}>{value}</Text>
      
      {/* Texte d'évolution */}
      <Text style={[styles.change, { color: getChangeColor() }]}>
        {change}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',     // Fond blanc
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    // Ombre légère
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 12,
    color: '#6B7280',              // Gris
    marginBottom: 8,
  },
  value: {
    fontSize: 28,                  // Gros chiffre
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  change: {
    fontSize: 11,
    // Couleur dynamique selon isPositive
  },
});

export default KPICard;