import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 * FloatingButton
 * ----------------
 * Ce composant représente un bouton flottant personnalisable, souvent utilisé
 * pour déclencher une action rapide comme l'ajout d'un élément.
 * Il combine une icône dans un cercle coloré et un petit texte en dessous.
 *
 * Props :
 * - onPress (function) : Fonction appelée lors du clic/tap sur le bouton.
 * - title (string) : Texte affiché sous l’icône, généralement pour indiquer l’action du bouton.
 * - iconName (string) : Nom de l’icône AntDesign à afficher (ex : "pluscircle", "edit", "camera"...).
 *
 * Exemple d'utilisation :
 * ```tsx
 * import FloatingButton from './FloatingButton';
 *
 * export default function HomeScreen() {
 *   const handleAdd = () => {
 *     console.log('Ajout d’un nouvel élément');
 *   };
 *
 *   return (
 *     <View style={{ flex: 1 }}>
 *
*
<FloatingButton
 *         onPress={handleAdd}
*         title="Ajouter"
*         iconName="plus"
    *       />
    *     </View>
*   );
* }
* ```
 *
 * Fonctionnement :
 * - Le bouton est positionné en bas à droite de l’écran.
 * - Il est composé d’un cercle bleu avec une icône blanche centrée.
 * - Un texte descriptif est affiché sous le bouton (ex: "Ajouter").
 * - Le style inclut une ombre pour créer un effet de surélévation (flottant).
 */



// @ts-ignore
export default function FloatingButton({ onPress, title, iconName}){
    return (
        <TouchableOpacity
            style={styles.floatingButton}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.floatingButtonInner}>
                <AntDesign name={iconName} size={24} color="white" />
            </View>
            <Text style={styles.floatingButtonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        alignItems: 'center',
        zIndex: 10,
        elevation: 8,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    floatingButtonInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    floatingButtonText: {
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: '600',
    },
});