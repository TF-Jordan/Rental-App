import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Colors } from '@/utils/colors';
import { CarProps, FilterVehicleProps} from '@/utils/types/CarProps';
import Slider from '@react-native-community/slider';

interface VehicleFilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterVehicleProps) => void;
    vehicles: CarProps[];
    currentFilters: FilterVehicleProps;
}

export default function VehicleFilterModal({
                                               visible,
                                               onClose,
                                               onApplyFilters,
                                               vehicles,
                                               currentFilters
                                           }: VehicleFilterModalProps) {
    const [filters, setFilters] = useState<FilterVehicleProps>(currentFilters);
    const [expandedSections, setExpandedSections] = useState({
        brand: false,
        type: false,
        features: false,
        advanced: false
    });

    // Extraire les données uniques des véhicules
    const uniqueBrands = [...new Set(vehicles.map(v => v.brand).filter(Boolean))].sort();
    const uniqueTypes = [...new Set(vehicles.map(v => v.type).filter(Boolean))].sort();

    const maxPrice = Math.max(...vehicles.map(v => v.pricePerDay));
    const minPrice = Math.min(...vehicles.map(v => v.pricePerDay));


    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleBrandToggle = (brand: string) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands?.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...(prev.brands || []), brand]
        }));
    };

    const handleTypeToggle = (type: string) => {
        setFilters(prev => ({
            ...prev,
            type: prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type]
        }));
    };

    const handleFeatureToggle = (feature: string) => {
        setFilters(prev => ({
            ...prev,
            features: prev.features?.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...(prev.features || []), feature]
        }));
    };

    const resetFilters = () => {
        setFilters({
            type: [],
            capacity: null,
            priceRange: [minPrice, maxPrice],
            brands: [],
            models: [],
            minRating: null,
            features: []
        });
    };

    const applyFilters = () => {
        onApplyFilters(filters);
        onClose();
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.type.length > 0) count++;
        if (filters.brands && filters.brands.length > 0) count++;
        if (filters.models && filters.models.length > 0) count++;
        if (filters.capacity) count++;
        if (filters.minRating) count++;
        if (filters.features && filters.features.length > 0) count++;
        if (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) count++;
        return count;
    };

    const availableFeatures = [
        { key: 'air_condition', label: 'Climatisation', icon: 'ac-unit' },
        { key: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth' },
        { key: 'gps', label: 'GPS', icon: 'navigation' },
        { key: 'usb_input', label: 'Port USB', icon: 'usb' },
        { key: 'child_seat', label: 'Siège enfant', icon: 'child-care' },
        { key: 'luggage', label: 'Coffre spacieux', icon: 'luggage' },
        { key: 'sleeping_bed', label: 'Couchette', icon: 'hotel' },
        { key: 'water', label: 'Eau', icon: 'opacity' }
    ];

    // @ts-ignore
    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Filtres</Text>
                    <TouchableOpacity onPress={resetFilters} style={styles.resetButton}>
                        <Text style={styles.resetText}>Réinitialiser</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Prix */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Prix par jour</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceLabel}>
                                {filters.priceRange[0]}XAF - {filters.priceRange[1]}XAF
                            </Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={minPrice}
                                maximumValue={maxPrice}
                                value={filters.priceRange[1]}
                                onValueChange={(value) => setFilters(prev => ({
                                    ...prev,
                                    priceRange: [prev.priceRange[0], Math.round(value)]
                                }))}
                                minimumTrackTintColor={Colors.primary}
                                maximumTrackTintColor="#ddd"
                                // @ts-ignore
                                thumbStyle={styles.sliderThumb}
                            />
                            <View style={styles.priceInputContainer}>
                                <TextInput
                                    style={styles.priceInput}
                                    value={filters.priceRange[0].toString()}
                                    onChangeText={(text) => {
                                        const value = parseInt(text) || minPrice;
                                        setFilters(prev => ({
                                            ...prev,
                                            priceRange: [value, prev.priceRange[1]]
                                        }));
                                    }}
                                    keyboardType="numeric"
                                    placeholder="Min"
                                />
                                <Text style={styles.priceSeparator}>-</Text>
                                <TextInput
                                    style={styles.priceInput}
                                    value={filters.priceRange[1].toString()}
                                    onChangeText={(text) => {
                                        const value = parseInt(text) || maxPrice;
                                        setFilters(prev => ({
                                            ...prev,
                                            priceRange: [prev.priceRange[0], value]
                                        }));
                                    }}
                                    keyboardType="numeric"
                                    placeholder="Max"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Nombre de passagers */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Nombre de passagers</Text>
                        <View style={styles.capacityContainer}>
                            {[2, 4, 5, 7, 9].map((capacity) => (
                                <TouchableOpacity
                                    key={capacity}
                                    style={[
                                        styles.capacityButton,
                                        filters.capacity === capacity && styles.capacityButtonActive
                                    ]}
                                    onPress={() => setFilters(prev => ({
                                        ...prev,
                                        capacity: prev.capacity === capacity ? null : capacity
                                    }))}
                                >
                                    <Text style={[
                                        styles.capacityButtonText,
                                        filters.capacity === capacity && styles.capacityButtonTextActive
                                    ]}>
                                        {capacity}+
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Note minimale */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Note minimale</Text>
                        <View style={styles.ratingContainer}>
                            {[3, 4, 5].map((rating) => (
                                <TouchableOpacity
                                    key={rating}
                                    style={[
                                        styles.ratingButton,
                                        filters.minRating === rating && styles.ratingButtonActive
                                    ]}
                                    onPress={() => setFilters(prev => ({
                                        ...prev,
                                        minRating: prev.minRating === rating ? null : rating
                                    }))}
                                >
                                    <View style={styles.ratingContent}>
                                        {[...Array(rating)].map((_, i) => (
                                            <AntDesign
                                                key={i}
                                                name="star"
                                                size={12}
                                                color={filters.minRating === rating ? "#fff" : Colors.primary}
                                            />
                                        ))}
                                        <Text style={[
                                            styles.ratingText,
                                            filters.minRating === rating && styles.ratingTextActive
                                        ]}>
                                            {rating}+
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Types de véhicules */}
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.sectionHeader}
                            onPress={() => toggleSection('type')}
                        >
                            <Text style={styles.sectionTitle}>Type de véhicule</Text>
                            <MaterialIcons
                                name={expandedSections.type ? "expand-less" : "expand-more"}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                        {expandedSections.type && (
                            <View style={styles.checkboxContainer}>
                                {uniqueTypes.map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={styles.checkboxItem}
                                        // @ts-ignore
                                        onPress={() => handleTypeToggle(type)}
                                    >
                                        <View style={[
                                            styles.checkbox,
                                            // @ts-ignore
                                            filters.type.includes(type) && styles.checkboxActive
                                        ]}>
                                            {filters.type.includes(type) && (
                                                <MaterialIcons name="check" size={16} color="#fff" />
                                            )}
                                        </View>
                                        <Text style={styles.checkboxLabel}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Marques */}
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.sectionHeader}
                            onPress={() => toggleSection('brand')}
                        >
                            <Text style={styles.sectionTitle}>Marque</Text>
                            <MaterialIcons
                                name={expandedSections.brand ? "expand-less" : "expand-more"}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                        {expandedSections.brand && (
                            <View style={styles.checkboxContainer}>
                                {uniqueBrands.map((brand) => (
                                    <TouchableOpacity
                                        key={brand}
                                        style={styles.checkboxItem}
                                        // @ts-ignore
                                        onPress={() => handleBrandToggle(brand)}
                                    >
                                        <View style={[
                                            styles.checkbox,
                                            // @ts-ignore
                                            filters.brands?.includes(brand) && styles.checkboxActive
                                        ]}>
                                            {filters.brands?.includes(brand) && (
                                                <MaterialIcons name="check" size={16} color="#fff" />
                                            )}
                                        </View>
                                        <Text style={styles.checkboxLabel}>{brand}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Fonctionnalités */}
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.sectionHeader}
                            onPress={() => toggleSection('features')}
                        >
                            <Text style={styles.sectionTitle}>Fonctionnalités</Text>
                            <MaterialIcons
                                name={expandedSections.features ? "expand-less" : "expand-more"}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                        {expandedSections.features && (
                            <View style={styles.featuresGrid}>
                                {availableFeatures.map((feature) => (
                                    <TouchableOpacity
                                        key={feature.key}
                                        style={[
                                            styles.featureButton,
                                            filters.features?.includes(feature.key) && styles.featureButtonActive
                                        ]}
                                        onPress={() => handleFeatureToggle(feature.key)}
                                    >
                                        <MaterialIcons
                                            name={feature.icon as any}
                                            size={20}
                                            color={filters.features?.includes(feature.key) ? "#fff" : Colors.primary}
                                        />
                                        <Text style={[
                                            styles.featureButtonText,
                                            filters.features?.includes(feature.key) && styles.featureButtonTextActive
                                        ]}>
                                            {feature.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                        <Text style={styles.applyButtonText}>
                            Appliquer les filtres ({getActiveFiltersCount()})
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    closeButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    resetButton: {
        padding: 4,
    },
    resetText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    section: {
        marginVertical: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    priceContainer: {
        backgroundColor: '#f8f9fb',
        borderRadius: 12,
        padding: 16,
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderThumb: {
        backgroundColor: Colors.primary,
        width: 20,
        height: 20,
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    priceInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: 80,
        textAlign: 'center',
        fontSize: 14,
    },
    priceSeparator: {
        marginHorizontal: 12,
        fontSize: 16,
        color: '#666',
    },
    capacityContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    capacityButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    capacityButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    capacityButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    capacityButtonTextActive: {
        color: '#fff',
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    ratingButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    ratingButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    ratingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginLeft: 4,
    },
    ratingTextActive: {
        color: '#fff',
    },
    checkboxContainer: {
        gap: 12,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 4,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    featureButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    featureButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    featureButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#666',
        marginLeft: 6,
    },
    featureButtonTextActive: {
        color: '#fff',
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    applyButton: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});