import React, { useState, useMemo } from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import Cars from "@/assets/Car/cars.json";

import VehicleGeneralView from '@/components/Car/tab/general/VehicleGeneralView';
import VehicleStatsView from '@/components/Car/tab/stats/VehicleStatsView';
import PageHeader from "@/components/General/PageView/PageHeader";


export default function Vehicles() {
    const [activeTab, setActiveTab] = useState<'general' | 'stats'>('general');


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




    const add=()=>{
        Alert.alert("Bien")
    }

    // @ts-ignore
    return (
        <View style={styles.container}>
                <PageHeader
                    logo="EASY-RENT"
                    tabs={tabs}
                    activeTab={activeTab}
                    title={"Gestion des véhicules"}
                    // @ts-ignore
                    onTabChange={setActiveTab}
                />

            {activeTab === 'general' ? (
                <VehicleGeneralView/>
            ) : (
                <VehicleStatsView/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb' // Couleur de fond subtile
    },
    headerSection: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(15,16,16,0.08)'
    }
});