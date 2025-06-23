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
import { NotificationProps } from '@/utils/types/NotificationProps';

const { width } = Dimensions.get('window');

interface NotificationCardProps {
    notification: NotificationProps;
    onPress: (id: number) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onPress }) => {
    const isUnread = notification.read_status === 'unread';

    const getCategoryIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'location':
                return 'car';
            case 'payment':
                return 'card';
            case 'system':
                return 'settings';
            case 'promotion':
                return 'gift';
            case 'reminder':
                return 'alarm';
            default:
                return 'notifications';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'location':
                return ['#066AFF', '#0CB4FF'];
            case 'payment':
                return ['#10B981', '#34D399'];
            case 'system':
                return ['#6366F1', '#8B5CF6'];
            case 'promotion':
                return ['#F59E0B', '#FBBF24'];
            case 'reminder':
                return ['#EF4444', '#F87171'];
            default:
                return ['#6B7280', '#9CA3AF'];
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Aujourd\'hui';
        } else if (diffDays === 1) {
            return 'Hier';
        } else if (diffDays < 7) {
            return `Il y a ${diffDays} jours`;
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short'
            });
        }
    };

    const truncateContent = (content: string, maxLength: number = 80) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    // @ts-ignore
    return (
        <TouchableOpacity
            style={[styles.container, isUnread && styles.unreadContainer]}
            onPress={() => onPress(notification.id)}
            activeOpacity={0.8}
        >
            <View style={styles.cardContent}>
                {/* Indicateur de lecture */}
                {isUnread && <View style={styles.unreadIndicator} />}

                {/* Icône de catégorie */}
                <View style={styles.iconContainer}>
                    <LinearGradient
                        // @ts-ignore
                        colors={getCategoryColor(notification.category)}
                        style={styles.iconGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Ionicons
                            name={getCategoryIcon(notification.category) as any}
                            size={20}
                            color="#FFFFFF"
                        />
                    </LinearGradient>
                </View>

                {/* Contenu principal */}
                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.title, isUnread && styles.unreadTitle]}>
                            {notification.title}
                        </Text>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{notification.category}</Text>
                        </View>
                    </View>

                    <Text style={styles.content}>
                        {truncateContent(notification.content)}
                    </Text>

                    <View style={styles.footerRow}>
                        <Text style={styles.dateText}>
                            {formatDate(notification.created_at)}
                        </Text>
                        {isUnread && (
                            <View style={styles.newBadge}>
                                <Text style={styles.newBadgeText}>NOUVEAU</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Flèche */}
                <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 6,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        overflow: 'hidden',
    },
    unreadContainer: {
        shadowOpacity: 0.15,
        shadowColor: '#066AFF',
        elevation: 6,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        position: 'relative',
    },
    unreadIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: '#066AFF',
    },
    iconContainer: {
        marginRight: 16,
    },
    iconGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
        marginRight: 8,
    },
    unreadTitle: {
        fontWeight: '700',
    },
    categoryBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
    },
    content: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom: 8,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    newBadge: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    newBadgeText: {
        fontSize: 8,
        fontWeight: '800',
        color: '#D97706',
        letterSpacing: 0.5,
    },
    arrowContainer: {
        marginLeft: 12,
        opacity: 0.5,
    },
});

export default NotificationCard;