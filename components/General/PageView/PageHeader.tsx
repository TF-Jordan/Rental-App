import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HEADER from "@/components/General/Header";
import TabSelector from "@/components/General/TabSelector";
import { Colors } from '@/utils/colors';

interface Tab {
    key: string;
    title: string;
    icon: React.ReactNode;
}

interface PageHeaderProps {
    // Props pour le logo
    logo?: string;

    // Props pour les tabs (optionnel)
    tabs?: Tab[];
    activeTab?: string;
    onTabChange?: (tab: string) => void;

    // Props pour le titre
    title: string;
    subtitle?: string;

    // Props pour l'animation
    animatedStyle?: any;

    // Props pour la personnalisation
    showDecorative?: boolean;
    gradientColors?: string[];
    headerStyle?: any;
}

export default function PageHeader({
                                       logo = 'EASY-RENT',
                                       tabs,
                                       activeTab,
                                       onTabChange,
                                       title,
                                       subtitle,
                                       animatedStyle,
                                       showDecorative = true,
                                       gradientColors = ['#FFFFFF', '#F8FAFC'],
                                       headerStyle,
                                   }: PageHeaderProps) {

    const renderTabSelector = () => {
        if (!tabs || tabs.length < 2) return null;

        const [tab1, tab2] = tabs;

        // @ts-ignore
        return (
            <TabSelector
                titre1={tab1.title}
                titre2={tab2.title}
                // @ts-ignore
                icon1={React.cloneElement(tab1.icon as React.ReactElement, {
                    color: activeTab === tab1.key ? Colors.primary : '#64748B'
                })}
                // @ts-ignore
                icon2={React.cloneElement(tab2.icon as React.ReactElement, {
                    color: activeTab === tab2.key ? Colors.primary : '#64748B'
                })}
                // @ts-ignore
                activeTab={activeTab}
                // @ts-ignore
                setActiveTab={onTabChange}
            />
        );
    };

    return (
        <LinearGradient
            colors={gradientColors}
            style={[styles.headerSection, headerStyle]}
        >
            <HEADER logo={logo} />

            <View style={styles.headerContent}>
                {renderTabSelector()}

                <Animated.View
                    style={[
                        styles.titleContainer,
                        animatedStyle
                    ]}
                >
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.titleUnderline} />
                    {subtitle && (
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    )}
                </Animated.View>
            </View>

            {/* Decorative elements */}
            {showDecorative && (
                <>
                    <View style={styles.decorativeCircle1} />
                    <View style={styles.decorativeCircle2} />
                </>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerSection: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
        position: 'relative',
        overflow: 'hidden',
    },
    headerContent: {
        paddingTop: 8,
    },
    titleContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1E293B',
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    titleUnderline: {
        width: 60,
        height: 3,
        backgroundColor: Colors.primary,
        borderRadius: 2,
        marginTop: 8,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
        fontWeight: '500',
    },
    decorativeCircle1: {
        position: 'absolute',
        top: -50,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.primary + '08',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -40,
        left: -20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.secondary + '06',
    },
});