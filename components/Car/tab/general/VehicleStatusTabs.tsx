import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from "@/utils/colors";
import VehicleList from './VehicleList';

interface VehicleStatusTabsProps {
    vehicles: any[];
    currentUserId?: number;
}


interface StatusTab {
    key: string;
    label: string;
    count: number;
    color: string;
}

export default function VehicleStatusTabs({
                                              vehicles, currentUserId
                                          }: VehicleStatusTabsProps) {
    const [activeStatusTab, setActiveStatusTab] = useState<string>('all');

    // Génération dynamique des onglets de statut
    const statusTabs = useMemo(() => {
        const statusCounts = vehicles.reduce((acc, vehicle) => {
            const status = vehicle.available ? 'available' : 'unavailable';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const tabs: StatusTab[] = [
            {
                key: 'all',
                label: 'Tous',
                count: vehicles.length,
                color: Colors.primary
            }
        ];

        // Ajouter les onglets de statut dynamiquement
        if (statusCounts.available > 0) {
            tabs.push({
                key: 'available',
                label: 'Disponibles',
                count: statusCounts.available,
                color: '#10B981' // Vert
            });
        }

        if (statusCounts.unavailable > 0) {
            tabs.push({
                key: 'unavailable',
                label: 'Indisponibles',
                count: statusCounts.unavailable,
                color: '#EF4444' // Rouge
            });
        }

        return tabs;
    }, [vehicles]);

    // Filtrer les véhicules selon l'onglet actif
    const vehiclesByStatus = useMemo(() => {
        if (activeStatusTab === 'all') {
            return vehicles;
        }
        return vehicles.filter(vehicle => {
            switch (activeStatusTab) {
                case 'available':
                    return vehicle.available === true;
                case 'unavailable':
                    return vehicle.available === false;
                default:
                    return true;
            }
        });
    }, [vehicles, activeStatusTab]);

    return (
        <View style={styles.container}>
            {/* Onglets de statut */}
            <View style={styles.tabsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsScrollContent}
                >
                    {statusTabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            style={[
                                styles.statusTab,
                                activeStatusTab === tab.key && [
                                    styles.activeStatusTab,
                                    { borderBottomColor: tab.color }
                                ]
                            ]}
                            onPress={() => setActiveStatusTab(tab.key)}
                        >
                            <Text style={[
                                styles.statusTabText,
                                activeStatusTab === tab.key && [
                                    styles.activeStatusTabText,
                                    { color: tab.color }
                                ]
                            ]}>
                                {tab.label}
                            </Text>
                            <View style={[
                                styles.statusBadge,
                                activeStatusTab === tab.key && { backgroundColor: tab.color }
                            ]}>
                                <Text style={[
                                    styles.statusBadgeText,
                                    activeStatusTab === tab.key && styles.activeStatusBadgeText
                                ]}>
                                    {tab.count}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Liste des véhicules */}
            <VehicleList
                vehicles={vehiclesByStatus}
                currentUserId={currentUserId || 1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabsContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginBottom: 8
    },
    tabsScrollContent: {
        paddingHorizontal: 16,
    },
    statusTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginRight: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeStatusTab: {
        borderBottomWidth: 2,
    },
    statusTabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        marginRight: 8,
    },
    activeStatusTabText: {
        fontWeight: '600',
    },
    statusBadge: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 24,
        alignItems: 'center',
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    activeStatusBadgeText: {
        color: '#fff',
    }
});