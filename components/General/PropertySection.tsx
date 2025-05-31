import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface AgencySectionProps {
    title: string;
    iconName: string;
    iconType?: 'material' | 'fontawesome';
    children: React.ReactNode;
}

/**
 * PropertySection
 *
 * Conteneur visuel utilisé pour organiser les sections de détail d’une agence (ex: Informations, Avis).
 * Identique à `VehicleSection`, avec possibilité d’afficher une icône Material ou FontAwesome.
 *
 * @param title     - Titre de la section
 * @param iconName  - Nom de l’icône à afficher à gauche
 * @param iconType  - Type d’icône : 'material' ou 'fontawesome' (défaut: 'material')
 * @param children  - Contenu JSX de la section
 */
export default function PropertySection({
                                          title,
                                          iconName,
                                          iconType = 'material',
                                          children,
                                      }: AgencySectionProps) {
    const IconComponent = iconType === 'material' ? MaterialIcons : FontAwesome5;

    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <IconComponent name={iconName as any} size={24} color="#3B82F6" />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
                {children}
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
    },
});
