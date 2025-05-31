// app/tabs/Dashboard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatCard from "@/components/dashboard/StatCard";
import GraphStatCar from "@/components/dashboard/GraphStat";
import PageHeader from "@/components/General/PageView/PageHeader";
import usePageAnimation from "@/hooks/usePageAnimation";
import { Colors } from '@/utils/colors';

import { FontAwesome5, MaterialIcons, Feather, Entypo } from '@expo/vector-icons';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('general');
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

    const renderGeneralView = () => (
        <Animated.View
            style={[
                styles.statsContainer,
                getAnimatedStyle()
            ]}
        >
            {/* Section title */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Statistiques principales</Text>
                <Text style={styles.sectionSubtitle}>Données en temps réel</Text>
            </View>

                <View style={styles.cardContainer}>
                    <StatCard
                        title="Véhicules"
                        value="70"
                        subtitle='25% depuis le mois dernier'
                        icon={<FontAwesome5 name="car" size={20} color={Colors.primary} />}
                    />
                </View>
                <View style={styles.cardContainer}>
                    <StatCard
                        title="Chauffeurs"
                        value="20"
                        subtitle='15% depuis le mois dernier'
                        icon={<Feather name="user" size={20} color={Colors.primary} />}
                    />
                <View style={styles.cardContainer}>
                    <StatCard
                        title="Revenus"
                        value="1.008M XAF"
                        subtitle='32% depuis le mois dernier'
                        icon={<MaterialIcons name="attach-money" size={20} color={Colors.primary} />}
                    />
                </View>
                <View style={styles.cardContainer}>
                    <StatCard
                        title="Commandes"
                        value="247"
                        subtitle='18% depuis le mois dernier'
                        icon={<Feather name="bar-chart-2" size={20} color={Colors.primary} />}
                    />
                </View>
            </View>
        </Animated.View>
    );

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

    return (
        <View style={styles.mainContainer}>
            {/* Header Section */}
            <PageHeader
                logo="EASY-RENT"
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                title="Tableau de bord"
                subtitle="Aperçu de la performance et des statistiques de votre compagnie"
                animatedStyle={getAnimatedStyle()}
            />

            {/* Content Section */}
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {activeTab === 'general' && renderGeneralView()}
                {activeTab === 'stats' && renderStatsView()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    statsContainer: {
        paddingTop: 20,
        paddingHorizontal: 16,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: 6,
    },
    summarySection: {
        marginTop: 20,
        marginBottom: 10,
    },
    summaryCard: {
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 4,
    },
    summaryContent: {
        alignItems: 'center',
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 16,
    },
    summaryIndicator: {
        width: '100%',
        alignItems: 'center',
    },
    progressBar: {
        width: '80%',
        height: 6,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: Colors.primary,
        fontWeight: '600',
    },
});