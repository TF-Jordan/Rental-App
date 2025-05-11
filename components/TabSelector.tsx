// components/TabSelector.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
    titre1: string,
    titre2: string,
    icon1: React.ReactNode,
    icon2: React.ReactNode,
    activeTab: string,
    setActiveTab: (tab: string) => void
};

export default function TabSelector({
                                        titre1, titre2, icon1, icon2, activeTab, setActiveTab
                                    }: ButtonProps) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'general' && styles.activeTab]}
                onPress={() => setActiveTab('general')}
            >
                {icon1}
                <Text style={[styles.tabText, activeTab === 'general' && styles.activeText]}>{titre1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
                onPress={() => setActiveTab('stats')}
            >
                {icon2}
                <Text style={[styles.tabText, activeTab === 'stats' && styles.activeText]}>{titre2}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 16,
        flex: 1,
        justifyContent: 'center',
        marginRight:12,
        marginLeft:12

    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
