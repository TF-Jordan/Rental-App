import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '@/utils/types/payment';
import {Link} from "expo-router";

const { width } = Dimensions.get('window');

interface TransactionCardProps {
    transaction: Transaction;
    onPress: (id: string) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
                                                             transaction,
                                                             onPress,
                                                         }) => {
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
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

    // @ts-ignore
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Header avec statut */}
                <View style={styles.header}>
                    <View style={styles.transactionInfo}>
                        <Text style={styles.transactionId}>#{transaction.id.slice(-8)}</Text>
                        <Text style={styles.date}>
                            {formatDate(transaction.date)} • {formatTime(transaction.date)}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(transaction.status) + '20' },
                        ]}
                    >
                        <View
                            style={[
                                styles.statusDot,
                                { backgroundColor: getStatusColor(transaction.status) },
                            ]}
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

                {/* Montant principal */}
                <View style={styles.amountSection}>
                    <Text style={styles.amount}>{formatAmount(transaction.amount)}</Text>
                    <View style={styles.paymentMethodContainer}>
                        <View
                            style={[
                                styles.paymentMethodIcon,
                                { backgroundColor: getPaymentMethodColor(transaction.paymentMethod) + '20' },
                            ]}
                        >
                            <Ionicons
                                name={getPaymentMethodIcon(transaction.paymentMethod) as any}
                                size={16}
                                color={getPaymentMethodColor(transaction.paymentMethod)}
                            />
                        </View>
                        <Text style={styles.paymentMethodText}>
                            {transaction.paymentMethod.toUpperCase()}
                        </Text>
                    </View>
                </View>

                {/* Informations client */}
                <View style={styles.customerSection}>
                    <View style={styles.customerAvatar}>
                        <Text style={styles.customerInitial}>
                            {transaction.customer.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerName}>{transaction.customer.name}</Text>
                        <Text style={styles.customerEmail}>{transaction.customer.email}</Text>
                    </View>
                </View>

                {/* Informations véhicule */}
                <View style={styles.vehicleSection}>
                    <View style={styles.vehicleInfo}>
                        <View style={styles.vehicleIcon}>
                            <Ionicons name="car-outline" size={20} color="#066AFF" />
                        </View>
                        <View style={styles.vehicleDetails}>
                            <Text style={styles.vehicleName}>{transaction.vehicleRental.vehicleName}</Text>
                            <View style={styles.vehicleOptions}>
                                {transaction.vehicleRental.withDriver && (
                                    <View style={styles.driverBadge}>
                                        <Ionicons name="person" size={12} color="#10B981" />
                                        <Text style={styles.driverText}>Avec chauffeur</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Footer avec bouton */}
                <View style={styles.footer}>
                    <View style={styles.rentalDates}>
                        <Text style={styles.rentalDatesText}>
                            Du {formatDate(transaction.vehicleRental.startDate)} au{' '}
                            {formatDate(transaction.vehicleRental.endDate)}
                        </Text>
                    </View>
                    <Link href={`/transaction/${transaction.id}` } asChild>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => onPress(transaction.id)}
                    >
                        <LinearGradient
                            colors={['#066AFF', '#0CB4FF']}
                            style={styles.viewButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.viewButtonText}>Voir plus</Text>
                            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                        </LinearGradient>
                    </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    card: {
        backgroundColor: '#FFFFFF',
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
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionId: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    amountSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    amount: {
        fontSize: 24,
        fontWeight: '800',
        color: '#066AFF',
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentMethodIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    paymentMethodText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    customerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    customerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#066AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    customerInitial: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    customerEmail: {
        fontSize: 14,
        color: '#6B7280',
    },
    vehicleSection: {
        marginBottom: 16,
    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EBF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    vehicleDetails: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    vehicleOptions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    driverText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#10B981',
        marginLeft: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rentalDates: {
        flex: 1,
    },
    rentalDatesText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    viewButton: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#066AFF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    viewButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    viewButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
        marginRight: 6,
    },
});

export default TransactionCard;