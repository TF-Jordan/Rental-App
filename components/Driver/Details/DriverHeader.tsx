import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from "@/components/General/StarRating";
import { DriverProps as Driver } from "@/utils/types/DriverProps";

interface DriverHeaderProps {
    driver: Driver;
    statusInfo: {
        text: string;
        bgColor: string;
    };
}

export default function DriverHeader({ driver, statusInfo }: DriverHeaderProps) {
    return (
        <LinearGradient
            colors={['#3B82F6', '#60A5FA', '#93C5FD']}
            style={styles.headerGradient}
        >
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: driver.photo || 'https://via.placeholder.com/150' }}
                    style={styles.avatar}
                />
                <View style={styles.avatarBorder} />
            </View>

            {/* badge de statut */}
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
                <View style={[styles.statusDot, { backgroundColor: '#fff' }]} />
                <Text style={styles.statusText}>{statusInfo.text}</Text>
            </View>

            {/* nom et prenom */}
            <Text style={styles.title}>
                {driver.first_name} {driver.last_name}
            </Text>
            <Text style={styles.subtitle}>{driver.age} ans</Text>

            {/* les etoiles */}
            <View style={styles.ratingContainer}>
                <StarRating rating={driver.rating} showNumber={true} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerGradient: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
    },
    avatarBorder: {
        position: 'absolute',
        top: -4,
        left: -4,
        width: 128,
        height: 128,
        borderRadius: 64,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 25,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: 15,
    },
    ratingContainer: {
        marginTop: 10,
    },
});