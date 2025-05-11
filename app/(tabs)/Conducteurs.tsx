// app/tabs/Dashboard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import HEADER from "@/components/Header";
import StatCard from "@/components/dashboard/StatCard";
import TabSelector from "@/components/TabSelector";
import GraphStatCar from "@/components/dashboard/GraphStat";

import { FontAwesome5, MaterialIcons, Feather, Entypo } from '@expo/vector-icons';

export default function Dashboard() {
    const { width } = useWindowDimensions();
    const [activeTab, setActiveTab] = useState('general'); // Gérer l'onglet actif

    return (
        <>
            <HEADER logo='EASY-RENT' />
            <View style={{ backgroundColor: '#fff' }}>
                {/* On passe l'état 'activeTab' et 'setActiveTab' au composant TabSelector */}
                <TabSelector
                    titre1={"Vue Générale"}
                    titre2={"Statistiques"}
                    icon1={<Entypo name="grid" size={16} color={activeTab === 'general' ? '#00bfff' : '#000'} />}
                    icon2={<Feather name="bar-chart-2" size={16} color={activeTab === 'stats' ? '#00BFFF' : '#000'} />}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab} // Permet de gérer l'état d'activation
                />

                <Text style={styles.title}>Vos conducteurs</Text>
                <Text style={styles.subtitle}>
                    Une vue générale de vos conducteurs
                </Text>
            </View>

            <ScrollView style={styles.container}>
                {/* Affichage conditionnel de la vue en fonction de l'onglet sélectionné */}
                {activeTab === 'general' && (
                    <>
                    </>
                )}
                {activeTab === 'stats' && (
                    <GraphStatCar enService={45} autre={40} indisponible={15} total={100} />
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },

    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },
});
