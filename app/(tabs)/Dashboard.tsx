// app/tabs/Dashboard.tsx
import React, { useState } from 'react';
import { View,StyleSheet, ScrollView, Animated } from 'react-native';
import GraphStatCar from "@/components/dashboard/GraphStat";
import PageHeader from "@/components/General/PageView/PageHeader";
import usePageAnimation from "@/hooks/usePageAnimation";
import AgenciesData from "@/assets/Agency/agencies.json";
import {Feather, Entypo } from '@expo/vector-icons';
import AgencyStatistics from "@/components/Agency/AgencyStatComponents";
import VehicleStats from "@/components/Car/tab/stats/VehicleStats";

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
               <>
                  <VehicleStats/>
                   <AgencyStatistics agencies={AgenciesData}/>
               </>
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