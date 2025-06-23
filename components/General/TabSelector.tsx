import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/utils/colors';

type ButtonProps = {
    titre1: string;
    titre2: string;
    icon1: React.ReactNode;
    icon2: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

export default function TabSelector({
                                        titre1,
                                        titre2,
                                        icon1,
                                        icon2,
                                        activeTab,
                                        setActiveTab
                                    }: ButtonProps) {
    const animatedValue = new Animated.Value(activeTab === 'general' ? 0 : 1);

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
        Animated.spring(animatedValue, {
            toValue: tab === 'general' ? 0 : 1,
            useNativeDriver: false,
            tension: 120,
            friction: 8,
        }).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {/* Background animé pour l'onglet actif */}
                <Animated.View
                    style={[
                        styles.activeBackground,
                        {
                            transform: [
                                {
                                    translateX: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 180], // Ajustez selon la largeur de vos onglets
                                    }),
                                },
                            ],
                        },
                    ]}
                />

                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => handleTabPress('general')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconContainer, activeTab === 'general' && styles.activeIconContainer]}>
                        {icon1}
                    </View>
                    <Text style={[styles.tabText, activeTab === 'general' && styles.activeText]}>
                        {titre1}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => handleTabPress('stats')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconContainer, activeTab === 'stats' && styles.activeIconContainer]}>
                        {icon2}
                    </View>
                    <Text style={[styles.tabText, activeTab === 'stats' && styles.activeText]}>
                        {titre2}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FB',
        borderRadius: 16,
        padding: 4,
        position: 'relative',
        shadowColor: '#8f2323',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    activeBackground: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: 180,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        width: 180,
        height: 48,
        zIndex: 1,
    },
    iconContainer: {
        marginRight: 8,
        opacity: 0.6,
        transform: [{ scale: 0.9 }],
    },
    activeIconContainer: {
        opacity: 1,
        transform: [{ scale: 1 }],
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6B7280',
        letterSpacing: 0.2,
    },
    activeText: {
        color: Colors.primary,
        fontWeight: '700',
    },
});