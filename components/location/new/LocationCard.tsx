import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LocationProps } from '@/utils/types/LocationProps';
import {Link} from "expo-router";

const { width } = Dimensions.get('window');

interface LocationCardProps {
    location: LocationProps;
    onPress: (id: number) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onPress }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return '#10B981';
            case 'pending':
                return '#F59E0B';
            case 'cancelled':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Terminé';
            case 'pending':
                return 'En cours';
            case 'cancelled':
                return 'Annulé';
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (


        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
        >
            <LinearGradient
                colors={['#FFFFFF', '#F8FAFC']}
                style={styles.card}
            >
                {/* Header avec statut */}
                <View style={styles.header}>
                    <View style={styles.refContainer}>
                        <Text style={styles.refText}>Réf #{location.id}</Text>
                        <Text style={styles.dateText}>{formatDate(location.date)}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(location.status) + '20' }]}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(location.status) }]} />
                        <Text style={[styles.statusText, { color: getStatusColor(location.status) }]}>
                            {getStatusText(location.status)}
                        </Text>
                    </View>
                </View>

                {/* Image du véhicule */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: location.vehicle.image[0] }}
                        style={styles.vehicleImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.1)']}
                        style={styles.imageOverlay}
                    />
                </View>

                {/* Informations du véhicule */}
                <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleTitle}>
                        {location.vehicle.brand} {location.vehicle.model}
                    </Text>
                    <Text style={styles.vehicleYear}>{location.vehicle.year}</Text>
                </View>

                {/* Informations de trajet */}
                <View style={styles.tripInfo}>
                    <View style={styles.locationRow}>
                        <View style={styles.locationIcon}>
                            <Ionicons name="location" size={16} color="#066AFF" />
                        </View>
                        <View style={styles.locationDetails}>
                            <Text style={styles.locationLabel}>Départ</Text>
                            <Text style={styles.locationText} numberOfLines={1}>
                                {location.pick_up.place}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.locationRow}>
                        <View style={styles.locationIcon}>
                            <Ionicons name="flag" size={16} color="#0CB4FF" />
                        </View>
                        <View style={styles.locationDetails}>
                            <Text style={styles.locationLabel}>Arrivée</Text>
                            <Text style={styles.locationText} numberOfLines={1}>
                                {location.drop_off.place}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Informations utilisateur et prix */}
                <View style={styles.footer}>
                    <View style={styles.userInfo}>
                        <View style={styles.userAvatar}>
                            <Text style={styles.userInitial}>
                                {location.user.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.userName}>{location.user.name}</Text>
                            <Text style={styles.userCity}>{location.user.city}</Text>
                        </View>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{location.price}</Text>
                        {location.paidWithPoints && (
                            <View style={styles.pointsBadge}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.pointsText}>+{location.bonusPoints}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Bouton Voir plus */}
                <Link href={`/locations/${location.id}`} asChild>
                    <TouchableOpacity>
                <LinearGradient
                    colors={['#066AFF', '#0CB4FF']}
                    style={styles.viewMoreButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >

                    <Text style={styles.viewMoreText}>Voir plus</Text>
                    <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />

                </LinearGradient>
                    </TouchableOpacity>
                </Link>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(6, 106, 255, 0.1)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    refContainer: {
        flex: 1,
    },
    refText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    imageContainer: {
        height: 120,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        position: 'relative',
    },
    vehicleImage: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
    vehicleInfo: {
        marginBottom: 16,
    },
    vehicleTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    vehicleYear: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    tripInfo: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    locationDetails: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    locationText: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
        marginLeft: 44,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#066AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    userInitial: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    userCity: {
        fontSize: 14,
        color: '#6B7280',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#066AFF',
        marginBottom: 4,
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pointsText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#92400E',
        marginLeft: 4,
    },
    viewMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
    },
    viewMoreText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
});

export default LocationCard;