import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    StatusBar,
    Alert,
    Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Stack, useRouter} from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

interface ProfileInfoItem {
    id: string;
    title: string;
    value: string;
    icon: string;
    editable?: boolean;
}

interface DocumentItem {
    id: string;
    title: string;
    status: 'verified' | 'pending' | 'expired';
    icon: string;
    expiryDate?: string;
}

const ProfileScreen: React.FC = () => {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [autoAcceptBookings, setAutoAcceptBookings] = useState(false);

    const profileInfo: ProfileInfoItem[] = [
        {
            id: 'name',
            title: 'Nom complet',
            value: 'Jordan Mballa',
            icon: 'person-outline',
            editable: true,
        },
        {
            id: 'email',
            title: 'Email',
            value: 'jordan.mballa@email.com',
            icon: 'mail-outline',
            editable: true,
        },
        {
            id: 'phone',
            title: 'Téléphone',
            value: '+237 6 XX XX XX XX',
            icon: 'call-outline',
            editable: true,
        },
        {
            id: 'location',
            title: 'Ville',
            value: 'Douala, Cameroun',
            icon: 'location-outline',
            editable: true,
        },
        {
            id: 'birthdate',
            title: 'Date de naissance',
            value: '15 Mars 1990',
            icon: 'calendar-outline',
            editable: true,
        },
        {
            id: 'member_since',
            title: 'Membre depuis',
            value: 'Janvier 2023',
            icon: 'time-outline',
            editable: false,
        },
    ];

    const documents: DocumentItem[] = [
        {
            id: 'id_card',
            title: 'Carte d\'identité',
            status: 'verified',
            icon: 'card-outline',
        },
        {
            id: 'driving_license',
            title: 'Permis de conduire',
            status: 'verified',
            icon: 'car-outline',
            expiryDate: '15/08/2028',
        },
        {
            id: 'insurance',
            title: 'Assurance véhicules',
            status: 'pending',
            icon: 'shield-outline',
            expiryDate: '20/12/2025',
        },
        {
            id: 'business_license',
            title: 'Licence commerciale',
            status: 'verified',
            icon: 'business-outline',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'verified':
                return '#34C759';
            case 'pending':
                return '#FF9500';
            case 'expired':
                return '#FF3B30';
            default:
                return '#8E8E93';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'verified':
                return 'Vérifié';
            case 'pending':
                return 'En attente';
            case 'expired':
                return 'Expiré';
            default:
                return 'Non vérifié';
        }
    };

    const handleEditProfile = () => {
        Alert.alert('Modifier le profil', 'Fonctionnalité à implémenter');
    };

    const handleEditItem = (item: ProfileInfoItem) => {
        if (item.editable) {
            Alert.alert('Modifier', `Modifier ${item.title}`);
        }
    };

    const handleDocumentPress = (doc: DocumentItem) => {
        Alert.alert(doc.title, `Gérer le document: ${doc.title}`);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,      // Affiche jus// @ts-ignorete la barre avec bouton retour
                    headerBackTitle: 'Back', // Texte personnalisé
                    headerTransparent: true, // Style optionnel
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor="#066AFF" />

            {/* Header with Gradient */}
            <LinearGradient
                colors={['#066AFF', '#0CB4FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Mon Profil</Text>
                    <TouchableOpacity
                        onPress={handleEditProfile}
                        style={styles.editButton}
                    >
                        <Ionicons name="create-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Profile Picture Section */}
                <View style={styles.profilePictureSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
                            }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.cameraButton}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileName}>Jordan Mballa</Text>
                    <View style={styles.statusBadge}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.statusText}>Propriétaire Premium</Text>
                    </View>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Statistics Cards */}
                <View style={styles.statsSection}>
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>4.9</Text>
                            <Text style={styles.statLabel}>Note moyenne</Text>
                            <View style={styles.starsContainer}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Ionicons
                                        key={star}
                                        name="star"
                                        size={12}
                                        color="#FFD700"
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>156</Text>
                            <Text style={styles.statLabel}>Locations</Text>
                            <Text style={styles.statSubtext}>Total réalisées</Text>
                        </View>
                    </View>
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>98%</Text>
                            <Text style={styles.statLabel}>Taux de réponse</Text>
                            <Text style={styles.statSubtext}>Sous 2h</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statValue}>2.5 ans</Text>
                            <Text style={styles.statLabel}>Expérience</Text>
                            <Text style={styles.statSubtext}>Sur VehiRent</Text>
                        </View>
                    </View>
                </View>

                {/* Personal Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informations personnelles</Text>
                    <View style={styles.card}>
                        {profileInfo.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.infoItem,
                                    index !== profileInfo.length - 1 && styles.itemBorder,
                                ]}
                                onPress={() => handleEditItem(item)}
                                disabled={!item.editable}
                            >
                                <View style={styles.infoLeft}>
                                    <View style={styles.infoIcon}>
                                        <Ionicons
                                            name={item.icon as any}
                                            size={20}
                                            color="#066AFF"
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.infoTitle}>{item.title}</Text>
                                        <Text style={styles.infoValue}>{item.value}</Text>
                                    </View>
                                </View>
                                {item.editable && (
                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color="#8E8E93"
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Documents Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Documents</Text>
                    <View style={styles.card}>
                        {documents.map((doc, index) => (
                            <TouchableOpacity
                                key={doc.id}
                                style={[
                                    styles.documentItem,
                                    index !== documents.length - 1 && styles.itemBorder,
                                ]}
                                onPress={() => handleDocumentPress(doc)}
                            >
                                <View style={styles.documentLeft}>
                                    <View style={styles.documentIcon}>
                                        <Ionicons
                                            name={doc.icon as any}
                                            size={20}
                                            color="#066AFF"
                                        />
                                    </View>
                                    <View style={styles.documentInfo}>
                                        <Text style={styles.documentTitle}>{doc.title}</Text>
                                        {doc.expiryDate && (
                                            <Text style={styles.documentExpiry}>
                                                Expire le {doc.expiryDate}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.documentRight}>
                                    <View
                                        style={[
                                            styles.statusBadgeSmall,
                                            { backgroundColor: getStatusColor(doc.status) + '15' },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.statusBadgeText,
                                                { color: getStatusColor(doc.status) },
                                            ]}
                                        >
                                            {getStatusText(doc.status)}
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color="#8E8E93"
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Préférences</Text>
                    <View style={styles.card}>
                        <View style={styles.preferenceItem}>
                            <View style={styles.preferenceLeft}>
                                <View style={styles.preferenceIcon}>
                                    <Ionicons
                                        name="notifications-outline"
                                        size={20}
                                        color="#066AFF"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.preferenceTitle}>Notifications push</Text>
                                    <Text style={styles.preferenceSubtitle}>
                                        Recevoir les notifications
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: '#E5E5EA', true: '#066AFF30' }}
                                thumbColor={notificationsEnabled ? '#066AFF' : '#f4f3f4'}
                            />
                        </View>

                        <View style={[styles.preferenceItem, styles.itemBorder]}>
                            <View style={styles.preferenceLeft}>
                                <View style={styles.preferenceIcon}>
                                    <Ionicons
                                        name="checkmark-circle-outline"
                                        size={20}
                                        color="#066AFF"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.preferenceTitle}>Acceptation automatique</Text>
                                    <Text style={styles.preferenceSubtitle}>
                                        Auto-accepter les réservations
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={autoAcceptBookings}
                                onValueChange={setAutoAcceptBookings}
                                trackColor={{ false: '#E5E5EA', true: '#066AFF30' }}
                                thumbColor={autoAcceptBookings ? '#066AFF' : '#f4f3f4'}
                            />
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="shield-checkmark-outline" size={20} color="#066AFF" />
                        <Text style={styles.actionButtonText}>Vérifier mon identité</Text>
                        <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="help-circle-outline" size={20} color="#066AFF" />
                        <Text style={styles.actionButtonText}>Centre d'aide</Text>
                        <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
                        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                        <Text style={[styles.actionButtonText, styles.dangerText]}>
                            Supprimer mon compte
                        </Text>
                        <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSpacing} />
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
        paddingTop: StatusBar.currentHeight || 40,
        paddingBottom: 30,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
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
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePictureSection: {
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#fff',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#066AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    statusText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 6,
    },
    content: {
        flex: 1,
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#f2f2f7',
    },
    statsSection: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 10,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 15,
        gap: 15,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#066AFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    statSubtext: {
        fontSize: 12,
        color: '#8E8E93',
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 4,
        gap: 2,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    infoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#066AFF15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoTitle: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    itemBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    documentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    documentIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#066AFF15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    documentInfo: {
        flex: 1,
    },
    documentTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    documentExpiry: {
        fontSize: 13,
        color: '#8E8E93',
    },
    documentRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusBadgeSmall: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    preferenceLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    preferenceIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#066AFF15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    preferenceTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    preferenceSubtitle: {
        fontSize: 13,
        color: '#8E8E93',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionButtonText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#066AFF',
        marginLeft: 12,
    },
    dangerButton: {
        borderColor: '#FF3B30',
        borderWidth: 0.5,
    },
    dangerText: {
        color: '#FF3B30',
    },
    bottomSpacing: {
        height: 30,
    },
});

export default ProfileScreen;