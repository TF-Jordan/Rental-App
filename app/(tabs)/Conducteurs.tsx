import React, { useState } from 'react';
import {FlatList, View, Text, StyleSheet, Animated} from 'react-native';
import {Entypo, Feather} from '@expo/vector-icons';
import driversData from '@/assets/Drivers/drivers.json';
import DriverCard from "@/components/Driver/DriverCard";
import usePageAnimation from "@/hooks/usePageAnimation";
import GraphStatCar from "@/components/dashboard/GraphStat";
import PageHeader from "@/components/General/PageView/PageHeader";
import AddDriverModal from "@/components/Driver/AddDriver/AddDriverModal";

export default function Drivers() {
    const [activeTab, setActiveTab] = useState('general');
    const {getAnimatedStyle} = usePageAnimation();

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


    // Rendu de la vue générale
    const renderGeneralView = () => (
        <Animated.View
            style={[
                styles.statsContainer,
                getAnimatedStyle()
            ]}>
            <FlatList
                data={driversData}
                keyExtractor={item => item.id}
                // @ts-ignore
                renderItem={({ item }) => <DriverCard driver={item} />}
                contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            />
            <AddDriverModal/>
        </Animated.View>
    );

    // Rendu de la vue statistique
    const renderStatsView = () => (
        <Animated.View
            style={[
                styles.graphContainer,
                getAnimatedStyle()
            ]}
        >
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Analyse détaillée</Text>
                <Text style={styles.sectionSubtitle}>Répartition des véhicules</Text>
            </View>
            <GraphStatCar enService={45} autre={40} indisponible={15} total={100} />
        </Animated.View>
    );

    // Rendu final de la page
    return (
        <View style={styles.mainContainer}>
            {/* Header Section - reste en place */}
            <PageHeader
                logo="EASY-RENT"
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                title={"Gestion des Conducteurs"}
                animatedStyle={getAnimatedStyle()}
            />

            {/* Content Section - SANS ScrollView */}
            <View style={styles.contentContainer}>
                {activeTab === 'general' && renderGeneralView()}
                {activeTab === 'stats' && renderStatsView()}
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
    statsContainer: {
        flex: 1,
        paddingTop: 20,
    },
    graphContainer: {
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
});