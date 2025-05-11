import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FilterSlider from "@/components/Slider"; // Assurez-vous que ce composant existe

export default function FilterModal(){
    const [isVisible, setIsVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [activeButton, setActiveButton] = useState<'apply' | 'clear' | null>(null);
    const [ageRange, setAgeRange] = useState([25, 45]);
    const [ratingRange, setRatingRange] = useState([4, 5]);

    // Données pour les emplacements
    const locations = [
        'Yaoundé',
        'Douala',
        'Bafoussam',
        'Dschang',
    ];

    // Gestionnaire pour "Appliquer"
    const handleApply = () => {
        setActiveButton('apply');
        setIsVisible(false); // Ferme le modal
        console.log('Filtres appliqués:', { ageRange, ratingRange, selectedLocation });
    };

    // Gestionnaire pour "Effacer"
    const handleClear = () => {
        setActiveButton('clear');
        setSelectedLocation('');
        setAgeRange([25, 45]);
        setRatingRange([4, 5]);
        // Ne ferme PAS le modal
    };


    return (
        <>
            {/* Bouton flottant */}
            <TouchableOpacity
                style={styles.floatButton}
                onPress={() => setIsVisible(true)}
            >
                <Text style={styles.floatButtonText}>Filtres</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                visible={isVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Titre centré */}
                        <Text style={styles.modalTitle}>Filtres</Text>

                        {/* Filtre Âge */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Âge</Text>
                            <FilterSlider
                                min={18}
                                max={65}
                                step={1}
                                //@ts-ignore
                                initialRange={ageRange}
                                suffix="ans"
                                onChange={setAgeRange}
                            />
                        </View>

                        {/* Filtre Notation */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Notation</Text>
                            <FilterSlider
                                min={1}
                                max={5}
                                step={0.5}
                                // @ts-ignore
                                initialRange={ratingRange}
                                suffix="étoiles"
                                onChange={setRatingRange}
                            />
                        </View>

                        {/* Filtre Emplacement (liste déroulante) */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Emplacement</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedLocation}
                                    onValueChange={setSelectedLocation}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Sélectionnez un emplacement" value="" />
                                    {locations.map((location) => (
                                        <Picker.Item key={location} label={location} value={location} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {/* Boutons d'action */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    activeButton === 'apply' ? styles.activeButton : styles.inactiveButton
                                ]}
                                onPress={handleApply}
                            >
                                <Text style={activeButton === 'apply' ? styles.activeText : styles.inactiveText}>
                                    Appliquer
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    activeButton === 'clear' ? styles.activeButton : styles.inactiveButton
                                ]}
                                onPress={handleClear}
                            >
                                <Text style={activeButton === 'clear' ? styles.activeText : styles.inactiveText}>
                                    Effacer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

// Styles
const styles = StyleSheet.create({
    floatButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        elevation: 5,
    },
    floatButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 15,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#007AFF',
    },
    inactiveButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    activeText: {
        color: 'white',
        fontWeight: '600',
    },
    inactiveText: {
        color: '#333',
        fontWeight: '600',
    },
});
