import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { DriverProps as Driver } from "@/utils/types/DriverProps";

interface DriverDocumentsSectionProps {
    driver: Driver;
}

export default function DriverDocumentsSection({ driver }: DriverDocumentsSectionProps) {
    if (!driver.documents) return null;

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="folder" size={24} color="#3B82F6" />
                <Text style={styles.sectionTitle}>Documents</Text>
            </View>
            <View style={styles.sectionContent}>
                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="id-badge" size={16} color="#60A5FA" />
                    </View>
                    <View>
                        <Text style={styles.infoLabel}>CNI</Text>
                        <Text style={styles.infoText}>{driver.documents.id_card}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="id-card" size={16} color="#60A5FA" />
                    </View>
                    <View>
                        <Text style={styles.infoLabel}>Permis</Text>
                        <Text style={styles.infoText}>{driver.documents.driver_licence}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

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
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: '#F1F5F9',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginLeft: 12,
        letterSpacing: 0.3,
    },
    sectionContent: {
        padding: 20,
    },
    infoRow: {
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
    infoLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    infoText: {
        fontSize: 16,
        color: '#334155',
        fontWeight: '500',
        lineHeight: 22,
    },
});