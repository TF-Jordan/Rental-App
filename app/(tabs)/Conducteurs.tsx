import React, { useState, useMemo } from 'react';
import {FlatList, View, Text, StyleSheet, Animated, ScrollView} from 'react-native';
import {Entypo, Feather} from '@expo/vector-icons';
import driversData from '@/assets/Drivers/drivers.json';
import DriverCard from "@/components/Driver/DriverCard";
import FilterModal from "@/components/Driver/DriverFilterModal";
import AddDriverModal from "@/components/Driver/AddDriverModalForm";
import {Colors} from "@/utils/colors";
import usePageAnimation from "@/hooks/usePageAnimation";
import GraphStatCar from "@/components/dashboard/GraphStat";
import PageHeader from "@/components/General/PageView/PageHeader";
import FloatingButton from "@/components/General/FloatingButton";


export default function Drivers() {
    const [activeTab, setActiveTab] = useState('general');
    const {getAnimatedStyle}=usePageAnimation();

    //configuration des tabs
    const tabs=[
        {
            key:'general',
            title:'Vue Générale',
            icon: <Entypo name="grid" size={16} />
        },
        {
            key:'stats',
            title:'Statistiques',
            icon: <Feather name="bar-chart-2" size={16} />
        }
    ]

    //etats du filtre
    const defaultFilters = { ageRange: [0, 100] as [number, number], ratingRange: [0, 5] as [number, number], location: '' };
    const [filters, setFilters] = useState(defaultFilters);
    const [modalVisible, setModalVisible] = useState(false);
    // pour appliquer le filtre
    const applyFilter = (newFilters: typeof filters) => setFilters(newFilters);
    //extrait les données filtrés
    const filteredDrivers = useMemo(() => {
        return driversData
            .filter(d => d.age >= filters.ageRange[0] && d.age <= filters.ageRange[1])
            .filter(d => d.rating >= filters.ratingRange[0] && d.rating <= filters.ratingRange[1])
            .filter(d => !filters.location || d.address.includes(filters.location));
    }, [filters]);


    //rendu de la vue generale
    const renderGeneralView = () => (
        <Animated.View
            style={[
                styles.statsContainer,
                getAnimatedStyle()
            ]}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={filteredDrivers}
                    keyExtractor={item => item.id}
                    // @ts-ignore
                    renderItem={({ item }) => <DriverCard driver={item} />}
                    contentContainerStyle={{ padding: 16 }}
                />

                <FloatingButton onPress={()=>setModalVisible(true)} title={undefined} iconName={"plus"}></FloatingButton>

                <FilterModal
                    visible={modalVisible}
                    filters={filters}
                    // @ts-ignore
                    onChange={applyFilter}
                    onClose={() => setModalVisible(false)}
                    onClear={() => applyFilter(defaultFilters)}/>
                <AddDriverModal/>

            </View>
        </Animated.View>
    );

    //rendu de la vue statistique
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


    //rendu final de la page
    return (
        <View style={styles.mainContainer}>
            {/* Header Section */}
            <PageHeader
                logo="EASY-RENT"
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                title="Vos Conducteurs"
                subtitle="Aperçue générale de vos conducteurs"
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
    floatButton: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, elevation: 5 },
    floatButtonText: { color: '#fff', fontWeight: '600' },

});

