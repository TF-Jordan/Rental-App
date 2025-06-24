import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Share,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import {transactionsData} from "@/assets/transactions/data";

const { width, height } = Dimensions.get('window');


const Id: React.FC = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Trouver la transaction correspondante
    const transaction = transactionsData.find(txn => txn.id === id);

    if (!transaction) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Transaction non trouvée</Text>
            </View>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return '#10B981';
            case 'pending':
                return '#F59E0B';
            case 'failed':
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
            case 'failed':
                return 'Échoué';
            default:
                return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return 'checkmark-circle';
            case 'pending':
                return 'time';
            case 'failed':
                return 'close-circle';
            default:
                return 'help-circle';
        }
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'mtn':
                return 'phone-portrait-outline';
            case 'orange':
                return 'phone-portrait-outline';
            case 'card':
                return 'card-outline';
            default:
                return 'wallet-outline';
        }
    };

    const getPaymentMethodColor = (method: string) => {
        switch (method) {
            case 'mtn':
                return '#FFD700';
            case 'orange':
                return '#FF6B35';
            case 'card':
                return '#066AFF';
            default:
                return '#6B7280';
        }
    };

    const getPaymentMethodName = (method: string) => {
        switch (method) {
            case 'mtn':
                return 'MTN Mobile Money';
            case 'orange':
                return 'Orange Money';
            case 'card':
                return 'Carte bancaire';
            default:
                return method;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XAF',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const calculateRentalDuration = () => {
        const start = new Date(transaction.vehicleRental.startDate);
        const end = new Date(transaction.vehicleRental.endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Transaction #${transaction.id.slice(-8)}\nMontant: ${formatAmount(transaction.amount)}\nStatut: ${getStatusText(transaction.status)}\nClient: ${transaction.customer.name}`,
            });
        } catch (error) {
            console.error('Erreur lors du partage:', error);
        }
    };

    const handleRefund = () => {
        Alert.alert(
            'Remboursement',
            'Voulez-vous vraiment initier un remboursement pour cette transaction ?',
            [
                { text: 'Annuler', style: 'cancel' },
                { text: 'Confirmer', onPress: () => console.log('Remboursement initié') },
            ]
        );
    };

    const renderHeader = () => (
        <LinearGradient
            colors={['#066AFF', '#0CB4FF']}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View style={styles.headerContent}>
                <View style={styles.headerTop}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                            <Ionicons name="share-outline" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="download-outline" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.transactionHeader}>
                    <Text style={styles.transactionId}>#{transaction.id.slice(-8)}</Text>
                    <View style={styles.statusContainer}>
                        <View
                            style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(transaction.status) + '30' },
                            ]}
                        >
                            <Ionicons
                                name={getStatusIcon(transaction.status) as any}
                                size={16}
                                color={getStatusColor(transaction.status)}
                            />
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: getStatusColor(transaction.status) },
                                ]}
                            >
                                {getStatusText(transaction.status)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{formatAmount(transaction.amount)}</Text>
                    <Text style={styles.dateTime}>
                        {formatDate(transaction.date)} à {formatTime(transaction.date)}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );

    const renderInfoCard = (title: string, children: React.ReactNode, icon?: string) => (
        <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
                {icon && (
                    <View style={styles.cardIcon}>
                        <Ionicons name={icon as any} size={20} color="#066AFF" />
                    </View>
                )}
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            {children}
        </View>
    );

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="light-content" backgroundColor="#066AFF" />

            <View style={styles.container}>
                {renderHeader()}

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                >
                    {/* Informations de paiement */}
                    {renderInfoCard('Méthode de paiement',
                        <View style={styles.paymentInfo}>
                            <View style={styles.paymentMethod}>
                                <View
                                    style={[
                                        styles.paymentIcon,
                                        { backgroundColor: getPaymentMethodColor(transaction.paymentMethod) + '20' },
                                    ]}
                                >
                                    <Ionicons
                                        name={getPaymentMethodIcon(transaction.paymentMethod) as any}
                                        size={24}
                                        color={getPaymentMethodColor(transaction.paymentMethod)}
                                    />
                                </View>
                                <View style={styles.paymentDetails}>
                                    <Text style={styles.paymentMethodText}>
                                        {getPaymentMethodName(transaction.paymentMethod)}
                                    </Text>
                                    <Text style={styles.paymentSubtext}>
                                        Transaction #{transaction.id.slice(-8)}
                                    </Text>
                                </View>
                            </View>
                        </View>,
                        'card-outline'
                    )}

                    {/* Informations client */}
                    {renderInfoCard('Informations client',
                        <View style={styles.customerInfo}>
                            <View style={styles.customerRow}>
                                <View style={styles.customerAvatar}>
                                    <Text style={styles.customerInitial}>
                                        {transaction.customer.name.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                                <View style={styles.customerDetails}>
                                    <Text style={styles.customerName}>{transaction.customer.name}</Text>
                                    <Text style={styles.customerEmail}>{transaction.customer.email}</Text>
                                </View>
                            </View>
                            <View style={styles.contactActions}>
                                <TouchableOpacity style={styles.contactButton}>
                                    <Ionicons name="call-outline" size={18} color="#066AFF" />
                                    <Text style={styles.contactButtonText}>Appeler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.contactButton}>
                                    <Ionicons name="mail-outline" size={18} color="#066AFF" />
                                    <Text style={styles.contactButtonText}>Email</Text>
                                </TouchableOpacity>
                            </View>
                        </View>,
                        'person-outline'
                    )}

                    {/* Informations véhicule */}
                    {renderInfoCard('Détails de la location',
                        <View style={styles.vehicleInfo}>
                            <View style={styles.vehicleHeader}>
                                <View style={styles.vehicleIcon}>
                                    <Ionicons name="car-outline" size={24} color="#066AFF" />
                                </View>
                                <View style={styles.vehicleDetails}>
                                    <Text style={styles.vehicleName}>{transaction.vehicleRental.vehicleName}</Text>
                                    <Text style={styles.vehicleId}>ID: {transaction.vehicleRental.vehicleId}</Text>
                                </View>
                            </View>

                            <View style={styles.rentalDetails}>
                                <View style={styles.rentalRow}>
                                    <View style={styles.dateCard}>
                                        <Text style={styles.dateLabel}>Début</Text>
                                        <Text style={styles.dateValue}>
                                            {formatDate(transaction.vehicleRental.startDate)}
                                        </Text>
                                        <Text style={styles.timeValue}>
                                            {formatTime(transaction.vehicleRental.startDate)}
                                        </Text>
                                    </View>
                                    <View style={styles.durationIndicator}>
                                        <View style={styles.durationLine} />
                                        <View style={styles.durationBadge}>
                                            <Text style={styles.durationText}>{calculateRentalDuration()}j</Text>
                                        </View>
                                    </View>
                                    <View style={styles.dateCard}>
                                        <Text style={styles.dateLabel}>Fin</Text>
                                        <Text style={styles.dateValue}>
                                            {formatDate(transaction.vehicleRental.endDate)}
                                        </Text>
                                        <Text style={styles.timeValue}>
                                            {formatTime(transaction.vehicleRental.endDate)}
                                        </Text>
                                    </View>
                                </View>

                                {transaction.vehicleRental.withDriver && (
                                    <View style={styles.driverInfo}>
                                        <View style={styles.driverBadge}>
                                            <Ionicons name="person" size={16} color="#10B981" />
                                            <Text style={styles.driverText}>Avec chauffeur</Text>
                                        </View>
                                        {transaction.vehicleRental.driverName && (
                                            <Text style={styles.driverName}>
                                                Chauffeur: {transaction.vehicleRental.driverName}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>,
                        'car-outline'
                    )}

                    {/* Actions */}
                    <View style={styles.actionsContainer}>
                        {transaction.status === 'completed' && (
                            <TouchableOpacity style={styles.refundButton} onPress={handleRefund}>
                                <LinearGradient
                                    colors={['#EF4444', '#DC2626']}
                                    style={styles.buttonGradient}
                                >
                                    <Ionicons name="arrow-undo-outline" size={20} color="#FFFFFF" />
                                    <Text style={styles.buttonText}>Rembourser</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={styles.primaryButton}>
                            <LinearGradient
                                colors={['#066AFF', '#0CB4FF']}
                                style={styles.buttonGradient}
                            >
                                <Ionicons name="receipt-outline" size={20} color="#FFFFFF" />
                                <Text style={styles.buttonText}>Télécharger le reçu</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        paddingTop: StatusBar.currentHeight || 0,
        paddingBottom: 32,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    headerContent: {
        paddingHorizontal: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    transactionId: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    statusContainer: {
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    amountContainer: {
        alignItems: 'center',
    },
    amount: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    dateTime: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        marginTop: -16,
    },
    contentContainer: {
        paddingBottom: 32,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EBF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1F2937',
    },
    paymentInfo: {
        paddingTop: 4,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    paymentDetails: {
        flex: 1,
    },
    paymentMethodText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    paymentSubtext: {
        fontSize: 14,
        color: '#6B7280',
    },
    customerInfo: {
        paddingTop: 4,
    },
    customerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    customerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#066AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    customerInitial: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    customerDetails: {
        flex: 1,
    },
    customerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    customerEmail: {
        fontSize: 14,
        color: '#6B7280',
    },
    contactActions: {
        flexDirection: 'row',
        gap: 12,
    },
    contactButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F0F7FF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0EFFF',
    },
    contactButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#066AFF',
        marginLeft: 8,
    },
    vehicleInfo: {
        paddingTop: 4,
    },
    vehicleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    vehicleIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EBF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    vehicleDetails: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    vehicleId: {
        fontSize: 14,
        color: '#6B7280',
    },
    rentalDetails: {
        paddingTop: 4,
    },
    rentalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateCard: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
    },
    dateLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
        textAlign: 'center',
    },
    timeValue: {
        fontSize: 13,
        color: '#066AFF',
        fontWeight: '500',
    },
    durationIndicator: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    durationLine: {
        width: 2,
        height: 32,
        backgroundColor: '#E5E7EB',
        marginBottom: 8,
    },
    durationBadge: {
        backgroundColor: '#066AFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    durationText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    driverInfo: {
        alignItems: 'center',
    },
    driverBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 8,
    },
    driverText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#10B981',
        marginLeft: 6,
    },
    driverName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4B5563',
    },
    actionsContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 12,
    },
    primaryButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#066AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    refundButton: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#EF4444',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },
    errorText: {
        fontSize: 18,
        color: '#EF4444',
        textAlign: 'center',
        marginTop: 100,
    },
});

export default Id;