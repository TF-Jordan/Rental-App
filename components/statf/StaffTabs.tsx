////les deux boutons de   tabs
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Type pour les tabs disponibles
type TabType = 'general' | 'statistics';

// Props du composant
interface StaffTabsProps {
  activeTab: TabType;                        // Tab actuellement sélectionné
  onTabChange: (tab: TabType) => void;       // Fonction appelée lors du changement de tab
}

const StaffTabs: React.FC<StaffTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {/* Tab Vue Générale */}
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'general' && styles.activeTab  // Style spécial si sélectionné
        ]}
        onPress={() => onTabChange('general')}          // Changer vers vue générale
      >
        <Text style={[
          styles.tabText,
          activeTab === 'general' && styles.activeTabText  // Texte bleu si sélectionné
        ]}>
          Vue Générale
        </Text>
      </TouchableOpacity>

      {/* Tab Statistiques */}
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'statistics' && styles.activeTab
        ]}
        onPress={() => onTabChange('statistics')}       // Changer vers statistiques
      >
        <Text style={[
          styles.tabText,
          activeTab === 'statistics' && styles.activeTabText
        ]}>
          Statistiques
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',          // Alignement horizontal des tabs
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,                       // Espace entre les 2 boutons
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'transparent', // Fond transparent par défaut
    borderWidth: 1,
    borderColor: 'transparent',    // Bordure transparente par défaut
  },
  activeTab: {
    backgroundColor: '#FFFFFF',    // Fond blanc quand sélectionné
    borderColor: '#0066FF',        // Bordure bleue quand sélectionné
    borderWidth: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',             // Texte gris par défaut
  },
  activeTabText: {
    color: '#0066FF',             // Texte bleu quand sélectionné
    fontWeight: '600',
  },
});

export default StaffTabs;