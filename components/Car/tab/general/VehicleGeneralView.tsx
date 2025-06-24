import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from "@/utils/colors";
import VehicleStatusTabs from './VehicleStatusTabs';
import VehicleFilterModal from '@/components/Car/VehicleFilterModal';
import FilterButton from '@/components/Car/FilterButton';
import {FilterVehicleProps, filterVehicles} from '@/utils/types/CarProps';
import {vehiclesData} from "@/assets/Car/data";

export default function VehicleGeneralView() {
    const [showFilterModal, setShowFilterModal] = useState(false);

    // @ts-ignore
    const vehicles=vehiclesData;
    
    const maxPrice = Math.max(...vehicles.map(v => v.pricePerDay));
    const minPrice = Math.min(...vehicles.map(v => v.pricePerDay));

    const [filters, setFilters] = useState<FilterVehicleProps>({
        type: [],
        capacity: null,
        priceRange: [minPrice, maxPrice], // Valeurs par défaut, ajustez selon vos besoins
        brands: [],
        models: [],
        minRating: null,
        features: []
    });

    // Calculer les véhicules filtrés
    const filteredVehicles = useMemo(() => {
        return filterVehicles(vehicles, filters);
    }, [vehicles, filters]);

    // Calculer le nombre de filtres actifs
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.type.length > 0) count++;
        if (filters.brands && filters.brands.length > 0) count++;
        if (filters.models && filters.models.length > 0) count++;
        if (filters.capacity) count++;
        if (filters.minRating) count++;
        if (filters.features && filters.features.length > 0) count++;

        // Vérifier si la plage de prix a été modifiée
        const maxPrice = Math.max(...vehicles.map(v => v.pricePerDay));
        const minPrice = Math.min(...vehicles.map(v => v.pricePerDay));
        if (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) {
            count++;
        }

        return count;
    }, [filters, vehicles]);

    const handleApplyFilters = (newFilters: FilterVehicleProps) => {
        setFilters(newFilters);
    };

    return (
        <View style={styles.container}>
            {/* Section titre avec bouton filtre */}
            <View style={styles.titleContainer}>
                <View>
                    <Text style={styles.title}>Mes véhicules</Text>
                    <Text style={styles.subtitle}>
                        {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''}
                        {activeFiltersCount > 0 && ` (${vehicles.length} au total)`}
                    </Text>
                </View>
                <FilterButton
                    onPress={() => setShowFilterModal(true)}
                    activeFiltersCount={activeFiltersCount}
                />
            </View>

            {/* Indicateur de filtres actifs */}
            {activeFiltersCount > 0 && (
                <View style={styles.activeFiltersContainer}>
                    <Text style={styles.activeFiltersTitle}>
                        {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} appliqué{activeFiltersCount > 1 ? 's' : ''}
                    </Text>
                    <TouchableOpacity
                        style={styles.clearFiltersButton}
                        onPress={() => setFilters({
                            type: [],
                            capacity: null,
                            priceRange: [Math.min(...vehicles.map(v => v.pricePerDay)), Math.max(...vehicles.map(v => v.pricePerDay))],
                            brands: [],
                            models: [],
                            minRating: null,
                            features: []
                        })}
                    >
                        <Text style={styles.clearFiltersText}>Effacer tout</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Onglets de statut des véhicules */}
            <VehicleStatusTabs
                vehicles={filteredVehicles}
            />

            {/* Modal de filtrage */}
            <VehicleFilterModal
                visible={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onApplyFilters={handleApplyFilters}
                vehicles={vehicles}
                currentFilters={filters}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        marginBottom: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    activeFiltersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 1
    },
    activeFiltersTitle: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    clearFiltersButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearFiltersText: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '500',
        marginRight: 4,
    }
});