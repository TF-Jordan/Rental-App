import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Animated,
    Share,
    Alert,
    Vibration,
} from 'react-native';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { CarProps } from '@/utils/types/CarProps';
import {
    FontAwesome5,
    MaterialIcons,
    Ionicons,
    AntDesign,
} from '@expo/vector-icons';
import StarRating from '@/components/General/StarRating';
import { CarStatusInfo } from '@/assets/Car/StatutsInfo';
import CommentsModal from '@/components/Car/CommentsModal';

const { width } = Dimensions.get('window');

interface VehicleCardProps {
    vehicle: CarProps;
    currentUserId: number;
    onToggleLike?: (vehicleId: number) => void;
    onAddComment?: (vehicleId: number, comment: string) => void;
    onShare?: (vehicleId: number, platform: string) => void;
}

const CarCard: React.FC<VehicleCardProps> = ({
                                                     vehicle,
                                                     currentUserId,
                                                     onToggleLike,
                                                     onAddComment,
                                                     onShare,
                                                 }) => {
    const [commentsModalVisible, setCommentsModalVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(vehicle.isLikedByCurrentUser);
    const [likesCount, setLikesCount] = useState(vehicle.totalLikes);

    const likeScaleAnim = useRef(new Animated.Value(1)).current;
    const heartScaleAnim = useRef(new Animated.Value(1)).current;

    const statusInfo = CarStatusInfo(vehicle.available);
    const mainImage = vehicle.images && vehicle.images.length > 0
        ? vehicle.images[0]
        : "https://via.placeholder.com/400x300";
    const handleLike = () => {
        // Animation du bouton
        Animated.sequence([
            Animated.spring(likeScaleAnim, {
                toValue: 0.8,
                useNativeDriver: true,
                tension: 400,
                friction: 10,
            }),
            Animated.spring(likeScaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                tension: 400,
                friction: 10,
            }),
        ]).start();

        // Animation du coeur si c'est un like
        if (!isLiked) {
            Animated.sequence([
                Animated.spring(heartScaleAnim, {
                    toValue: 1.5,
                    useNativeDriver: true,
                    tension: 400,
                    friction: 10,
                }),
                Animated.spring(heartScaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 400,
                    friction: 10,
                }),
            ]).start();
            // Vibration légère
            Vibration.vibrate(50);
        }

        // Mise à jour locale pour l'animation immédiate
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        // Appel du callback pour la gestion centralisée
        // @ts-ignore
        onToggleLike?.(vehicle.id);
    };

    const handleComment = () => {
        setCommentsModalVisible(true);
    };

    const handleShare = async () => {
        try {
            const vehicleUrl = `https://votre-app.com/vehicle/${vehicle.id}`;
            const message = `Découvrez cette ${vehicle.brand} ${vehicle.model} sur notre plateforme ! ${vehicleUrl}`;

            const result = await Share.share({
                message: message,
                url: vehicleUrl,
                title: `${vehicle.brand} ${vehicle.model}`,
            });

            if (result.action === Share.sharedAction) {
                // @ts-ignore
                onShare?.(vehicle.id, 'native');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de partager ce véhicule');
        }
    };

    const handleAddComment = async (comment: string) => {
        // @ts-ignore
        onAddComment?.(vehicle.id, comment);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <ImageBackground
                        source={{ uri: mainImage }}
                        resizeMode="cover"
                        style={styles.backgroundImage}
                    >
                        {/* Gradient overlay */}
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
                            style={styles.gradientOverlay}
                        />

                        {/* Badge de statut */}
                        <View style={styles.statusContainer}>
                            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
                                <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                                <Text style={styles.statusText}>{statusInfo.text}</Text>
                            </View>
                        </View>

                        {/* Contenu principal */}
                        <View style={styles.contentContainer}>
                            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                                {/* En-tête avec nom et rating */}
                                <View style={styles.headerRow}>
                                    <View style={styles.vehicleInfo}>
                                        <Text style={styles.vehicleName}>
                                            {vehicle.brand} {vehicle.model}
                                        </Text>
                                        <Text style={styles.vehicleYear}>{vehicle.year}</Text>
                                    </View>
                                    {vehicle.rating && (
                                        <View style={styles.ratingContainer}>
                                            <StarRating rating={vehicle.rating} showNumber={true} />
                                        </View>
                                    )}
                                </View>

                                {/* Informations détaillées */}
                                <View style={styles.detailsRow}>
                                    <View style={styles.detailItem}>
                                        <MaterialIcons name="people" size={16} color="#fff" />
                                        <Text style={styles.detailText}>{vehicle.passenger}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <FontAwesome5 name="gas-pump" size={14} color="#fff" />
                                        <Text style={styles.detailText}>
                                            {vehicle.engine.type || 'Essence'}
                                        </Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="speedometer" size={16} color="#fff" />
                                        <Text style={styles.detailText}>
                                            {vehicle.engine.horsepower || 'N/A'} CV
                                        </Text>
                                    </View>
                                </View>

                                {/* Prix */}
                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceText}>
                                        {vehicle.pricePerDay.toLocaleString()} FCFA
                                    </Text>
                                    <Text style={styles.priceUnit}>/jour</Text>
                                </View>

                                {/* Actions sociales */}
                                <View style={styles.socialActions}>
                                    <Animated.View style={{ transform: [{ scale: likeScaleAnim }] }}>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={handleLike}
                                            activeOpacity={0.7}
                                        >
                                            <Animated.View style={{ transform: [{ scale: heartScaleAnim }] }}>
                                                <AntDesign
                                                    name={isLiked ? "heart" : "hearto"}
                                                    size={20}
                                                    color={isLiked ? "#FF6B6B" : "#fff"}
                                                />
                                            </Animated.View>
                                            <Text style={[styles.actionText, { color: isLiked ? "#FF6B6B" : "#fff" }]}>
                                                {formatNumber(likesCount)}
                                            </Text>
                                        </TouchableOpacity>
                                    </Animated.View>

                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={handleComment}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons name="chatbubble-outline" size={20} color="#fff" />
                                        <Text style={styles.actionText}>
                                            {formatNumber(vehicle.totalComments)}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={handleShare}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons name="share-outline" size={20} color="#fff" />
                                        <Text style={styles.actionText}>
                                            {formatNumber(vehicle.totalShares)}
                                        </Text>
                                    </TouchableOpacity>

                                    <Link href={`/Car/${vehicle.id}`} asChild>
                                        <TouchableOpacity style={styles.viewButton}>
                                            <LinearGradient
                                                colors={['#007AFF', '#0056CC']}
                                                style={styles.viewButtonGradient}
                                            >
                                                <Text style={styles.viewButtonText}>Voir plus</Text>
                                                <Ionicons name="arrow-forward" size={16} color="#fff" />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </Link>
                                </View>
                            </BlurView>
                        </View>
                    </ImageBackground>
                </View>
            </View>

            <CommentsModal
                isVisible={commentsModalVisible}
                onClose={() => setCommentsModalVisible(false)}
                vehicleId={vehicle.id}
                comments={vehicle.comments}
                onAddComment={handleAddComment}
                currentUserId={currentUserId}
                vehicleName={`${vehicle.brand} ${vehicle.model}`}
            />
        </>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: width,
        alignSelf: 'center',
        marginVertical: 12,
        paddingHorizontal: 1,
    },
    card: {
        height: 420,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    statusContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
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
        fontWeight: '700',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 3,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    blurContainer: {
        alignSelf: 'center',
        width:width-20,
        borderRadius: 20,
        padding: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    vehicleInfo: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 3,
        letterSpacing: 0.5,
    },
    vehicleYear: {
        fontSize: 16,
        color: '#E0E0E0',
        fontWeight: '500',
        marginTop: 2,
    },
    ratingContainer: {
        alignItems: 'flex-end',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backdropFilter: 'blur(10px)',
    },
    detailText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
    },
    priceText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 3,
    },
    priceUnit: {
        fontSize: 16,
        color: '#E0E0E0',
        fontWeight: '500',
        marginLeft: 4,
    },
    socialActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backdropFilter: 'blur(10px)',
        minWidth: 60,
        justifyContent: 'center',
    },
    actionText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    viewButton: {
        borderRadius: 25,
        overflow: 'hidden',
        shadowColor: '#007AFF',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    viewButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        justifyContent: 'center',
    },
    viewButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        marginRight: 8,
        letterSpacing: 0.5,
    },
});


export default CarCard;