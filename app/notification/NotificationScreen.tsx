import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Modal,
    ScrollView,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {Stack, useRouter} from 'expo-router';
import NotificationCard from '@/components/notifications/NotificationCard';
import { NotificationProps } from '@/utils/types/NotificationProps';
import notificationsData from '@/assets/Notifications/notifications.json'


const { width, height } = Dimensions.get('window');

const NotificationsScreen: React.FC = () => {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [selectedNotification, setSelectedNotification] = useState<NotificationProps | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const notifications = notificationsData;

    // Filtrer les notifications selon le filtre sélectionné
    const filteredNotifications = useMemo(() => {
        return notifications.filter(notification => {
            if (selectedFilter === 'all') return true;
            return notification.read_status === selectedFilter;
        });
    }, [selectedFilter, notifications]);

    const getFilterCount = (status: string) => {
        if (status === 'all') return notifications.length;
        return notifications.filter(notif => notif.read_status === status).length;
    };

    const handleNotificationPress = (id: number) => {
        const notification = notifications.find(n => n.id === id);
        if (notification) {
            setSelectedNotification(notification);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedNotification(null);
    };

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'location': return 'car';
            case 'payment': return 'card';
            case 'system': return 'settings';
            case 'promotion': return 'gift';
            case 'reminder': return 'alarm';
            default: return 'notifications';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'location': return ['#066AFF', '#0CB4FF'];
            case 'payment': return ['#10B981', '#34D399'];
            case 'system': return ['#6366F1', '#8B5CF6'];
            case 'promotion': return ['#F59E0B', '#FBBF24'];
            case 'reminder': return ['#EF4444', '#F87171'];
            default: return ['#6B7280', '#9CA3AF'];
        }
    };

    const formatFullDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderNotificationCard = ({ item }: { item: NotificationProps }) => (
        <NotificationCard notification={item} onPress={handleNotificationPress} />
    );

    const renderFilterChip = (
        status: 'all' | 'unread' | 'read',
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
                <Ionicons name="notifications-outline" size={64} color="#CBD5E1" />
            </View>
            <Text style={styles.emptyTitle}>Aucune notification</Text>
            <Text style={styles.emptySubtitle}>
                Vos notifications apparaîtront ici
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
                <StatusBar barStyle="light-content" backgroundColor="#066AFF" />
                <View style={styles.titleContainer}>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Notifications</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        {filteredNotifications.length} notification{filteredNotifications.length > 1 ? 's' : ''}
                    </Text>
                </View>
            </LinearGradient>

            {/* Filtres */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style={styles.filtersContainer}>
                    {renderFilterChip('all', 'Toutes', 'list')}
                    {renderFilterChip('unread', 'Non lues', 'radio-button-on')}
                    {renderFilterChip('read', 'Lues', 'checkmark-circle')}
                </ScrollView>
        </View>
    );

    // @ts-ignore
    const renderModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* En-tête de la modal */}
                    <View style={styles.modalHeader}>
                        <LinearGradient
                            // @ts-ignore
                            colors={selectedNotification ? getCategoryColor(selectedNotification.category) : ['#066AFF', '#0CB4FF']}
                            style={styles.modalHeaderGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={styles.modalIconContainer}>
                                <Ionicons
                                    name={selectedNotification ? getCategoryIcon(selectedNotification.category) as any : 'notifications'}
                                    size={24}
                                    color="#FFFFFF"
                                />
                            </View>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Ionicons name="close" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/* Contenu de la modal */}
                    <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                        {selectedNotification && (
                            <>
                                <View style={styles.modalTitleContainer}>
                                    <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                                    <View style={styles.modalCategoryBadge}>
                                        <Text style={styles.modalCategoryText}>{selectedNotification.category}</Text>
                                    </View>
                                </View>

                                <View style={styles.modalDateContainer}>
                                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                                    <Text style={styles.modalDate}>
                                        {formatFullDate(selectedNotification.created_at)}
                                    </Text>
                                    {selectedNotification.read_status === 'unread' && (
                                        <View style={styles.modalUnreadBadge}>
                                            <Text style={styles.modalUnreadText}>NON LUE</Text>
                                        </View>
                                    )}
                                </View>

                                <View style={styles.modalTextContainer}>
                                    <Text style={styles.modalText}>{selectedNotification.content}</Text>
                                </View>

                                {/* Actions */}
                                <View style={styles.modalActions}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <LinearGradient
                                            colors={['#066AFF', '#0CB4FF']}
                                            style={styles.actionButtonGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                            <Text style={styles.actionButtonText}>Marquer comme lue</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.secondaryActionButton}>
                                        <Text style={styles.secondaryActionText}>Supprimer</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,      // Affiche jus// @ts-ignorete la barre avec bouton retour
                    headerBackTitle: 'Back', // Texte personnalisé
                    headerTransparent: true, // Style optionnel
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor="#066AFF" />

             <View>
                 {renderHeader()}
             </View>
            <View style={styles.container}>
            <FlatList
                data={filteredNotifications}
                renderItem={renderNotificationCard}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={renderEmptyState}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshing={false}
                onRefresh={() => {
                    // Logique de refresh si nécessaire
                }}
            />
            {renderModal()}
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
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
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
    // Styles de la modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: height * 0.85,
        minHeight: height * 0.5,
    },
    modalHeader: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    modalHeaderGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        height: 70,
    },
    modalIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    modalTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
        flex: 1,
        marginRight: 12,
    },
    modalCategoryBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    modalCategoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
    },
    modalDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalDate: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
        flex: 1,
    },
    modalUnreadBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    modalUnreadText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#D97706',
        letterSpacing: 0.5,
    },
    modalTextContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    modalText: {
        fontSize: 16,
        color: '#374151',
        lineHeight: 24,
    },
    modalActions: {
        paddingBottom: 30,
    },
    actionButton: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 12,
    },
    actionButtonGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 8,
    },
    secondaryActionButton: {
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    secondaryActionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
    },
});

export default NotificationsScreen;