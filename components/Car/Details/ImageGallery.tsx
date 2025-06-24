import React, { useRef } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent
} from 'react-native';
import Entypo from "@expo/vector-icons/Entypo";




/**
 * 📸 ImageGallery Component
 *
 * Composant React Native permettant d’afficher une galerie d’images avec :
 * - un carrousel horizontal principal (défilement ou clic sur miniature),
 * - des indicateurs de pagination dynamiques,
 * - une liste de miniatures cliquables pour accéder directement à une image.
 *
 * 🔧 Props :
 * ----------
 *µ @prop {string[]} [images] (optionnel)
 *     Liste des URL des images à afficher.
 *     Si aucune liste n’est fournie, une image par défaut est utilisée.
 *
 ** @prop {number} selectedIndex (requis)
 *     Index de l’image actuellement sélectionnée/visible.
 *     Sert à déterminer quelle miniature est active et quel point de pagination est allumé.
 *
 **@prop {(index: number) => void} onImageSelect (requis)
 *     Fonction appelée à chaque changement d’image (par scroll ou clic sur miniature).
 *     Elle permet au composant parent de synchroniser l’état de la galerie.
 *
 * 🧱 Structure interne :
 * ----------------------
 * - ScrollView principal :
 *     Affiche les images en plein écran horizontalement scrollables.
 *     Gère automatiquement les transitions entre les images.
 *
 * - Pagination (points indicateurs) :
 *     Petits cercles dynamiques affichés en bas, indiquant l’image courante.
 *     Le point actif est élargi/blanchi pour attirer l’attention.
 *
 * - Miniatures :
 *     Rangée horizontale d’images miniatures affichée sous la pagination.
 *     Cliquer sur une miniature déclenche un scroll vers l’image correspondante.
 *
 * ⚙️ Fonctions internes :
 * -----------------------
 * handleScroll(event):
 *     - Écoute l’événement de défilement horizontal.
 *     - Calcule l’index de l’image visible à partir du scroll offset.
 *     - Si l’image visible change, appelle onImageSelect(index).
 *
 * scrollToIndex(index):
 *     - Fait défiler le ScrollView principal jusqu’à l’image à l’index donné.
 *     - Appelle onImageSelect pour déclencher la mise à jour de l’état.
 *
 * 📱 Responsiveness :
 * -------------------
 * Le composant utilise les dimensions de l’écran (`Dimensions.get('window')`) pour adapter
 * la taille des images à la largeur du device, garantissant une expérience responsive.
 *
 * 🎨 Style :
 * ----------
 * - Les images principales occupent 100% de la largeur et hauteur disponibles.
 * - Les points de pagination sont centrés en bas.
 * - Les miniatures sont stylisées avec opacité variable selon la sélection.
 * - La miniature active a un contour blanc et est pleinement opaque.
 */





// Définition des propriétés attendues par le composant
interface ImageGalleryProps {
    images?: string[];          // tableau des URLs des images
    selectedIndex: number;      // Index de l'image actuellement sélectionnée
    onImageSelect: (index: number) => void; // Callback quand une image est sélectionnée
}

// On récupère la largeur de l'écran pour un affichage plein largeur
const { width } = Dimensions.get('window');

export default function ImageGallery({
                                         images,
                                         selectedIndex,
                                         onImageSelect
                                     }: ImageGalleryProps) {
    // Référence pour contrôler le ScrollView principal
    const scrollRef = useRef<ScrollView>(null);

    // Si pas d'images fournies, on utilise une image par défaut
    const imageList = images && images.length > 0
        ? images
        : ['https://via.placeholder.com/400x250'];

    // Gère le défilement horizontal pour détecter l'image visible
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;  //offsetX est la position actuelle du scrollView horizontal
        const index = Math.round(offsetX / width); // Calcule l'index de l'image visible en divisant l'index par la taille d'une image
        if (index !== selectedIndex) {
            onImageSelect(index); // met a jour l'index de l'image sélectionnée
        }
    };

    // Fait défiler vers une image spécifique lorsque le user selectionne directement la miniature conrrespondante
    const scrollToIndex = (index: number) => {
        scrollRef.current?.scrollTo({
            x: index * width,  // Position horizontale à atteindre
            animated: true    // animation de transition fluide pas brutale
        });
        onImageSelect(index); // Met à jour la sélection en notifiant le composant parent
    };

    return (
        <View style={styles.container}>
            {/* ScrollView principal pour les images en plein écran */}
            <ScrollView
                ref={scrollRef}
                horizontal                 // Défilement horizontal
                pagingEnabled             // Snap sur chaque image
                showsHorizontalScrollIndicator={false} // Cache la barre de défilement
                onScroll={handleScroll}  // Écouteur de défilement
                scrollEventThrottle={16}  // Fréquence de rafraîchissement
                style={styles.scrollView}
            >
                {/* Affiche chaque image en plein écran */}
                {imageList.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: img }}
                        style={styles.mainImage}
                        resizeMode="cover"
                    />

                ))}

            </ScrollView>


            {/* Indicateurs de position (points en bas) */}
            <View style={styles.pagination}>
                {imageList.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            selectedIndex === index && styles.activeDot // Met en surbrillance le point actif
                        ]}
                    />
                ))}

            </View>

            {/* Miniatures cliquables (uniquement si plusieurs images) */}
            {imageList.length > 1 && (
                <View style={styles.thumbnailContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.thumbnailList}
                    >
                        {imageList.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => scrollToIndex(index)}
                            >
                                <Image
                                    source={{ uri: item }}
                                    style={[
                                        styles.thumbnailImage,
                                        selectedIndex === index && styles.selectedThumbnail // Met en surbrillance la miniature active
                                    ]}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </View>
            )}
        </View>
    );
}

// Styles CSS-in-JS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Permet le positionnement absolu des enfants
    },
    scrollView: {
        flex: 1,
    },
    mainImage: { //imgae principale
        width: width,        // prend toute la largeur de l'écran
        height: '100%',     // prend toute la hauteur disponible
    },
    pagination: { //les boutons de pagiantion
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center', // Centre les points horizontalement
    },
    dot: { //boutons pour les points en bas
        height: 8,
        width: 8,
        borderRadius: 4,    // forme ronde
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent
        marginHorizontal: 4,
    },
    activeDot: { //pour le bouton actif
        backgroundColor: '#ffffff',
        width: 25,
        borderRadius: 4,
    },
    thumbnailContainer: {//le contenant des miniatures
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fond semi-transparent
        paddingVertical: 8,
    },
    thumbnailList: {
        paddingHorizontal: 10,
    },
    thumbnailImage: { //pour les miniatures
        width: 50,
        height: 35,
        borderRadius: 6,
        marginHorizontal: 4,
        opacity: 0.5, // semi-transparent pour les miniatures non actives
    },
    selectedThumbnail: { //image selectionnée
        opacity: 1,    // Pleine opacité pour la miniature active
        borderWidth: 2,
        borderColor: '#818385', // Bordure blanche
    },
    first:{
        flexDirection: 'row',
        flex:1,
    },
});