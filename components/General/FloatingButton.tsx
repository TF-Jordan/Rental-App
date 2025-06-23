import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import {
    AntDesign,
    Entypo,
    EvilIcons,
    Feather,
    FontAwesome,
    Foundation,
    Ionicons,
    MaterialIcons, Octicons, SimpleLineIcons, Zocial
} from '@expo/vector-icons';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

/**
 * FloatingButton
 * ----------------
 * Ce composant représente un bouton flottant personnalisable, souvent utilisé
 * pour déclencher une action rapide comme l'ajout d'un élément.
 * Il combine une icône dans un cercle coloré et un petit texte en dessous.
 *
 * Props :
 * - onPress (function) : Fonction appelée lors du clic/tap sur le bouton.
 * - title (string) : Texte affiché sous l'icône, généralement pour indiquer l'action du bouton.
 * - iconName (string) : Nom de l'icône AntDesign à afficher (ex : "pluscircle", "edit", "camera"...).
 *
 * Exemple d'utilisation :
 * ```tsx
 * import FloatingButton from './FloatingButton';
 *
 * export default function HomeScreen() {
 *   const handleAdd = () => {
 *     console.log('Ajout d'un nouvel élément');
 *   };
 *
 *   return (
 *     <View style={{ flex: 1 }}>
 *       <FloatingButton
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
 * - Le bouton est positionné en bas à droite de l'écran.
 * - Il est composé d'un cercle bleu avec une icône blanche centrée.
 * - Un texte descriptif est affiché sous le bouton (ex: "Ajouter").
 * - Le style inclut une ombre pour créer un effet de surélévation (flottant).
 * - Animation de rebond toutes les 10 secondes pour inciter à l'interaction.
 */

const iconLibraries = {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons,
    Entypo,
    Feather,
    EvilIcons,
    FontAwesome5,
    FontAwesome6,
    Foundation,
    Octicons,
    SimpleLineIcons,
    Zocial,
};

// @ts-ignore
export default function FloatingButton({ onPress, title, iconName, backgroundColor, iconType = 'AntDesign',}) {
    // @ts-ignore
    const IconComponent = iconLibraries[iconType];

    // Animation de rebond
    const bounceAnim = useRef(new Animated.Value(1)).current;

    if (!IconComponent) {
        console.warn(`Icon type "${iconType}" is not supported.`);
        return null;
    }

    // Effet de rebond toutes les 10 secondes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const bounceInterval = setInterval(() => {
            // Séquence d'animation de rebond
            Animated.sequence([
                // Premier rebond vers le haut
                Animated.timing(bounceAnim, {
                    toValue: 1.3,
                    duration: 300,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }),
                // Retour plus doux
                Animated.timing(bounceAnim, {
                    toValue: 0.9,
                    duration: 250,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                // Deuxième rebond plus petit
                Animated.timing(bounceAnim, {
                    toValue: 1.1,
                    duration: 200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                // Retour à la normale plus progressif
                Animated.timing(bounceAnim, {
                    toValue: 1,
                    duration: 350,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        }, 10000); // 10 secondes

        // Nettoyage de l'intervalle
        return () => clearInterval(bounceInterval);
    }, [bounceAnim]);

    return (
        <TouchableOpacity
            style={styles.floatingButton}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Animated.View
                style={[
                    styles.floatingButtonInner,
                    {
                        backgroundColor,
                        transform: [{ scale: bounceAnim }]
                    }
                ]}
            >
                <IconComponent name={iconName} size={24} color="white" />
            </Animated.View>
            {/*<Text style={[styles.floatingButtonText,{backgroundColor}]}>{title}</Text>  pour ajouter du texte décrivant l'action du bouton flottant*/}
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
        borderRadius: 30,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    floatingButtonText: {
        fontSize: 12,
        fontWeight: '600',
    },
});