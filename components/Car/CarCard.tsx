import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';
import { CarProps } from "@/utils/types/CarProps";
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import StarRating from "@/components/General/StarRating";
import {CarStatusInfo} from '@/assets/Car/StatutsInfo';


const { width } = Dimensions.get('window');


const VehicleCard = ({ vehicle }: { vehicle: CarProps }) => {
    const statusInfo = CarStatusInfo(vehicle.available);
    const mainImage = vehicle.images && vehicle.images.length > 0
        ? vehicle.images[0]
        : 'https://via.placeholder.com/300x150';

    // @ts-ignore
    return (
        <View style={styles.card}>
            <ImageBackground
                source={{ uri: mainImage }}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                {/* Badge de statut en haut à gauche */}
                <View style={styles.statusContainer}>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
                        <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                        <Text style={styles.statusText}>{statusInfo.text}</Text>
                    </View>
                </View>

                <BlurView
                    intensity={40}
                    tint="light"
                    style={styles.blurContainer}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.infoRow}>
                            <FontAwesome5 name="car" size={18} color="#333" style={styles.icon} />
                            <Text style={styles.name}>
                                {vehicle.brand} {vehicle.model}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            {vehicle.rating && <StarRating rating={vehicle.rating} showNumber={true} />}
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Feather name="calendar" size={18} color="#555" style={styles.icon} />
                        <Text style={styles.age}>{vehicle.year}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialIcons name="people" size={18} color="#555" style={styles.icon} />
                        <Text style={styles.contact}>{vehicle.passenger} passagers</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <FontAwesome5 name="dollar-sign" size={18} color="#555" style={styles.icon} />
                        <Text style={styles.price}>{vehicle.pricePerDay} FCFA/jour</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Link href={`/Car/${vehicle.id}`} asChild>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Voir plus</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </BlurView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width,
        height: 400,
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },
    icon: {
        marginRight: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    age: {
        fontSize: 16,
        color: '#555',
    },
    contact: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    blurContainer: {
        padding: 15,
        backgroundColor: 'rgb(255,255,255)',
    },
    statusContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default VehicleCard;