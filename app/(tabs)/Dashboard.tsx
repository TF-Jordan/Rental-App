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

                <Text style={styles.title}>Tableau de bord</Text>
                <Text style={styles.subtitle}>
                    Aperçu de la performance et des statistiques de votre compagnie
                </Text>
            </View>

            <ScrollView style={styles.container}>
                {/* Affichage conditionnel de la vue en fonction de l'onglet sélectionné */}
                {activeTab === 'general' && (
                    <>
                        <StatCard label="Véhicules" bodyText="70" bottomText='25% depuis le mois dernier' icon={<FontAwesome5 name="car" size={24} color="#00BFFF" />} />
                        <StatCard label="Chauffeurs" bodyText="20" bottomText='25% depuis le mois dernier' icon={<Feather name="user" size={24} color="#00BFFF" />} />
                        <StatCard label="Revenus" bodyText="1008776 XAF" bottomText='25% depuis le mois dernier' icon={<MaterialIcons name="attach-money" size={24} color="#00BFFF" />} />
                        <StatCard label="Revenus" bodyText="20" bottomText='25% depuis le mois dernier' icon={<Feather name="bar-chart-2" size={24} color="#00BFFF" />} />
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
