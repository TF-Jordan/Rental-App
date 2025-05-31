import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import HEADER from '@/components/General/Header';
import TabSelector from '@/components/General/TabSelector';
import AgenciesData from "@/assets/Agency/agencies.json";
import AgencyCard from "@/components/Agency/AgencyCard";
import { Colors } from "@/utils/colors";

export default function Agencies() {
    const [activeTab, setActiveTab] = useState<'general' | 'stats'>('general');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // États du filtre - valeurs par défaut
    const defaultFilters: FilterAgencyProps = {
        city: [],
        rating: null,
        status: 'all',
        type: [],
        followers: [0, 10000]
    };

    const [filters, setFilters] = useState<FilterAgencyProps>(defaultFilters);

    // Pour appliquer les filtres depuis le modal
    const handleApplyFilters = (newFilters: FilterAgencyProps) => {
        setFilters(newFilters);
    };

    // Pour réinitialiser les filtres
    const handleResetFilters = () => {
        setFilters(defaultFilters);
    };

    // Calcul des agences filtrées
    const filteredAgencies = useMemo(() => {
        // @ts-ignore
        return AgenciesData.filter(agency => {
            // Filtre par ville
            if (filters.city.length > 0 && !filters.city.includes(agency.city)) {
                return false;
            }

            // Filtre par note
            if (filters.rating !== null && agency.rating < filters.rating) {
                return false;
            }

            // Filtre par statut (ouvert/fermé)
            if (filters.status === 'open') {
                const now = new Date();
                const currentHour = now.getHours();
                const openHour = parseInt(agency.openingTime.split(':')[0]);
                const closeHour = parseInt(agency.closingTime.split(':')[0]);
                const isOpen = currentHour >= openHour && currentHour < closeHour;
                if (!isOpen) return false;
            }

            // Filtre par type
            if (filters.type.length > 0 && !filters.type.includes(agency.type)) {
                return false;
            }

            // Filtre par nombre d'abonnés
            if (agency.followers < filters.followers[0] || agency.followers > filters.followers[1]) {
                return false;
            }

            return true;
        });
    }, [filters]);

    // Vérifier si des filtres sont appliqués
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
                        <Text style={styles.title}>Nos Agences</Text>
                        <Text style={styles.subtitle}>
                            {filteredAgencies.length} agence{filteredAgencies.length > 1 ? 's' : ''}
                            trouvée{filteredAgencies.length > 1 ? 's' : ''}
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
                        data={filteredAgencies}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <AgencyCard agency={item} />}
                        contentContainerStyle={{
                            padding: 16,
                            paddingBottom: 100
                        }}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyContainer}>
                                <MaterialIcons name="search-off" size={64} color="#ccc" />
                                <Text style={styles.emptyTitle}>Aucune agence trouvée</Text>
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
                </View>
            ) : (
                <View style={styles.statsContainer}>
                    <Text>Statistiques des agences</Text>
                </View>
            )}

            {/* Modal de filtre */}
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