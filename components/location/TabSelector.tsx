import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import {Colors} from "@/utils/colors";

interface TabSelectorProps {
    activeTab: 'info' | 'documents' | 'ride';
    setActiveTab: (tab: 'info' | 'documents' | 'ride') => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
    const tabData = [
        { id: 'info', label: 'Informations' },
        { id: 'documents', label: 'Documents' },
        { id: 'ride', label: 'Trajet' }
    ];

    const indicatorPosition = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        const activeIndex = tabData.findIndex(tab => tab.id === activeTab);
        Animated.spring(indicatorPosition, {
            toValue: activeIndex,
            useNativeDriver: true,
            stiffness: 180,
            damping: 20,
        }).start();
    }, [activeTab]);

    const translateX = indicatorPosition.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 120, 240] // Ajustez selon la largeur de vos onglets
    });

    return (
        <>
            <View style={styles.container}>
                <View style={styles.tabsContainer}>
                    {tabData.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.tab}
                            onPress={() => setActiveTab(tab.id as 'info' | 'documents' | 'ride')}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === tab.id && styles.activeTabText
                            ]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Animated.View
                    style={[
                        styles.indicator,
                        { transform: [{ translateX }] }
                    ]}
                />
            </View>
        </>

);
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
        paddingHorizontal: 20,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.background,
        borderRadius: 10,
        padding: 5,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },
    tabText: {
        fontSize: 14,
        color: Colors.border,
        fontWeight: '500',
    },
    activeTabText: {
        color: '#2c3e50',
        fontWeight: '600',
    },
    indicator: {
        position: 'absolute',
        bottom: -3,
        left: 20,
        width: 90, // Ajustez selon la largeur de vos onglets
        height: 3,
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
});

export default TabSelector;