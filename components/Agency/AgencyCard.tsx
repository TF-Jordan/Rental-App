import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';
import { AgencyProps } from "@/utils/types/AgencyProps";
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import StarRating from "@/components/General/StarRating";
import {AgencyStatus} from '@/assets/Agency/StatusInfos';


const {width,height}=Dimensions.get('window');

const AgencyCard = ({ agency }: { agency: AgencyProps }) => {


    const statusInfo = AgencyStatus;
    const mainImage = agency.images && agency.images.length > 0
        ? agency.images[0]
        : 'https://via.placeholder.com/300x150';

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
                            <FontAwesome5 name="building" size={18} color="#333" style={styles.icon} />
                            <Text style={styles.name} numberOfLines={1}>{agency.name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <StarRating rating={agency.rating} showNumber={true} />
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <MaterialIcons name="location-on" size={18} color="#555" style={styles.icon} />
                        <Text style={styles.location} numberOfLines={1}>{agency.city}, {agency.quater}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Feather name="clock" size={18} color="#555" style={styles.icon} />
                        <Text style={styles.time}>{agency.openingTime} - {agency.closingTime}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <FontAwesome5 name="users" size={18} color="#555" style={styles.icon} />
                        <Text style={styles.followers}>{agency.followers} abonnés</Text>
                    </View>

                    <Text style={styles.slogan} numberOfLines={2}>{agency.slogan}</Text>

                    <View style={styles.buttonContainer}>
                        <Link href={`/Agencies/${agency.id}`} asChild>
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
        height: 420,
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
        flex: 1,
    },
    icon: {
        marginRight: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    location: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    time: {
        fontSize: 14,
        color: '#666',
    },
    followers: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    slogan: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        marginTop: 8,
        lineHeight: 16,
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
        shadowOffset: { width: 0, height: 2 },
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

export default AgencyCard;
