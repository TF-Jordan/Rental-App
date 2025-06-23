// components/Agency/StatusBadge.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
    statusInfo: {
        text: string;       // Texte à afficher (ex: "Ouverte", "Fermée")
        bgColor: string;    // Couleur d'arrière-plan du badge
    };
}

/**
 * StatusBadge (Agence)
 *
 * Ce composant affiche un badge coloré représentant le statut de l'agence.
 * Il utilise le style et la logique cohérente avec le badge des véhicules.
 *
 * Exemples :
 * - { text: "Ouverte", bgColor: "#10B981" }
 * - { text: "Fermée", bgColor: "#EF4444" }
 */
export default function StatusBadge({ statusInfo }: StatusBadgeProps) {
    return (
        <View style={[styles.container, { backgroundColor: statusInfo.bgColor }]}>
            <View style={styles.dot} />
            <Text style={styles.text}>{statusInfo.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginRight: 6,
    },
    text: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});
