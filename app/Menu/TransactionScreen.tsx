import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    StatusBar,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import TransactionCard from '@/components/transactions/TransactionCard';
import { Transaction } from '@/utils/types/payment';
import {transactionsData as transactions} from '@/assets/transactions/data'





type FilterType = 'all' | 'completed' | 'pending' | 'failed';

const TransactionsScreen: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

    // Filtrer les transactions selon la recherche et le filtre sélectionné
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const matchesSearch = searchQuery === '' ||
                transaction.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.vehicleRental.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.id.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter = selectedFilter === 'all' || transaction.status === selectedFilter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, selectedFilter, transactions]);

    const getFilterCount = (status: string) => {
        if (status === 'all') return transactions.length;
        return transactions.filter(txn => txn.status === status).length;
    };

    const getTotalAmount = () => {
        return filteredTransactions
            .filter(txn => txn.status === 'completed')
            .reduce((total, txn) => total + txn.amount, 0);
    };

    const handleTransactionPress = (id: string) => {
        // @ts-ignore
        router.push(`/transaction/${id}`);
    };

    const renderTransactionCard = ({ item }: { item: Transaction }) => (
        <TransactionCard transaction={item} onPress={handleTransactionPress} />
    );

    const renderFilterChip = (
        status: FilterType,
        label: string,
        icon: string
    ) => {
        const isSelected = selectedFilter === status;
        const count = getFilterCount(status);

        return (
            <TouchableOpacity
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => setSelectedFilter(status)}
                activeOpacity={0.7}
            >
                {isSelected ? (
                    <LinearGradient
                        colors={['#066AFF', '#0CB4FF']}
                        style={styles.filterChipGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons name={icon as any} size={16} color="#FFFFFF" />
                        <Text style={[styles.filterChipText, styles.filterChipTextSelected]}>
                            {label}
                        </Text>
                        <View style={styles.filterChipBadge}>
                            <Text style={styles.filterChipBadgeText}>{count}</Text>
                        </View>
                    </LinearGradient>
                ) : (
                    <View style={styles.filterChipContent}>
                        <Ionicons name={icon as any} size={16} color="#6B7280" />
                        <Text style={styles.filterChipText}>{label}</Text>
                        <View style={[styles.filterChipBadge, styles.filterChipBadgeInactive]}>
                            <Text style={[styles.filterChipBadgeText, styles.filterChipBadgeTextInactive]}>
                                {count}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
                <Ionicons name="receipt-outline" size={64} color="#CBD5E1" />
            </View>
            <Text style={styles.emptyTitle}>Aucune transaction trouvée</Text>
            <Text style={styles.emptySubtitle}>
                {searchQuery
                    ? "Essayez de modifier votre recherche ou vos filtres"
                    : "Vos transactions apparaîtront ici une fois effectuées"
                }
            </Text>
        </View>
    );

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <LinearGradient
                colors={['#066AFF', '#0CB4FF']}
                style={styles.headerGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.titleContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Transactions</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        {filteredTransactions.length} transaction{filteredTransactions.length > 1 ? 's' : ''}
                    </Text>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'XAF',
                                minimumFractionDigits: 0,
                            }).format(getTotalAmount())}
                        </Text>
                        <Text style={styles.statLabel}>Total encaissé</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {getFilterCount('completed')}
                        </Text>
                        <Text style={styles.statLabel}>Transactions réussies</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Filtres */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersContainer}
            >
                {renderFilterChip('all', 'Toutes', 'list')}
                {renderFilterChip('completed', 'Réussies', 'checkmark-circle')}
                {renderFilterChip('pending', 'En cours', 'time')}
                {renderFilterChip('failed', 'Échouées', 'close-circle')}
            </ScrollView>
        </View>
    );

    // @ts-ignore
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor="#066AFF" />

            <View style={styles.container}>
                {renderHeader()}

                <FlatList
                    // @ts-ignore
                    data={filteredTransactions}
                    renderItem={renderTransactionCard}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={renderEmptyState}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    refreshing={false}
                    onRefresh={() => {
                        // Logique de refresh si nécessaire
                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    headerContainer: {
        marginBottom: 8,
    },
    headerGradient: {
        paddingTop: StatusBar.currentHeight || 0,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    titleContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        textAlign: 'center',
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginTop: -12,
        marginBottom: 16,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
    clearButton: {
        padding: 4,
    },
    filtersContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    filterChip: {
        marginHorizontal: 6,
        borderRadius: 20,
        overflow: 'hidden',
    },
    filterChipSelected: {
        elevation: 4,
        shadowColor: '#066AFF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    filterChipGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    filterChipContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#F3F4F6',
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginHorizontal: 8,
    },
    filterChipTextSelected: {
        color: '#FFFFFF',
    },
    filterChipBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 24,
        alignItems: 'center',
    },
    filterChipBadgeInactive: {
        backgroundColor: '#E5E7EB',
    },
    filterChipBadgeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    filterChipBadgeTextInactive: {
        color: '#6B7280',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 80,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default TransactionsScreen;