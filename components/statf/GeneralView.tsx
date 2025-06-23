//vue generale complete

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StaffTable from './StaffTable';
import FilterDropdown from './FilterDropdown';

const GeneralView = () => {
  // États pour les filtres - maintenant des valeurs uniques au lieu de tableaux
  const [searchText, setSearchText] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Fonction pour réinitialiser tous les filtres
  const resetAllFilters = () => {
    setSearchText('');
    setSelectedDepartment(null);
    setSelectedPost(null);
    setSelectedStatus(null);
  };

  // @ts-ignore
  return (
      <ScrollView style={styles.container}>
        {/* Section Liste du Personnel */}
        <View style={styles.headerSection}>
          {/* Champ de recherche avec icône à l'intérieur */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={16} color="#6B7280" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher..."
                placeholderTextColor="#6B7280"
                value={searchText}
                onChangeText={setSearchText}
            />
          </View>

          {/* Description */}
         </View>

        {/* Section Filtres */}
        <View style={styles.filtersSection}>
          <View style={styles.filtersRow}>
            {/* Filtre Départements */}
            <View style={styles.filterItem}>
              <FilterDropdown
                  title="Départements"
                  options={['Marketing', 'Technique', 'Création', 'Finance', 'Administration', 'Ressources Humaines']}
                  selectedValue={selectedDepartment}
                  onSelectionChange={setSelectedDepartment}
                  placeholder="Choisir un département"
                  showAllOption={true}
                  allOptionText="Tous"
              />
            </View>

            {/* Filtre Postes */}
            <View style={styles.filterItem}>
              <FilterDropdown
                  title="Postes"
                  options={[
                    'Directeur Marketing',
                    'Développeur Senior',
                    'Designer UX/UI',
                    'Comptable',
                    'Responsable RH',
                    'Chef de projet',
                    'Community Manager',
                    'Assistant administrative',
                    'Développeur Frontend'
                  ]}
                  selectedValue={selectedPost}
                  onSelectionChange={setSelectedPost}
                  placeholder="Choisir un poste"
                  showAllOption={true}
                  allOptionText="Tous"
              />
            </View>

            {/* Filtre Status */}
            <View style={styles.filterItem}>
              <FilterDropdown
                  title="Status"
                  options={['Actif', 'Inactif', 'En congé', 'Formation']}
                  selectedValue={selectedStatus}
                  onSelectionChange={setSelectedStatus}
                  placeholder="Choisir un status"
                  showAllOption={true}
                  allOptionText="Tous"
              />
            </View>
          </View>

          {/* Bouton pour réinitialiser tous les filtres */}
          <TouchableOpacity
              style={styles.resetButton}
              onPress={resetAllFilters}
          >
            <Ionicons name="refresh" size={16} color="#FFFFFF" style={styles.resetIcon} />
            <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
          </TouchableOpacity>

          {/* Indicateur des filtres actifs */}
          {(selectedDepartment || selectedPost || selectedStatus || searchText) && (
              <View style={styles.activeFiltersContainer}>
                <Text style={styles.activeFiltersTitle}>Filtres actifs:</Text>
                <View style={styles.activeFiltersRow}>
                  {searchText && (
                      <View style={styles.activeFilterChip}>
                        <Text style={styles.activeFilterText}>Recherche: "{searchText}"</Text>
                      </View>
                  )}
                  {selectedDepartment && (
                      <View style={styles.activeFilterChip}>
                        <Text style={styles.activeFilterText}>Département: {selectedDepartment}</Text>
                      </View>
                  )}
                  {selectedPost && (
                      <View style={styles.activeFilterChip}>
                        <Text style={styles.activeFilterText}>Poste: {selectedPost}</Text>
                      </View>
                  )}
                  {selectedStatus && (
                      <View style={styles.activeFilterChip}>
                        <Text style={styles.activeFilterText}>Status: {selectedStatus}</Text>
                      </View>
                  )}
                </View>
              </View>
          )}
        </View>

        {/* Tableau du personnel */}
        <StaffTable
            searchText={searchText}
            selectedDepartment={selectedDepartment}
            selectedPost={selectedPost}
            // @ts-ignore
            selectedStatus={selectedStatus}
        />
      </ScrollView>
  );
};

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
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#000000',
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  filtersSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filtersTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filtersIcon: {
    marginRight: 6,
  },
  filtersTitle: {
    fontSize: 16,
    color: '#000000',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filterItem: {
    flex: 1,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 12,
  },
  resetIcon: {
    marginRight: 6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  activeFiltersContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    padding: 12,
    marginTop: 8,
  },
  activeFiltersTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  activeFiltersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  activeFilterChip: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeFilterText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default GeneralView;