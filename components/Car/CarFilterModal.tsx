import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Switch,
    TouchableWithoutFeedback,
    useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Slider } from '@miblanchard/react-native-slider';
import { Colors } from '@/utils/colors';

export interface FilterVehicleProps {
    priceRange: [number, number];
    yearRange: [number, number];
    passengerRange: [number, number];
    ratingRange: [number, number];
    brand?: string;
    type?: string;
    available?: boolean;
}

interface VehicleFilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterVehicleProps) => void;
    currentFilters: FilterVehicleProps;
    resetFilters: () => void;
}

const VehicleFilterModal: React.FC<VehicleFilterModalProps> = ({
                                                                   visible,
                                                                   onClose,
                                                                   onApplyFilters,
                                                                   currentFilters,
                                                                   resetFilters,
                                                               }) => {
    const { width, height } = useWindowDimensions();
    const isSmallScreen = width < 400;

    // Ajustements pour mobile
    const modalWidth = isSmallScreen ? width * 0.95 : width * 0.90;
    const modalHeight = height * 0.85; // Réduit la hauteur maximale

    const [localFilters, setLocalFilters] = useState<FilterVehicleProps>(currentFilters);

    useEffect(() => {
        if (visible) {
            setLocalFilters(currentFilters);
        }
    }, [visible, currentFilters]);

    const updateFilter = (key: keyof FilterVehicleProps, value: any) => {
        setLocalFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleApply = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleReset = () => {
        resetFilters();
        onClose();
    };

    const vehicleTypes = [
        'Berline',
        'SUV',
        'Citadine',
        'Break',
        'Coupé',
        'Cabriolet',
        'Monospace',
        'Pick-up',
        'Utilitaire'
    ];

    const popularBrands = [
        'Toyota',
        'BMW',
        'Mercedes',
        'Audi',
        'Volkswagen',
        'Ford',
        'Nissan',
        'Hyundai',
        'Kia',
        'Peugeot',
        'Renault',
        'Citroën'
    ];

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={[styles.modalContainer, {
                            width: modalWidth,
                            height: modalHeight, // Utiliser height au lieu de maxHeight
                            margin: isSmallScreen ? 8 : 15
                        }]}>
                            {/* Header */}
                            <View style={styles.header}>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} color="#666" />
                                </TouchableOpacity>
                                <Text style={styles.title}>Filtrer les véhicules</Text>
                                <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                                    <Text style={styles.resetText}>Reset</Text>
                                </TouchableOpacity>
                            </View>

                            {/* ScrollView avec flex: 1 pour occuper tout l'espace disponible */}
                            <ScrollView
                                style={styles.content}
                                contentContainerStyle={styles.contentContainer}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled={true} // Important pour les ScrollView imbriqués
                            >
                                {/* Prix par jour */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>
                                        Prix par jour: {localFilters.priceRange[0]} XAF - {localFilters.priceRange[1]} XAF
                                    </Text>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>Min: {localFilters.priceRange[0]} XAF</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={10000}
                                            maximumValue={100000}
                                            step={500}
                                            value={localFilters.priceRange[0]}
                                            onValueChange={(value) =>
                                                updateFilter('priceRange', [Math.round(Array.isArray(value) ?
                                                    value[0] : value), localFilters.priceRange[1]])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>Max: {localFilters.priceRange[1]} XAF</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={0}
                                            step={500}
                                            maximumValue={100000}
                                            value={localFilters.priceRange[1]}
                                            onValueChange={(value) =>
                                                updateFilter('priceRange', [localFilters.priceRange[0],
                                                    Math.round(Array.isArray(value) ? value[0] : value)])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                </View>

                                {/* Année */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>
                                        Année: {localFilters.yearRange[0]} - {localFilters.yearRange[1]}
                                    </Text>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>De: {localFilters.yearRange[0]}</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={2000}
                                            maximumValue={2025}
                                            value={localFilters.yearRange[0]}
                                            step={1}
                                            onValueChange={(value) =>
                                                updateFilter('yearRange', [Math.round(Array.isArray(value) ?
                                                    value[0] : value), localFilters.yearRange[1]])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>À: {localFilters.yearRange[1]}</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={2000}
                                            maximumValue={2025}
                                            value={localFilters.yearRange[1]}
                                            step={1}
                                            onValueChange={(value) =>
                                                updateFilter('yearRange', [localFilters.yearRange[0],
                                                    Math.round(Array.isArray(value) ? value[0] : value)])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                </View>

                                {/* Nombre de passagers */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>
                                        Passagers: {localFilters.passengerRange[0]} - {localFilters.passengerRange[1]}
                                    </Text>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>Min: {localFilters.passengerRange[0]}</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={2}
                                            maximumValue={8}
                                            value={localFilters.passengerRange[0]}
                                            step={1}
                                            onValueChange={(value) =>
                                                updateFilter('passengerRange',
                                                    [Math.round(Array.isArray(value) ? value[0] : value), localFilters.passengerRange[1]])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>Max: {localFilters.passengerRange[1]}</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={2}
                                            maximumValue={8}
                                            value={localFilters.passengerRange[1]}
                                            step={1}
                                            onValueChange={(value) =>
                                                updateFilter('passengerRange', [localFilters.passengerRange[0],
                                                    Math.round(Array.isArray(value) ? value[0] : value)])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                </View>

                                {/* Note minimale */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>
                                        Note: {localFilters.ratingRange[0]} - {localFilters.ratingRange[1]} étoiles
                                    </Text>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>Min: {localFilters.ratingRange[0]} ⭐</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={0}
                                            maximumValue={5}
                                            value={localFilters.ratingRange[0]}
                                            step={0.5}
                                            onValueChange={(value) =>
                                                updateFilter('ratingRange', [Math.round((Array.isArray(value) ?
                                                    value[0] : value) * 2) / 2, localFilters.ratingRange[1]])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                    <View style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>Max: {localFilters.ratingRange[1]} ⭐</Text>
                                        <Slider
                                            containerStyle={styles.slider}
                                            minimumValue={0}
                                            maximumValue={5}
                                            value={localFilters.ratingRange[1]}
                                            step={0.5}
                                            onValueChange={(value) =>
                                                updateFilter('ratingRange', [localFilters.ratingRange[0],
                                                    Math.round((Array.isArray(value) ? value[0] : value) * 2) / 2])
                                            }
                                            minimumTrackTintColor={Colors.primary}
                                            maximumTrackTintColor="#ddd"
                                            thumbStyle={{ backgroundColor: Colors.primary }}
                                        />
                                    </View>
                                </View>

                                {/* Type de véhicule */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Type de véhicule</Text>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.chipContainer}
                                        nestedScrollEnabled={true}
                                    >
                                        <TouchableOpacity
                                            style={[styles.chip, !localFilters.type && styles.chipActive]}
                                            onPress={() => updateFilter('type', '')}
                                        >
                                            <Text style={[styles.chipText, !localFilters.type && styles.chipTextActive]}>
                                                Tous
                                            </Text>
                                        </TouchableOpacity>
                                        {vehicleTypes.map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                style={[styles.chip, localFilters.type === type && styles.chipActive]}
                                                onPress={() => updateFilter('type', type === localFilters.type ? '' : type)}
                                            >
                                                <Text style={[styles.chipText, localFilters.type === type && styles.chipTextActive]}>
                                                    {type}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                {/* Marque */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Marque</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Rechercher une marque..."
                                        value={localFilters.brand || ''}
                                        onChangeText={(text) => updateFilter('brand', text)}
                                    />
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.chipContainer}
                                        nestedScrollEnabled={true}
                                    >
                                        <TouchableOpacity
                                            style={[styles.chip, !localFilters.brand && styles.chipActive]}
                                            onPress={() => updateFilter('brand', '')}
                                        >
                                            <Text style={[styles.chipText, !localFilters.brand && styles.chipTextActive]}>
                                                Toutes
                                            </Text>
                                        </TouchableOpacity>
                                        {popularBrands.map((brand) => (
                                            <TouchableOpacity
                                                key={brand}
                                                style={[styles.chip, localFilters.brand === brand && styles.chipActive]}
                                                onPress={() => updateFilter('brand', brand === localFilters.brand ? '' : brand)}
                                            >
                                                <Text style={[styles.chipText, localFilters.brand === brand && styles.chipTextActive]}>
                                                    {brand}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                {/* Disponibilité */}
                                <View style={[styles.section, styles.lastSection]}>
                                    <View style={styles.switchContainer}>
                                        <Text style={styles.sectionTitle}>Véhicules disponibles uniquement</Text>
                                        <Switch
                                            value={localFilters.available === true}
                                            onValueChange={(value) => updateFilter('available', value ? true : undefined)}
                                            trackColor={{ false: '#ddd', true: Colors.primary }}
                                            thumbColor={localFilters.available === true ? '#fff' : '#f4f3f4'}
                                        />
                                    </View>
                                </View>
                            </ScrollView>

                            {/* Footer avec boutons */}
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={onClose}
                                >
                                    <Text style={styles.cancelButtonText}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.applyButton]}
                                    onPress={handleApply}
                                >
                                    <Text style={styles.applyButtonText}>Appliquer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        minHeight: 50,
    },
    closeButton: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    resetButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    resetText: {
        color: Colors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    content: {
        flex: 1, // Prend tout l'espace disponible
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20, // Ajout d'un padding en bas
    },
    section: {
        marginBottom: 25, // Augmenté l'espacement
    },
    lastSection: {
        marginBottom: 10, // Moins d'espacement pour la dernière section
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    sliderContainer: {
        marginBottom: 10, // Augmenté l'espacement
    },
    sliderLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 5,
    },
    slider: {
        width: '100%',
        height: 40, // Augmenté la hauteur pour une meilleure interaction mobile
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 12,
    },
    chipContainer: {
        marginTop: 8,
        maxHeight: 50, // Limiter la hauteur des conteneurs de chips
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8, // Augmenté pour une meilleure interaction mobile
        marginRight: 8,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
        minHeight: 35, // Hauteur minimale pour mobile
    },
    chipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    chipText: {
        fontSize: 13,
        color: '#666',
    },
    chipTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        minHeight: 45,
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    cancelButtonText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 15,
    },
    applyButton: {
        backgroundColor: Colors.primary,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
});

export default VehicleFilterModal;