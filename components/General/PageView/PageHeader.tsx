import React from 'react';
import {View, Text, StyleSheet, Animated, StatusBar} from 'react-native';
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
    logo?: string;
    tabs?: Tab[];
    activeTab?: string;
    onTabChange?: (tab: string) => void;
    animatedStyle?: any;
    title?: string;
    subtitle?: string;
    header?: boolean;
}

export default function PageHeader({header=true,logo = 'EASY-RENT', tabs, activeTab, onTabChange, title, subtitle, animatedStyle}: PageHeaderProps) {

    // @ts-ignore
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#066AFF" />
        <LinearGradient
            colors={['#ffffff', '#ffffff']}
            style={styles.headerSection}
        >
            {header && <HEADER logo={logo} />}
            <Text style={styles.title}>{title}</Text>
            {tabs && tabs.length >= 2 && (
                <TabSelector
                    titre1={tabs[0].title}
                    titre2={tabs[1].title}
                    icon1={React.cloneElement(tabs[0].icon as React.ReactElement, {
                        // @ts-ignore
                        color: activeTab === tabs[0].key ? Colors.primary : '#64748B'
                    })}

                    icon2={React.cloneElement(tabs[1].icon as React.ReactElement, {
                        // @ts-ignore
                        color: activeTab === tabs[1].key ? Colors.primary : '#64748B'
                    })}
                    // @ts-ignore
                    activeTab={activeTab}
                    // @ts-ignore
                    setActiveTab={onTabChange}
                />

            )}
        </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    headerSection: {
        paddingBottom: 20,
        shadowColor: '#000',
        height:"30%",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
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
        fontWeight: '500',
        paddingHorizontal: 20,
    },
});