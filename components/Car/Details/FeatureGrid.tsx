import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';


/**
 * FeatureGrid – Composant d'affichage de fonctionnalités
 *
 * Ce composant React Native permet d'afficher une **grille de fonctionnalités** représentées
 * par des icônes et des libellés. Chaque fonctionnalité peut être **active** ou **inactive**,
 * ce qui est visuellement reflété par un changement de style (couleurs, arrière-plan, etc.).
 *
 * ## 🔧 Structure du composant
 * Le composant est structuré comme suit :
 * - `FeatureGridProps` : Interface des propriétés attendues (props).
 * - `iconMap` : Dictionnaire interne associant chaque clé de fonctionnalité à une icône FontAwesome5.
 * - `renderFeatureItem()` : Fonction interne qui retourne une "carte" visuelle (icône + texte) pour chaque fonctionnalité.
 * - `return` : La vue principale du composant, une `View` contenant toutes les fonctionnalités affichées sous forme de grille responsive.
 *
 * ## 📥 Props attendues
 * *@typedef FeatureGridProps
 * @property {Object.<string, boolean>} features
 * - Objet dont **chaque clé est un identifiant de fonctionnalité** (en snake_case),
 *   et **chaque valeur est un booléen** (`true` = actif, `false` = inactif).
 *
 * Exemple :
 * ```ts
 * features = {
 *   air_condition: true,
 *   bluetooth: false,
 *   gps: true
 * }
 * ```
 *
 * Les clés doivent correspondre à celles définies dans le `iconMap` du composant,
 * faute de quoi une icône par défaut (`check`) sera utilisée.
 *
 * ## 🎯 Rôle des éléments internes
 *
 * - `iconMap`: Permet de **lier une fonctionnalité à une icône FontAwesome5** (ex: `"gps"` → `"map-marker-alt"`).
 * - `renderFeatureItem()`: Génère l'affichage visuel (icône + libellé) pour chaque fonctionnalité,
 *   avec un **style différent si la fonctionnalité est inactive**.
 * - `styles`: Ensemble de styles utilisés pour l’alignement, les couleurs, l'espacement, et la visibilité des éléments.
 *
 * ## 💡 Exemple d’utilisation
 * ```tsx
 * <FeatureGrid
 *   features={{
 *     air_condition: true,
 *     usb_input: false,
 *     seat_belt: true,
 *     bluetooth: true
 *   }}
 * />
 * ```
 * Ce composant affichera 4 fonctionnalités :
 * - Climatisation (active)
 * - Port USB (inactif)
 * - Ceinture (active)
 * - Bluetooth (active)
 *
 * ## 📦 Retour
 * @returns {JSX.Element}
 * Une grille de fonctionnalités visuellement représentée avec des icônes et du texte,
 * avec indication claire des fonctionnalités actives/inactives.
 */




interface FeatureGridProps {
    features: { [key: string]: boolean };
}

export default function FeatureGrid({ features }: FeatureGridProps) {
    const iconMap: { [key: string]: string } = {
        air_condition: 'snowflake',
        usb_input: 'usb',
        seat_belt: 'shield-alt',
        audio_input: 'music',
        child_seat: 'baby',
        bluetooth: 'bluetooth-b',
        gps: 'map-marker-alt',
        luggage: 'suitcase',
        water: 'tint',
    };

    const renderFeatureItem = (feature: string, isActive: boolean) => (
        <View key={feature} style={[styles.featureItem, !isActive && styles.featureInactive]}>
            <FontAwesome5
                name={iconMap[feature] || 'check'}
                size={16}
                color={isActive ? '#60A5FA' : '#94A3B8'}
            />
            <Text style={[styles.featureText, !isActive && styles.featureTextInactive]}>
                {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {Object.entries(features).map(([key, value]) =>
                renderFeatureItem(key, value)
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#EBF4FF',
        borderRadius: 10,
    },
    featureInactive: {
        backgroundColor: '#F8FAFC',
    },
    featureText: {
        marginLeft: 8,
        fontSize: 12,
        color: '#334155',
        fontWeight: '500',
    },
    featureTextInactive: {
        color: '#94A3B8',
    },
});