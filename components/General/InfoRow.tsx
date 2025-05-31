import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface InfoRowProps {
    iconName: string;
    iconType?: 'material' | 'fontawesome';
    label: string;
    value: string;
}

export default function InfoRow({
                                    iconName,
                                    iconType = 'fontawesome',
                                    label,
                                    value
                                }: InfoRowProps) {
    const IconComponent = iconType === 'material' ? MaterialIcons : FontAwesome5;

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <IconComponent name={iconName as any} size={16} color="#60A5FA" />
            </View>
            <View>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EBF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    label: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        color: '#334155',
        fontWeight: '500',
        lineHeight: 22,
    },
});