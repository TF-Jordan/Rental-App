// app/tabs/Dashboard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
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
                title={"Dashboard"}
                onTabChange={setActiveTab}
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

    cardContainer: {
        flex: 1,
        marginHorizontal: 6,
    },
});