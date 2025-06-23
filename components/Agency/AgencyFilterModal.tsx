import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Colors } from '@/utils/colors';
import { AgencyProps, FilterAgencyProps } from '@/utils/types/AgencyProps';

interface AgencyFilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterAgencyProps) => void;
    agencies: AgencyProps[];
    currentFilters: FilterAgencyProps;
}

export default function AgencyFilterModal({
                                              visible,
                                              onClose,
                                              onApplyFilters,
                                              agencies,
                                              currentFilters
                                          }: AgencyFilterModalProps) {
    const [filters, setFilters] = useState<FilterAgencyProps>(currentFilters);
    const [expandedSections, setExpandedSections] = useState({
        city: false,
        type: false,
        rating: false,
        status: false
    });

    // Extraire les données uniques des agences
    const uniqueCities = [...new Set(agencies.map(a => a.city).filter(Boolean))].sort();
    const uniqueTypes = [...new Set(agencies.map(a => a.type).filter(Boolean))].sort();

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCityToggle = (city: string) => {
        setFilters(prev => ({
            ...prev,
            city: prev.city?.includes(city)
                ? prev.city.filter(c => c !== city)
                : [...(prev.city || []), city]
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

    const handleStatusToggle = (status: 'open' | 'all') => {
        setFilters(prev => ({
            ...prev,
            status: status
        }));
    };

    const resetFilters = () => {
        setFilters({
            city: [],
            type: [],
            rating: null,
            status: 'all',
            followers: []
        });
    };

    const applyFilters = () => {
        onApplyFilters(filters);
        onClose();
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.city && filters.city.length > 0) count++;
        if (filters.type && filters.type.length > 0) count++;
        if (filters.rating !== null) count++;
        if (filters.status !== 'all') count++;
        return count;
    };

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
                    {/* Statut */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Statut</Text>
                        <View style={styles.capacityContainer}>
                            {[
                                { key: 'all', label: 'Toutes' },
                                { key: 'open', label: 'Ouvertes' }
                            ].map((status) => (
                                <TouchableOpacity
                                    key={status.key}
                                    style={[
                                        styles.capacityButton,
                                        filters.status === status.key && styles.capacityButtonActive
                                    ]}
                                    onPress={() => handleStatusToggle(status.key as 'open' | 'all')}
                                >
                                    <Text style={[
                                        styles.capacityButtonText,
                                        filters.status === status.key && styles.capacityButtonTextActive
                                    ]}>
                                        {status.label}
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
                                        filters.rating === rating && styles.ratingButtonActive
                                    ]}
                                    onPress={() => setFilters(prev => ({
                                        ...prev,
                                        rating: prev.rating === rating ? null : rating
                                    }))}
                                >
                                    <View style={styles.ratingContent}>
                                        {[...Array(rating)].map((_, i) => (
                                            <AntDesign
                                                key={i}
                                                name="star"
                                                size={12}
                                                color={filters.rating === rating ? "#fff" : Colors.primary}
                                            />
                                        ))}
                                        <Text style={[
                                            styles.ratingText,
                                            filters.rating === rating && styles.ratingTextActive
                                        ]}>
                                            {rating}+
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Types d'agences */}
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.sectionHeader}
                            onPress={() => toggleSection('type')}
                        >
                            <Text style={styles.sectionTitle}>Type d'agence</Text>
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
                                        onPress={() => handleTypeToggle(type)}
                                    >
                                        <View style={[
                                            styles.checkbox,
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

                    {/* Villes */}
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.sectionHeader}
                            onPress={() => toggleSection('city')}
                        >
                            <Text style={styles.sectionTitle}>Ville</Text>
                            <MaterialIcons
                                name={expandedSections.city ? "expand-less" : "expand-more"}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                        {expandedSections.city && (
                            <View style={styles.checkboxContainer}>
                                {uniqueCities.map((city) => (
                                    <TouchableOpacity
                                        key={city}
                                        style={styles.checkboxItem}
                                        onPress={() => handleCityToggle(city)}
                                    >
                                        <View style={[
                                            styles.checkbox,
                                            filters.city?.includes(city) && styles.checkboxActive
                                        ]}>
                                            {filters.city?.includes(city) && (
                                                <MaterialIcons name="check" size={16} color="#fff" />
                                            )}
                                        </View>
                                        <Text style={styles.checkboxLabel}>{city}</Text>
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