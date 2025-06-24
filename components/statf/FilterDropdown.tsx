import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Props du composant FilterDropdown
interface FilterDropdownProps {
  title: string;                              // Titre affiché au-dessus du dropdown
  options: string[];                          // Liste des options disponibles
  selectedValue: string | null;               // Valeur sélectionnée (une seule)
  onSelectionChange: (value: string | null) => void; // Fonction appelée lors du changement
  placeholder?: string;                       // Texte par défaut quand rien n'est sélectionné
  showAllOption?: boolean;                    // Afficher l'option "Tous" (défaut: true)
  allOptionText?: string;                     // Texte pour l'option "Tous" (défaut: "Tous")
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
                                                         title,
                                                         options,
                                                         selectedValue,
                                                         onSelectionChange,
                                                         placeholder = "Sélectionner...",
                                                         showAllOption = true,
                                                         allOptionText = "Tous",
                                                       }) => {
  // État pour gérer l'ouverture/fermeture du dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Créer la liste complète des options avec "Tous" en premier si activé
  const allOptions = showAllOption ? [allOptionText, ...options] : options;

  // Fonction pour sélectionner une option
  const selectOption = (option: string) => {
    if (selectedValue === option) {
      // Déselectionner si on clique sur l'option déjà sélectionnée
      onSelectionChange(null);
    } else {
      // Si c'est l'option "Tous", passer null pour indiquer aucun filtre
      const valueToPass = (showAllOption && option === allOptionText) ? null : option;
      onSelectionChange(valueToPass);
    }
    setIsOpen(false); // Fermer le dropdown après sélection
  };

  // Fonction pour ouvrir/fermer le dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
      <View style={styles.container}>
        {/* Titre permanent au-dessus */}
        <Text style={styles.titleText}>{title}</Text>

        {/* Bouton principal du dropdown */}
        <TouchableOpacity
            style={[
              styles.dropdownButton,
              isOpen && styles.dropdownButtonOpen    // Style différent si ouvert
            ]}
            onPress={toggleDropdown}
        >
          <Text style={[
            styles.dropdownText,
            isOpen && styles.dropdownTextOpen,      // Texte blanc si ouvert
            !selectedValue && styles.placeholderText // Style placeholder si rien sélectionné
          ]}>
            {selectedValue || (showAllOption ? allOptionText : placeholder)}
          </Text>
          <Ionicons
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={12}
              color={isOpen ? "#FFFFFF" : "#9CA3AF"}
          />
        </TouchableOpacity>

        {/* Liste déroulante */}
        {isOpen && (
            <View style={styles.dropdownList}>
              <ScrollView style={styles.optionsList} nestedScrollEnabled>
                {allOptions.map((option, index) => {
                  // Pour l'option "Tous", elle est sélectionnée quand selectedValue est null
                  const isSelected = (showAllOption && option === allOptionText)
                      ? selectedValue === null
                      : selectedValue === option;

                  return (
                      <TouchableOpacity
                          key={index}
                          style={[
                            styles.optionItem,
                            isSelected && styles.optionItemSelected
                          ]}
                          onPress={() => selectOption(option)}
                      >
                        {/* Radio button */}
                        <View style={[
                          styles.radioButton,
                          isSelected && styles.radioButtonSelected
                        ]}>
                          {isSelected && (
                              <View style={styles.radioButtonInner} />
                          )}
                        </View>

                        {/* Texte de l'option */}
                        <Text style={[
                          styles.optionText,
                          isSelected && styles.optionTextSelected
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1000,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 80,
  },
  dropdownButtonOpen: {
    backgroundColor: '#0066FF',        // Fond bleu quand ouvert
    borderColor: '#0066FF',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownText: {
    fontSize: 11,
    color: '#374151',
    flex: 1,
  },
  dropdownTextOpen: {
    color: '#FFFFFF',                 // Texte blanc quand ouvert
  },
  placeholderText: {
    color: '#9CA3AF',                 // Couleur grise pour le placeholder
    fontStyle: 'italic',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1001,
  },
  optionsList: {
    padding: 4,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  optionItemSelected: {
    backgroundColor: '#E3F2FD',
  },
  radioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  radioButtonSelected: {
    borderColor: '#0066FF',
  },
  radioButtonInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0066FF',
  },
  optionText: {
    fontSize: 10,
    color: '#374151',
    flex: 1,
  },
  optionTextSelected: {
    color: '#0066FF',
    fontWeight: '500',
  },
});

export default FilterDropdown;