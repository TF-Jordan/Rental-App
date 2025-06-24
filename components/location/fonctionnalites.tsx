import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextCard from "@/components/location/TextCard";
import {Colors} from '@/utils/colors'

interface FeaturesCardProps {
    functionalities?: {
        air_condition: boolean;
        usb_input: boolean;
        seat_belt: boolean;
        audio_input: boolean;
        child_seat: boolean;
        bluetooth: boolean;
        sleeping_bed: boolean;
        onboard_computer: boolean;
        gps: boolean;
        luggage: boolean;
        water: boolean;
        additional_covers: boolean;
    };
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ functionalities }) => {
    if (!functionalities) return null;

    // Tableau des fonctionnalités à afficher
    const activeFeatures = [
        { key: 'air_condition', label: 'Climatisation' },
        { key: 'usb_input', label: 'Ports USB' },
        { key: 'seat_belt', label: 'Ceintures' },
        { key: 'audio_input', label: 'Entrée audio' },
        { key: 'child_seat', label: 'Siège enfant' },
        { key: 'bluetooth', label: 'Bluetooth' },
        { key: 'sleeping_bed', label: 'Lit dormant' },
        { key: 'onboard_computer', label: 'Ordinateur de bord' },
        { key: 'gps', label: 'GPS' },
        { key: 'luggage', label: 'Coffre' },
        { key: 'water', label: 'Bouteilles d\'eau' },
        { key: 'additional_covers', label: 'Couvre-sols' },
    ].filter(feature => functionalities[feature.key as keyof typeof functionalities]);

    if (activeFeatures.length === 0) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fonctionnalités</Text>

            <View style={styles.featuresGrid}>
                {activeFeatures.map((feature) => (
                    <View key={feature.key} style={styles.featureItem}>
                        <TextCard text={feature.label}/>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#2c3e50',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginBottom: 10,
    },
    featureText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#34495e',
    },
});

export default FeaturesCard;