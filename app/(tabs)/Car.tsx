import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import HEADER from '@/components/General/Header';
import TabSelector from '@/components/General/TabSelector';
import Cars from "@/assets/Car/cars.json";
import CarCard from "@/components/Car/CarCard";
import AddCarModal from "@/components/Car/AddCarModal/AddCarModal";
import VehicleFilterModal, { FilterVehicleProps } from '@/components/Car/CarFilterModal';
import { Colors } from "@/utils/colors";

export default function Vehicles() {
    const [activeTab, setActiveTab] = useState<'general' | 'stats'>('general');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // États du filtre - valeurs par défaut
    const defaultFilters: FilterVehicleProps = {
        priceRange: [0, 100000] as [number, number],
        yearRange: [2000, 2025] as [number, number],
        passengerRange: [2, 8] as [number, number],
        ratingRange: [0, 5] as [number, number],
        brand: '',
        type: '',
        available: undefined
    };

    const [filters, setFilters] = useState<FilterVehicleProps>(defaultFilters);

    // Pour appliquer les filtres depuis le modal
    const handleApplyFilters = (newFilters: FilterVehicleProps) => {
        setFilters(newFilters);
    };

    // Pour réinitialiser les filtres
    const handleResetFilters = () => {
        setFilters(defaultFilters);
    };

    // Calcul des véhicules filtrés
    const filteredVehicles = useMemo(() => {
        return Cars
            .filter(v => v.pricePerDay >= filters.priceRange[0] && v.pricePerDay <= filters.priceRange[1])
            .filter(v => v.year && v.year >= filters.yearRange[0] && v.year <= filters.yearRange[1])
            .filter(v => v.passenger && v.passenger >= filters.passengerRange[0] && v.passenger <= filters.passengerRange[1])
            .filter(v => !v.rating || (v.rating >= filters.ratingRange[0] && v.rating <= filters.ratingRange[1]))
            .filter(v => !filters.brand || (v.brand && v.brand.toLowerCase().includes(filters.brand.toLowerCase())))
            .filter(v => !filters.type || (v.type && v.type.toLowerCase().includes(filters.type.toLowerCase())))
            .filter(v => filters.available === undefined || v.available === filters.available);
    }, [filters]);

    // Vérifier si des filtres sont appliqués (différents des valeurs par défaut)
    const hasActiveFilters = useMemo(() => {
        return JSON.stringify(filters) !== JSON.stringify(defaultFilters);
    }, [filters]);

    return (
        <View style={styles.container}>
            <HEADER logo="EASY-RENT" />

            <View style={styles.headerSection}>
                <TabSelector
                    titre1="Vue Générale"
                    titre2="Statistiques"
                    icon1={<Entypo name="grid" size={16} color={activeTab === 'general' ? Colors.primary : '#000'} />}
                    icon2={<Feather name="bar-chart-2" size={16} color={activeTab === 'stats' ? Colors.primary : '#000'} />}
                    activeTab={activeTab}
                    // @ts-ignore
                    setActiveTab={setActiveTab}
                />

                <View style={styles.titleContainer}>
                    <View>
                        <Text style={styles.title}>Vos Véhicules</Text>
                        <Text style={styles.subtitle}>
                            {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} trouvé{filteredVehicles.length > 1 ? 's' : ''}
                        </Text>
                    </View>

                    {/* Bouton de filtre */}
                    <TouchableOpacity
                        style={[styles.filterButton, hasActiveFilters && styles.filterButtonActive]}
                        onPress={() => setFilterModalVisible(true)}
                    >
                        <MaterialIcons
                            name="tune"
                            size={20}
                            color={hasActiveFilters ? '#fff' : Colors.primary}
                        />
                        <Text style={[
                            styles.filterButtonText,
                            hasActiveFilters && styles.filterButtonTextActive
                        ]}>
                            Filtrer
                        </Text>
                        {hasActiveFilters && (
                            <View style={styles.filterIndicator}>
                                <Text style={styles.filterIndicatorText}>●</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {activeTab === 'general' ? (
                <View style={{ flex: 1 }}>
                    {/* Indicateurs de filtres actifs */}
                    {hasActiveFilters && (
                        <View style={styles.activeFiltersContainer}>
                            <Text style={styles.activeFiltersTitle}>Filtres actifs:</Text>
                            <TouchableOpacity
                                style={styles.clearFiltersButton}
                                onPress={handleResetFilters}
                            >
                                <Text style={styles.clearFiltersText}>Effacer tout</Text>
                                <MaterialIcons name="clear" size={16} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    )}

                    <FlatList
                        data={filteredVehicles}
                        keyExtractor={item => item.id.toString()}
                        // @ts-ignore
                        renderItem={({ item }) => <CarCard vehicle={item} />}
                        contentContainerStyle={{
                            padding: 16,
                            paddingBottom: 100 // Espace pour le bouton flottant
                        }}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <MaterialIcons name="search-off" size={64} color="#ccc" />
                                <Text style={styles.emptyTitle}>Aucun véhicule trouvé</Text>
                                <Text style={styles.emptySubtitle}>
                                    Essayez de modifier vos critères de recherche
                                </Text>
                                <TouchableOpacity
                                    style={styles.resetButton}
                                    onPress={handleResetFilters}
                                >
                                    <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <AddCarModal onAddVehicle={undefined} />
                </View>
            ) : (
                <View style={styles.statsContainer}>
                    {/* GraphStatVehicle component here */}
                    <Text>Statistiques des véhicules</Text>
                </View>
            )}

            {/* Modal de filtre */}
            <VehicleFilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApplyFilters={handleApplyFilters}
                currentFilters={filters}
                resetFilters={handleResetFilters}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerSection: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(15,16,16,0.25)'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: '#fff',
    },
    filterButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filterButtonText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    filterButtonTextActive: {
        color: '#fff',
    },
    filterIndicator: {
        marginLeft: 4,
    },
    filterIndicatorText: {
        color: '#fff',
        fontSize: 8,
    },
    activeFiltersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
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
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    resetButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: Colors.primary,
        borderRadius: 25,
    },
    resetButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    statsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});