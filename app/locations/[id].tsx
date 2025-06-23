import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { LocationProps } from '@/utils/types/LocationProps';
import { CarProps } from '@/utils/types/CarProps';
import locationData from '@/assets/location/location.json';
import {vehiclesData} from "@/assets/Car/data";

const { width, height } = Dimensions.get('window');

type TabType = 'info' | 'documents' | 'ride';

const LocationDetailsScreen: React.FC = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('info');


    const location = locationData.find(
        // @ts-ignore
        (loc: LocationProps) => Number(loc.id) === Number(id)
    ) as unknown as LocationProps;

    // @ts-ignore
    const car = vehiclesData.find(
        (vehicle: CarProps) => vehicle.id === location?.vehicle.id
    ) as CarProps;

    if (!location) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Location non trouvée</Text>
            </View>
        );
    }

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
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderTabButton = (tab: TabType, title: string, icon: string) => {
        const isActive = activeTab === tab;

        return (
            <TouchableOpacity
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
            >
                {isActive ? (
                    <LinearGradient
                        colors={['#066AFF', '#0CB4FF']}
                        style={styles.tabButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name={icon as any} size={20} color="#FFFFFF" />
                        <Text style={[styles.tabButtonText, styles.tabButtonTextActive]}>
                            {title}
                        </Text>
                    </LinearGradient>
                ) : (
                    <View style={styles.tabButtonContent}>
                        <Ionicons name={icon as any} size={20} color="#6B7280" />
                        <Text style={styles.tabButtonText}>{title}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderInfoTab = () => (
        <View style={styles.tabContent}>
            {/* Informations du véhicule */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Véhicule</Text>
                <View style={styles.vehicleCard}>
                    <Image
                        source={{ uri: location.vehicle.image[0] }}
                        style={styles.vehicleDetailImage}
                        resizeMode="cover"
                    />
                    <View style={styles.vehicleDetails}>
                        <Text style={styles.vehicleName}>
                            {location.vehicle.brand} {location.vehicle.model}
                        </Text>
                        <Text style={styles.vehicleYear}>Année: {location.vehicle.year}</Text>
                        <View style={styles.vehicleSpecs}>
                            <View style={styles.specItem}>
                                <Ionicons name="speedometer-outline" size={16} color="#066AFF" />
                                <Text style={styles.specText}>Automatique</Text>
                            </View>
                            <View style={styles.specItem}>
                                <Ionicons name="people-outline" size={16} color="#066AFF" />
                                <Text style={styles.specText}>5 places</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Itinéraire */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Itinéraire</Text>
                <View style={styles.tripCard}>
                    <View style={styles.tripPoint}>
                        <View style={[styles.tripIcon, { backgroundColor: '#10B981' }]}>
                            <Ionicons name="location" size={16} color="#FFFFFF" />
                        </View>
                        <View style={styles.tripInfo}>
                            <Text style={styles.tripPlace}>{location.pick_up.place}</Text>
                            <Text style={styles.tripTime}>
                                {formatDate(location.pick_up.date.toString())} à {formatTime(location.pick_up.date.toString())}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tripConnector} />

                    <View style={styles.tripPoint}>
                        <View style={[styles.tripIcon, { backgroundColor: '#EF4444' }]}>
                            <Ionicons name="flag" size={16} color="#FFFFFF" />
                        </View>
                        <View style={styles.tripInfo}>
                            <Text style={styles.tripLabel}>Arrivée</Text>
                            <Text style={styles.tripPlace}>{location.drop_off.place}</Text>
                            <Text style={styles.tripTime}>
                                {formatDate(location.drop_off.date.toString())} à {formatTime(location.drop_off.date.toString())}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Informations client */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Client</Text>
                <View style={styles.clientCard}>
                    <View style={styles.clientAvatar}>
                        <Text style={styles.clientInitial}>
                            {location.user.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.clientInfo}>
                        <Text style={styles.clientName}>{location.user.name}</Text>
                        <View style={styles.clientDetail}>
                            <Ionicons name="call-outline" size={16} color="#6B7280" />
                            <Text style={styles.clientText}>{location.user.phone}</Text>
                        </View>
                        <View style={styles.clientDetail}>
                            <Ionicons name="location-outline" size={16} color="#6B7280" />
                            <Text style={styles.clientText}>{location.user.address}, {location.user.city}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Paiement */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Paiement</Text>
                <View style={styles.paymentCard}>
                    <View style={styles.paymentRow}>
                        <View style={styles.paymentIcon}>
                            <Ionicons name="card-outline" size={20} color="#066AFF" />
                        </View>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentLabel}>Méthode de paiement</Text>
                            <Text style={styles.paymentValue}>{location.payment_method}</Text>
                        </View>
                    </View>

                    <View style={styles.paymentDivider} />

                    <View style={styles.paymentRow}>
                        <View style={styles.paymentIcon}>
                            <Ionicons name="pricetag-outline" size={20} color="#10B981" />
                        </View>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentLabel}>Prix total</Text>
                            <Text style={styles.paymentPrice}>{location.price}</Text>
                        </View>
                    </View>

                    {location.paidWithPoints && (
                        <>
                            <View style={styles.paymentDivider} />
                            <View style={styles.paymentRow}>
                                <View style={styles.paymentIcon}>
                                    <Ionicons name="star" size={20} color="#FFD700" />
                                </View>
                                <View style={styles.paymentInfo}>
                                    <Text style={styles.paymentLabel}>Points bonus</Text>
                                    <Text style={styles.bonusPoints}>+{location.bonusPoints} points</Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </View>

            {location.driver && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Chauffeur</Text>
                    <View style={styles.driverCard}>
                        <View style={styles.driverAvatar}>
                            <Text style={styles.driverInitial}>
                                {location.driver.name?.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>{location.driver.name}</Text>
                            <Text style={styles.driverRole}>Chauffeur professionnel</Text>
                        </View>
                        <TouchableOpacity style={styles.callButton}>
                            <Ionicons name="call" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    const renderDocumentsTab = () => (
        <View style={styles.tabContent}>
            <View style={styles.documentsPlaceholder}>
                <Ionicons name="document-text-outline" size={64} color="#CBD5E1" />
                <Text style={styles.placeholderTitle}>Documents</Text>
                <Text style={styles.placeholderText}>
                    Les documents liés à cette location apparaîtront ici
                </Text>
            </View>
        </View>
    );

    const renderRideTab = () => (
        <View style={styles.tabContent}>
            <View style={styles.ridePlaceholder}>
                <Ionicons name="map-outline" size={64} color="#CBD5E1" />
                <Text style={styles.placeholderTitle}>Suivi du trajet</Text>
                <Text style={styles.placeholderText}>
                    Les informations de géolocalisation du trajet apparaîtront ici
                </Text>
            </View>
        </View>
    );

    const handleAction = () => {
        switch (location.status) {
            case 'pending':
                Alert.alert(
                    'Confirmer l\'action',
                    'Voulez-vous marquer cette location comme terminée?',
                    [
                        { text: 'Annuler', style: 'cancel' },
                        { text: 'Confirmer', onPress: () => console.log('Location terminée') },
                    ]
                );
                break;
            case 'completed':
                Alert.alert('Information', 'Cette location est déjà terminée');
                break;
            case 'cancelled':
                Alert.alert('Information', 'Cette location a été annulée');
                break;
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor="#066AFF" />

            {/* Header avec image de fond */}
            <View style={styles.header}>
                <LinearGradient
                    colors={['#066AFF', '#0CB4FF']}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.headerTop}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        <View style={styles.headerTitle}>
                            <Text style={styles.headerTitleText}>Détails de la location</Text>
                            <Text style={styles.headerSubtitle}>Réf #{location.id}</Text>
                        </View>

                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(location.status) + '30' }]}>
                            <View style={[styles.statusDot, { backgroundColor: getStatusColor(location.status) }]} />
                            <Text style={[styles.statusText, { color: getStatusColor(location.status) }]}>
                                {getStatusText(location.status)}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Navigation par onglets */}
                <View style={styles.tabsContainer}>
                    {renderTabButton('info', 'Informations', 'information-circle-outline')}
                    {renderTabButton('documents', 'Documents', 'document-text-outline')}
                    {renderTabButton('ride', 'Trajet', 'map-outline')}
                </View>

                {/* Contenu des onglets */}
                {activeTab === 'info' && renderInfoTab()}
                {activeTab === 'documents' && renderDocumentsTab()}
                {activeTab === 'ride' && renderRideTab()}
            </ScrollView>

            {/* Bouton d'action flottant */}
            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleAction}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#066AFF', '#0CB4FF']}
                        style={styles.actionButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons
                            name={location.status === 'pending' ? 'checkmark' : 'information-circle'}
                            size={20}
                            color="#FFFFFF"
                        />
                        <Text style={styles.actionButtonText}>
                            {location.status === 'pending' ? 'Marquer comme terminé' : 'Plus d\'infos'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    errorText: {
        fontSize: 18,
        color: '#EF4444',
        fontWeight: '600',
    },
    header: {
        height: 120,
    },
    headerGradient: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    headerTop: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        marginLeft: 16,
    },
    headerTitleText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 2,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: -20,
        borderRadius: 16,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    tabButton: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    tabButtonActive: {
        elevation: 2,
        shadowColor: '#066AFF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    tabButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    tabButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginLeft: 6,
    },
    tabButtonTextActive: {
        color: '#FFFFFF',
    },
    tabContent: {
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
    },
    vehicleCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    vehicleDetailImage: {
        width: '100%',
        height: 160,
        borderRadius: 12,
        marginBottom: 16,
    },
    vehicleDetails: {},
    vehicleName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    vehicleYear: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 12,
    },
    vehicleSpecs: {
        flexDirection: 'row',
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    specText: {
        fontSize: 14,
        color: '#4B5563',
        marginLeft: 6,
        fontWeight: '500',
    },
    tripCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tripPoint: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tripIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    tripInfo: {
        flex: 1,
    },
    tripLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    tripPlace: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    tripTime: {
        fontSize: 14,
        color: '#6B7280',
    },
    tripConnector: {
        width: 2,
        height: 20,
        backgroundColor: '#E5E7EB',
        marginLeft: 15,
        marginVertical: 8,
    },
    clientCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    clientAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#066AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    clientInitial: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    clientInfo: {
        flex: 1,
    },
    clientName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
    },
    clientDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    clientText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
    },
    paymentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    paymentValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    paymentPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#066AFF',
    },
    bonusPoints: {
        fontSize: 16,
        fontWeight: '600',
        color: '#F59E0B',
    },
    paymentDivider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },
    driverCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    driverAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    driverInitial: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    driverRole: {
        fontSize: 14,
        color: '#6B7280',
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentsPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
    },
    ridePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
    },
    placeholderTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginTop: 16,
        marginBottom: 8,
    },
    placeholderText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 24,
    },
    actionContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    actionButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#066AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    actionButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default LocationDetailsScreen;