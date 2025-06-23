import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface VehicleSectionProps {
    title: string;
    iconName: string;
    iconType?: 'material' | 'fontawesome' | 'materialcommunity';
    children: React.ReactNode;
}

const VehicleSection = ({
                            title,
                            iconName,
                            iconType = 'material',
                            children
                        }: VehicleSectionProps) => {
    const IconComponent = iconType === 'material' ? MaterialIcons :
        iconType === 'fontawesome' ? FontAwesome5 :
            MaterialCommunityIcons;

    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <IconComponent
                    name={iconName}
                    size={24}
                    color="#3B82F6"
                />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: '#F1F5F9',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginLeft: 12,
        letterSpacing: 0.3,
    },
    content: {
        padding: 20,
        display: 'flex',
    },
});

export default VehicleSection;