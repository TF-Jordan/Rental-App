import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from "@/components/General/StarRating";
import { CarProps as Vehicle } from "@/utils/types/CarProps";
import ImageGallery from './ImageGallery';
import StatusBadge from './StatusBadge';
import {Colors} from "@/utils/colors";
import Entypo from '@expo/vector-icons/Entypo';


interface VehicleHeaderProps {
    vehicle: Vehicle;
    statusInfo: {
        text: string;
        bgColor: string;
    };
    selectedImageIndex: number;
    onImageSelect: (index: number) => void;
}

export default function VehicleHeader({
                                          vehicle,
                                          statusInfo,
                                          selectedImageIndex,
                                          onImageSelect
                                      }: VehicleHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            {/* Image Gallery en plein écran */}
            <View style={styles.imageContainer}>
                <ImageGallery
                    images={vehicle.images}
                    selectedIndex={selectedImageIndex}
                    onImageSelect={onImageSelect}
                />
                {/* StatusBadge positionné par-dessus l'image */}
                <View style={styles.statusBadgeOverlay}>
                    <StatusBadge statusInfo={statusInfo} />
                </View>
            </View>


            {/* Contenu du header avec gradient */}
            <LinearGradient
                colors={[Colors.secondary,Colors.secondary]}
                style={styles.contentGradient}
            >
                <View style={styles.titleRow}>
                    <Text style={styles.title}>
                        {vehicle.brand} {vehicle.model}
                    </Text>
                    <TouchableOpacity>
                        <Entypo name="location" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>{vehicle.year} • {vehicle.type}</Text>

                {/*affiche le nombre d'etoiles s'il y en a*/}
                {vehicle.rating && (
                    <View style={styles.ratingContainer}>
                        <StarRating rating={vehicle.rating} showNumber={true} />
                    </View>
                )}
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>{vehicle.pricePerDay} XAF</Text>
                    <Text style={styles.priceLabel}>par jour</Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        height: 300, // Hauteur fixe pour la partie image
        width: '100%',
    },
    statusBadgeOverlay: { //statusBadge positionné par-dessus l'image'
        position: 'absolute',
        top: 90, // Ajustez selon vos besoins
        left: 20,
        zIndex: 10,
        flexDirection: 'row',
    },
    contentGradient: {
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginTop: -20, // Léger chevauchement pour un effet fluide
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        flex: 1, // pour pousser l'icône à droite
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: 10,
    },
    ratingContainer: {
        marginTop: 8,
    },
    priceContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    priceText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
    },
    priceLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    first:{
        flexDirection: 'row',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 4,
    },
});