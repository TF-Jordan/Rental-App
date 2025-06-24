import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRouter} from "expo-router";


interface MenuItem {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    badge?: number;
    showDivider?: boolean;
}

interface MenuPageProps {
    onNavigate: (page: string) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
    const menuItems: MenuItem[] = [
        {
            id: 'profile',
            title: 'Profil',
            subtitle: 'Gérer mes informations personnelles',
            icon: 'person-outline',
        },
        {
            id: 'Staff',
            title: 'Mon Staff',
            subtitle: 'Gérer ma flotte de véhicules',
            icon: 'person',
            showDivider: true,
        },
        {
            id: 'rentals',
            title: 'Locations',
            subtitle: 'Réservations en cours et historique',
            icon: 'time-outline',
            badge: 3,
        },
        {
            id: 'transactions',
            title: 'Transactions',
            subtitle: 'Paiements et historique financier',
            icon: 'card-outline',
        },
        {
            id: 'analytics',
            title: 'Statistiques',
            subtitle: 'Revenus et performances',
            icon: 'bar-chart-outline',
            showDivider: true,
        },
        {
            id: 'calendar',
            title: 'Calendrier',
            subtitle: 'Planning des réservations',
            icon: 'calendar-outline',
        },
        {
            id: 'reviews',
            title: 'Avis et Notes',
            subtitle: 'Évaluations des locataires',
            icon: 'star-outline',
        },
        {
            id: 'notifications',
            title: 'Notifications',
            subtitle: 'Messages et alertes',
            icon: 'notifications-outline',
            badge: 5,
            showDivider: true,
        },
        {
            id: 'settings',
            title: 'Paramètres',
            subtitle: 'Configuration de l\'application',
            icon: 'settings-outline',
        },
        {
            id: 'support',
            title: 'Aide',
            subtitle: 'Support et assistance',
            icon: 'help-circle-outline',
        },
    ];

    const handleItemPress = (item: MenuItem) => {
        onNavigate(item.id);
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Menu</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <TouchableOpacity
                    style={styles.profileSection}
                    onPress={() => onNavigate('profile')}
                    activeOpacity={0.7}
                >
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                            }}
                            style={styles.profileImage}
                        />
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Jordan</Text>
                        <Text style={styles.profileStatus}>Propriétaire Premium</Text>
                    </View>
                </TouchableOpacity>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <View key={item.id}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => handleItemPress(item)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.menuItemLeft}>
                                    <View style={[styles.iconContainer, { backgroundColor: '#066AFF' + '15' }]}>
                                        <Ionicons
                                            name={item.icon as any}
                                            size={22}
                                            color="#066AFF"
                                        />
                                    </View>

                                    <View style={styles.menuItemContent}>
                                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                                        <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                                    </View>
                                </View>

                                <View style={styles.menuItemRight}>
                                    {item.badge && (
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeText}>{item.badge}</Text>
                                        </View>
                                    )}
                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color="#8E8E93"
                                    />
                                </View>
                            </TouchableOpacity>

                            {item.showDivider && <View style={styles.divider} />}
                        </View>
                    ))}
                </View>

                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Véhicules</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>89</Text>
                            <Text style={styles.statLabel}>Locations</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>€2,450</Text>
                            <Text style={styles.statLabel}>Ce mois</Text>
                        </View>
                    </View>
                </View>

                {/* Footer Actions */}
                <View style={styles.footerActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => onNavigate('invite')}
                    >
                        <Ionicons name="person-add-outline" size={20} color="#066AFF" />
                        <Text style={styles.actionButtonText}>Inviter des amis</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => onNavigate('about')}
                    >
                        <Ionicons name="information-circle-outline" size={20} color="#066AFF" />
                        <Text style={styles.actionButtonText}>À propos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.logoutButton]}
                        onPress={() => onNavigate('logout')}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
                        <Text style={[styles.actionButtonText, styles.logoutText]}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>
                        VehiRent pour Propriétaires v1.2.0
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7',
    },
    header: {
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight || 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e5ea',
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        flex: 1,
    },
    profileSection: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 20,
        marginHorizontal: 0,
    },
    profileImageContainer: {
        marginRight: 15,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 3,
    },
    profileStatus: {
        fontSize: 14,
        color: '#8E8E93',
    },
    profileStats: {
        alignItems: 'flex-end',
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#066AFF' + '10',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: '#066AFF',
        marginRight: 3,
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
        minHeight: 60,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuItemContent: {
        flex: 1,
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        marginBottom: 2,
    },
    menuItemSubtitle: {
        fontSize: 13,
        color: '#8E8E93',
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#066AFF',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginRight: 8,
        minWidth: 20,
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    divider: {
        height: 8,
        backgroundColor: '#f2f2f7',
    },
    statsContainer: {
        backgroundColor: '#fff',
        marginTop: 20,
        paddingVertical: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '600',
        color: '#066AFF',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 13,
        color: '#8E8E93',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#e5e5ea',
    },
    footerActions: {
        backgroundColor: '#fff',
        marginTop: 20,
        marginBottom: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e5ea',
    },
    actionButtonText: {
        fontSize: 16,
        color: '#066AFF',
        marginLeft: 15,
    },
    logoutButton: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#FF3B30',
    },
    versionContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 13,
        color: '#8E8E93',
    },
});

// Exemple d'utilisation dans votre navigation
const MenuScreen: React.FC = () => {
    const router=useRouter();
    const handleNavigation = (page: string) => {
        // Intégration avec votre système de navigation
        switch (page) {
            case 'profile':
                router.push(`/profil/ProfileScreen`)
                break;
            case 'Staff':
                router.push(`/Menu/staff`)
                break;
            case 'rentals':
                router.push(`/Menu/Locations`)
                break;
            case 'transactions':
                router.push(`/Menu/TransactionScreen`);
                break;
            case 'analytics':
                router.push(`/(tabs)/Vehicles`)
                break;
            case 'calendar':
                // navigation.navigate('CalendarScreen');
                break;
            case 'reviews':
                // navigation.navigate('ReviewsScreen');
                break;
            case 'notifications':
                router.push(`/notification/NotificationScreen`)
                break;
            case 'settings':
                // navigation.navigate('SettingsScreen');
                break;
            case 'support':
                // navigation.navigate('SupportScreen');
                break;
            case 'logout':
                // Logique de déconnexion
                console.log('Logout pressed');
                break;
            default:
                console.log('Unknown page:', page);
        }
    };

    return (
        <MenuPage onNavigate={handleNavigation} />
    );
};

export default MenuScreen;