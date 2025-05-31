import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import StarRating from '@/components/General/StarRating';
import {Colors} from '@/utils/colors';
import {AgencyProps} from '@/utils/types/AgencyProps';
import StatusBadge from './StatusBadge';

interface AgencyHeaderProps {
    agency: AgencyProps,
    statusInfo: {
        text: string;
        bgColor: string;
    },
    selectedImageIndex?: number
}

export default function AgencyHeader({agency, statusInfo, selectedImageIndex}: AgencyHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            {/* Image unique de l'agence */}
            <View style={styles.imageContainer}>
                <Image source={{uri: agency.images[0]}} style={styles.image} resizeMode="cover"/>
                <View style={styles.statusBadgeOverlay}>
                    <StatusBadge statusInfo={statusInfo}/>
                </View>
            </View>

            {/* Contenu avec LinearGradient */}
            <LinearGradient colors={[Colors.secondary, Colors.secondary]} style={styles.contentGradient}>
                <Text style={styles.title}>{agency.name}</Text>
                <Text style={styles.subtitle}>{agency.city} • {agency.type}</Text>

                <View style={styles.ratingContainer}>
                    <StarRating rating={agency.rating} showNumber={true}/>
                </View>

                <View style={styles.followerContainer}>
                    <Text style={styles.followerCount}>{agency.followers} abonnés</Text>
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
        height: 250,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    statusBadgeOverlay: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
    },
    contentGradient: {
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginTop: -20,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 4,
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
    followerContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    followerCount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
