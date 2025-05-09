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
                <Entypo name="grid" size={16} color={active === 'general' ? '#00bfff' : '#000'} />
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
        alignItems:'center',
        alignContent:'center',
        padding: 16,
        flex:1,
        justifyContent:'center',

    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
        marginRight: 12,
        width: '50%',
        height: 50,
        borderWidth: 1,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,

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
