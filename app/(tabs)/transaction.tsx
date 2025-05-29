// app/(tabs)/OwnerTransactionsScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import {OWNER_TRANSACTIONS} from "@/data/ownerTransaction";
import {OwnerTransaction} from "@/utils/types/OwnerTransaction";
import HEADER from "@/components/Header";
const FILTERS = ['All', 'Payments', 'Refunds', 'Deposits', 'Withdrawals'] as const;
type Filter = typeof FILTERS[number];

const OwnerTransactionsScreen = () => {
    const [activeFilter, setActiveFilter] = useState<Filter>('All');

    const filteredTransactions = OWNER_TRANSACTIONS.filter(transaction => {
        if (activeFilter === 'All') return true;
        return transaction.type === activeFilter.toLowerCase();
    });

    const totalBalance = OWNER_TRANSACTIONS.reduce((acc, curr) => {
        return acc + curr.amount;
    }, 0);

    const renderTransaction = ({ item }: { item: OwnerTransaction }) => (
        <View style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
                <Image source={{ uri: item.vehicle.image }} style={styles.vehicleImage} />
                <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>{item.vehicle.make} {item.vehicle.model}</Text>
                    <Text style={styles.transactionDate}>{format(new Date(item.date), 'dd MMM yyyy, HH:mm')}</Text>
                </View>
                <Text style={styles.transactionAmount}>
                    {item.type === 'refund' || item.type === 'deposit' ? '+' : ''}XFA {item.amount.toFixed(0)}
                </Text>
            </View>
            {item.driver && (
                <View style={styles.driverInfo}>
                    <Image source={{ uri: item.driver.avatar }} style={styles.driverAvatar} />
                    <Text style={styles.driverName}>{item.driver.name}</Text>
                </View>
            )}
            <Text style={styles.transactionStatus}>Status: {item.status}</Text>
        </View>
    );

    return (
        <>
            <HEADER logo='EASY-RENT' />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Transactions</Text>
                <Text style={styles.balance}>Solde : XFA {totalBalance.toFixed(0)}</Text>
                <View style={styles.filters}>
                    {FILTERS.map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterButton,
                                activeFilter === filter && styles.activeFilterButton,
                            ]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    activeFilter === filter && styles.activeFilterText,
                                ]}
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <FlatList
                    data={filteredTransactions}
                    keyExtractor={item => item.id}
                    renderItem={renderTransaction}
                    contentContainerStyle={styles.transactionsList}
                />
            </SafeAreaView>
       </>
    );
};

export default OwnerTransactionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    balance: {
        fontSize: 18,
        marginVertical: 8,
        color: 'blue',
        fontWeight: 'bold',
    },
    filters: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    filterButton: {
        padding: 8,
        marginRight: 8,
        borderRadius: 4,
        backgroundColor: '#29A9AF',
    },
    activeFilterButton: {
        backgroundColor: '#007bff',
    },
    filterText: {
        color: '#FFFFFF',
    },
    activeFilterText: {
        color: '#fff',
    },
    transactionsList: {
        paddingVertical: 8,
    },
    transactionCard: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f9f9f5',
        marginBottom: 12,
    },
    transactionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 12,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    transactionDate: {
        fontSize: 14,
        color: '#666',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    driverAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    driverName: {
        fontSize: 14,
    },
    transactionStatus: {
        marginTop: 8,
        fontSize: 14,
        color: 'green',
    },
});
