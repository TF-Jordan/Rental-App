import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StatusBar, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {Stack, useRouter} from 'expo-router';
import LocationCard from '@/components/location/new/LocationCard';
import HEADER from '@/components/General/Header';
import { LocationProps } from '@/utils/types/LocationProps';
import locationData from '@/assets/location/location.json';

const { width, height } = Dimensions.get('window');

const LocationsScreen: React.FC = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

    const locations = locationData as unknown as LocationProps[];

    // Filtrer les locations selon la recherche et le filtre sélectionné
    const filteredLocations = useMemo(() => {
        return locations.filter(location => {
            const matchesSearch = searchQuery === '' ||
                location.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                location.vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                location.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                location.pick_up.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
                location.drop_off.place.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter = selectedFilter === 'all' || location.status === selectedFilter;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, selectedFilter, locations]);

    const getFilterCount = (status: string) => {
        if (status === 'all') return locations.length;
        return locations.filter(loc => loc.status === status).length;
    };

    const handleLocationPress = (id: number) => {
        // @ts-ignore
        router.push(`/location-details/${id}`);
    };

    const renderLocationCard = ({ item }: { item: LocationProps }) => (
        <LocationCard location={item} onPress={handleLocationPress} />
    );

    const renderFilterChip = (
        status: 'all' | 'pending' | 'completed' | 'cancelled',
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
                <Ionicons name="car-outline" size={64} color="#CBD5E1" />
            </View>
            <Text style={styles.emptyTitle}>Aucune location trouvée</Text>
            <Text style={styles.emptySubtitle}>
                {searchQuery
                    ? "Essayez de modifier votre recherche ou vos filtres"
                    : "Vos locations apparaîtront ici une fois créées"
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
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Mes Locations</Text>
                    </View>

                    <Text style={styles.subtitle}>
                        {filteredLocations.length} location{filteredLocations.length > 1 ? 's' : ''}
                    </Text>
                </View>
            </LinearGradient>

            {/* Filtres */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}>
                    {renderFilterChip('all', 'Toutes', 'list')}
                    {renderFilterChip('pending', 'En cours', 'time')}
                    {renderFilterChip('completed', 'Terminées', 'checkmark-circle')}
                    {renderFilterChip('cancelled', 'Annulées', 'close-circle')}
            </ScrollView>
        </View>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor="#066AFF" />


        {renderHeader()}
        <View style={styles.container}>
            <FlatList
                data={filteredLocations}
                renderItem={renderLocationCard}
                keyExtractor={(item) => item.id.toString()}
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
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 4,
        marginLeft:8
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
    },
    searchContainer: {
        paddingHorizontal: 20,
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
    filtersScrollView: {
        flexDirection: 'row',
        paddingHorizontal: 12,
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

export default LocationsScreen;