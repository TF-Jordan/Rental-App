import React from 'react';
import { View, StyleSheet } from 'react-native';
import VehicleStats from '@/components/Car/tab/stats/VehicleStats';


export default function VehicleStatsView() {
    return (
        <View style={styles.container}>
            <VehicleStats/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb',
    },
});