import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import AgenciesData from "@/assets/Agency/agencies.json";
import AgencyCard from "@/components/Agency/AgencyCard";
import PageHeader from "@/components/General/PageView/PageHeader";
import usePageAnimation from "@/hooks/usePageAnimation";
import AddAgencyModal from "@/components/Agency/AddModal/AddAgencyModal";
import AgencyFilterModal from "@/components/Agency/AgencyFilterModal";
import { FilterAgencyProps } from "@/utils/types/AgencyProps";
import { Colors } from "@/utils/colors";
import FilterButton from "@/components/Car/FilterButton";
import AgencyStatistics from "@/components/Agency/AgencyStatComponents";

export default function Agencies() {
    const [activeTab, setActiveTab] = useState<'general' | 'stats'>('general');
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState<FilterAgencyProps>({
        city: [],
        type: [],
        rating: null,
        status: 'all',
        followers: []
    });

    const { getAnimatedStyle } = usePageAnimation();

    // Configuration des tabs
    const tabs = [
        {
            key: 'general',
            title: 'Vue Générale',
            icon: <Entypo name="grid" size={16} />
        },
        {
            key: 'stats',
            title: 'Statistiques',
            icon: <Feather name="bar-chart-2" size={16} />
        }
    ];

    // Fonction pour filtrer les agences
    const filteredAgencies = useMemo(() => {
        return AgenciesData.filter(agency => {
            // Filtre par ville
            if (filters.city.length > 0 && !filters.city.includes(agency.city)) {
                return false;
            }

            // Filtre par type
            if (filters.type.length > 0 && !filters.type.includes(agency.type)) {
                return false;
            }

            // Filtre par note
            if (filters.rating !== null && agency.rating < filters.rating) {
                return false;
            }

            // Filtre par statut (ouvert/fermé)
            if (filters.status === 'open') {
                const now = new Date();
                const currentTime = now.getHours() * 100 + now.getMinutes();
                const openTime = parseInt(agency.openingTime.replace(':', ''));
                const closeTime = parseInt(agency.closingTime.replace(':', ''));

                if (currentTime < openTime || currentTime > closeTime) {
                    return false;
                }
            }

            return true;
        });
    }, [filters]);

    // Compter les filtres actifs
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.city.length > 0) count++;
        if (filters.type.length > 0) count++;
        if (filters.rating !== null) count++;
        if (filters.status !== 'all') count++;
        return count;
    }, [filters]);

    const handleApplyFilters = (newFilters: FilterAgencyProps) => {
        setFilters(newFilters);
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

    const setTrue =()=>{setIsFilterModalVisible(true);};
    const renderFilterButton = () => (


        <View style={styles.filterContainer}>
            <View>
                <Text style={styles.title}>Mes Agences</Text>
                <Text style={styles.subtitle}>
                    {filteredAgencies.length} Agences{filteredAgencies.length > 1 ? 's' : ''}
                    {activeFiltersCount > 0 && ` (${AgenciesData.length} au total)`}
                </Text>
            </View>
            <FilterButton onPress={setTrue} activeFiltersCount={activeFiltersCount}/>
        </View>
    );

    // @ts-ignore
    const renderGeneralView = () => (
        <Animated.View
            style={[
                styles.tabContent,
                getAnimatedStyle()
            ]}
        >
            {renderFilterButton()}

            <View style={styles.resultsContainer}>
                <Text style={styles.resultsText}>
                    {filteredAgencies.length} agence{filteredAgencies.length > 1 ? 's' : ''} trouvée{filteredAgencies.length > 1 ? 's' : ''}
                </Text>
            </View>

            <FlatList
                data={filteredAgencies}
                keyExtractor={item => item.id.toString()}
                // @ts-ignore
                renderItem={({ item }) => <AgencyCard agency={item} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Aucune agence ne correspond à vos critères</Text>
                        <TouchableOpacity
                            style={styles.resetFiltersButton}
                            onPress={resetFilters}
                        >
                            <Text style={styles.resetFiltersButtonText}>Réinitialiser les filtres</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <AddAgencyModal />

            <AgencyFilterModal
                visible={isFilterModalVisible}
                onClose={() => setIsFilterModalVisible(false)}
                onApplyFilters={handleApplyFilters}
                // @ts-ignore
                agencies={AgenciesData}
                currentFilters={filters}
            />
        </Animated.View>
    );

    // @ts-ignore
    // @ts-ignore
    const renderStatsView = () => (
        <Animated.View
            style={[
                styles.tabContent,
                styles.statsContainer,
                getAnimatedStyle()
            ]}
        >

            <AgencyStatistics
                // @ts-ignore
                agencies={AgenciesData} />

        </Animated.View>
    );

    return (
        <View style={styles.mainContainer}>
            {/* Header Section */}
            <PageHeader
                logo="EASY-RENT"
                tabs={tabs}
                activeTab={activeTab}
                // @ts-ignore
                onTabChange={setActiveTab}
                title="Gestion des Agences"
                subtitle="Découvrez et gérez votre réseau d'agences partenaires"
                animatedStyle={getAnimatedStyle()}
            />

            {/* Content Section */}
            <View style={styles.contentContainer}>
                {activeTab === 'general' ? renderGeneralView() : renderStatsView()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    contentContainer: {
        flex: 1,
    },
    tabContent: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(15,16,16,0.08)',
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    statsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    statsSubtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        gap: 12,
        justifyContent: 'space-between',

    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fb',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        flex: 1,
    },
    filterButtonText: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    filterBadge: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    filterBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
    },
    clearFiltersButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ef4444',
    },
    clearFiltersText: {
        color: '#ef4444',
        fontSize: 12,
        fontWeight: '600',
    },
    resultsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    resultsText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    resetFiltersButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    resetFiltersButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
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
});