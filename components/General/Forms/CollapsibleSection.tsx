//composant de bloc de champs de formulaires depliable

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



/**
 * CollapsibleSection
 *
 * Composant de section dépliable (accordéon) utilisé pour regrouper des champs de formulaire ou du contenu
 * dans un bloc repliable. Très utile pour structurer des interfaces complexes ou longues.
 *
 * @param {string} title - Le titre affiché dans l'en-tête de la section.
 * @param {React.ReactNode} icon - Icône affichée à gauche du titre.
 * @param {boolean} isExpanded - Indique si la section est actuellement dépliée.
 * @param {() => void} onToggle - Fonction appelée lorsqu'on clique sur l'en-tête pour ouvrir/fermer la section.
 * @param {React.ReactNode} children - Contenu de la section (affiché uniquement si isExpanded est vrai).
 *
 * @example
 * <CollapsibleSection
 *   title="Détails du moteur"
 *   icon={<FontAwesome5 name="cogs" size={18} color="#3B82F6" />}
 *   isExpanded={expandedSections.engine}
 *   onToggle={() => toggleSection('engine')}
 * >
 *   <Text>Type, puissance, cylindrée, etc.</Text>
 * </CollapsibleSection>
 */




// @ts-ignore
export default function CollapsibleSection({ title, icon, children, isExpanded, onToggle }){
    return (
        <View style={styles.sectionContainer}>
            <TouchableOpacity
                style={styles.sectionHeader}
                onPress={onToggle}
                activeOpacity={0.7}
            >
                <View style={styles.sectionHeaderLeft}>
                    <View style={styles.iconContainer}>
                        {icon}
                    </View>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <AntDesign
                    name={isExpanded ? "up" : "down"}
                    size={20}
                    color="#666"
                />
            </TouchableOpacity>
            {isExpanded && (
                <View style={styles.sectionContent}>
                    {children}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    sectionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EBF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    sectionContent: {
        padding: 16,
    },
});
