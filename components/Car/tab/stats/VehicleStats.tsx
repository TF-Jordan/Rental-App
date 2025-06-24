// components/Car/VehicleStats.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {GraphCard} from "@/utils/types/ChartTypes";
import { useVehicleStats} from "@/components/Car/tab/stats/useVehicleStats";
import { vehiclesData as vehicles } from '@/assets/Car/data';



const VehicleStats= () => {
    const stats = useVehicleStats(vehicles);

    if (!vehicles || vehicles.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucune donnée de véhicule disponible</Text>
            </View>
        );
    }

    // @ts-ignore
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Section Statistiques Financières */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>💰 Statistiques Financières</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{(stats.totalRevenue / 1000).toFixed(1)}K</Text>
                        <Text style={styles.statLabel}>Revenu total (FCFA)</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{(stats.averageRevenuePerVehicle / 1000).toFixed(1)}K</Text>
                        <Text style={styles.statLabel}>Revenu moyen/véhicule</Text>
                    </View>
                </View>
            {/* Section Statistiques d'Utilisation */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📊 Statistiques d&#39;Utilisation</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{stats.occupancyRate.toFixed(1)}%</Text>
                        <Text style={styles.statLabel}>Taux d&#39;occupation</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{stats.averageRentalDuration}</Text>
                        <Text style={styles.statLabel}>Durée moyenne (jours)</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{stats.availabilityRate.toFixed(1)}%</Text>
                        <Text style={styles.statLabel}>Disponibilité</Text>
                    </View>
                </View>

                {/* Section Satisfaction Client */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>⭐ Satisfaction Client</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>{stats.averageRating.toFixed(1)}/5</Text>
                            <Text style={styles.statLabel}>Note moyenne</Text>
                        </View>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        <GraphCard
                            theme="Neon Orange"
                            data={stats.ratingDistribution}
                            title="Distribution des Notes"
                            chartType="line"
                            height={220}
                        />
                    </ScrollView>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <GraphCard
                    theme="Ocean Blue"
                    data={stats.statusDistribution}
                    title="Répartition des Statuts"
                    chartType="progress"
                    height={200}
                />
                    </ScrollView>
            </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <GraphCard
                    theme="Nature Green"
                    data={stats.monthlyRevenue}
                    title="Évolution du Revenu Mensuel"
                    chartType="line"
                    height={220}
                />
                    </ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <GraphCard
                    theme="Sunset Orange"
                    data={stats.topEarningVehicles}
                    title="Top 5 - Véhicules les Plus Rentables"
                    chartType="bar"
                    height={220}
                />
                    </ScrollView>
            </View>

            {/* Section Engagement Social */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>❤️ Engagement Social</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <GraphCard
                    theme="Fire Red"
                    data={stats.topLikedVehicles}
                    title="Top 5 - Véhicules les Plus Likés"
                    chartType="bar"
                    height={220}
                />
                    </ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <GraphCard
                    theme="Electric Blue"
                    data={stats.engagementStats}
                    title="Taux d'Engagement Global"
                    chartType="progress"
                    height={200}
                />
                    </ScrollView>

                {stats.sharesPlatforms.labels.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <GraphCard
                        theme="Matrix Green"
                        data={stats.sharesPlatforms}
                        title="Plateformes de Partage"
                        chartType="progress"
                        height={200}
                    />
                        </ScrollView>
                )}
            </View>

            {/* Section Performance Opérationnelle */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>🔧 Performance Opérationnelle</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <GraphCard
                    theme="Dark Mode"
                    data={stats.maintenanceFrequency}
                    title="Fréquence de Maintenance par Véhicule"
                    chartType="bar"
                    height={220}
                />
                    </ScrollView>
            </View>


            {/* Section Préférences Clients */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎯 Préférences Clients</Text>

                {stats.popularBrands.labels.length > 0 && (
                    <GraphCard
                        theme="Clean White"
                        data={stats.popularBrands}
                        title="Marques Populaires"
                        chartType="progress"
                        height={200}
                    />
                )}

                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <GraphCard
                    theme="Ocean Blue"
                    data={stats.popularFeatures}
                    title="Fonctionnalités les Plus Demandées"
                    chartType="bar"
                    height={220}
                />
                </ScrollView>

                {stats.typeDistribution.labels.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >


                    <GraphCard
                        theme="Nature Green"
                        data={stats.typeDistribution}
                        title="Répartition par Type"
                        chartType="progress"
                        height={200}
                    />
                    </ScrollView>
                )}
            </View>

            <View style={styles.bottomSpacing} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fb',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        paddingLeft: 8,
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 8,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    bottomSpacing: {
        height: 32,
    },
});

export default VehicleStats;