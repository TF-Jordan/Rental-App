// components/TabSelector.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';

export default function TabSelector() {
    const [active, setActive] = useState('general');

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, active === 'general' && styles.activeTab]}
                onPress={() => setActive('general')}
            >
                <Entypo name="grid" size={16} color={active === 'general' ? '#00BFFF' : '#000'} />
                <Text style={[styles.tabText, active === 'general' && styles.activeText]}>Vue Générale</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, active === 'stats' && styles.activeTab]}
                onPress={() => setActive('stats')}
            >
                <Feather name="bar-chart-2" size={16} color={active === 'stats' ? '#00BFFF' : '#000'} />
                <Text style={[styles.tabText, active === 'stats' && styles.activeText]}>Statistiques</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 16,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
        marginRight: 12,
    },
    activeTab: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#00BFFF',
    },
    tabText: {
        marginLeft: 6,
        fontWeight: '500',
    },
    activeText: {
        color: '#00BFFF',
    },
});
