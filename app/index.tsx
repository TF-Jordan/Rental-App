import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import {Stack,useRouter} from "expo-router";

const { width, height } = Dimensions.get('window');
// eslint-disable-next-line react-hooks/rules-of-hooks

const OwnerLandingPage = () => {
    const router=useRouter();
    const handleGetStarted = () => {
        // @ts-ignore
        router.push(`/authScreen`);
    };

    const handleViewDemo = () => {
        console.log('View Demo pressed');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Background avec gradient overlay */}
            <LinearGradient
                colors={['#066AFF', '#0CB4FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.backgroundGradient}
            >
                <View style={styles.overlay} />
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header avec logo */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <MaterialIcons name="drive-eta" size={32} color="#FFFFFF" />
                        <Text style={styles.logoText}>EASY-RENT</Text>
                        <View style={styles.ownerBadge}>
                            <Text style={styles.ownerBadgeText}>PRO</Text>
                        </View>
                    </View>
                </View>

                {/* Contenu principal */}
                <View style={styles.mainContent}>
                    {/* Titre principal */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}>
                            Gérez votre{'\n'}
                            <Text style={styles.highlightText}>flotte automobile</Text>
                            {'\n'}en toute simplicité
                        </Text>
                        <Text style={styles.subtitle}>
                            Maximisez vos revenus avec notre plateforme de gestion intelligente.
                            Suivi en temps réel, analytics avancés et automatisation complète.
                        </Text>
                    </View>

                    {/* Stats en un coup d'œil */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>+127%</Text>
                            <Text style={styles.statLabel}>Revenus moyens</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>24/7</Text>
                            <Text style={styles.statLabel}>Monitoring</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>98%</Text>
                            <Text style={styles.statLabel}>Satisfaction</Text>
                        </View>
                    </View>

                    {/* Caractéristiques principales */}
                    <View style={styles.featuresContainer}>
                        <View style={styles.featureRow}>
                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: 'rgba(255, 140, 66, 0.2)' }]}>
                                    <MaterialIcons name="analytics" size={28} color="#FF8C42" />
                                </View>
                                <Text style={styles.featureTitle}>Analytics en temps réel</Text>
                                <Text style={styles.featureDescription}>
                                    Suivez vos revenus, taux d'occupation et performances instantanément
                                </Text>
                            </View>

                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: 'rgba(12, 180, 255, 0.2)' }]}>
                                    <MaterialIcons name="gps-fixed" size={28} color="#0CB4FF" />
                                </View>
                                <Text style={styles.featureTitle}>Géolocalisation GPS</Text>
                                <Text style={styles.featureDescription}>
                                    Localisez vos véhicules en temps réel et optimisez leur positionnement
                                </Text>
                            </View>
                        </View>

                        <View style={styles.featureRow}>
                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: 'rgba(6, 106, 255, 0.2)' }]}>
                                    <MaterialIcons name="auto-awesome" size={28} color="#066AFF" />
                                </View>
                                <Text style={styles.featureTitle}>Gestion automatisée</Text>
                                <Text style={styles.featureDescription}>
                                    Réservations, paiements et contrats gérés automatiquement
                                </Text>
                            </View>

                            <View style={styles.featureItem}>
                                <View style={[styles.featureIcon, { backgroundColor: 'rgba(255, 215, 0, 0.2)' }]}>
                                    <MaterialIcons name="shield" size={28} color="#FFD700" />
                                </View>
                                <Text style={styles.featureTitle}>Protection complète</Text>
                                <Text style={styles.featureDescription}>
                                    Assurance, vérification des conducteurs et support 24/7
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Avantages économiques */}
                    <View style={styles.economicBenefits}>
                        <Text style={styles.benefitsTitle}>Pourquoi choisir EASY-RENT ?</Text>
                        <View style={styles.benefitsList}>
                            <View style={styles.benefitItem}>
                                <AntDesign name="checkcircle" size={20} color="#4CAF50" />
                                <Text style={styles.benefitText}>Commission la plus basse du marché</Text>
                            </View>
                            <View style={styles.benefitItem}>
                                <AntDesign name="checkcircle" size={20} color="#4CAF50" />
                                <Text style={styles.benefitText}>Paiements sécurisés sous 24h</Text>
                            </View>
                            <View style={styles.benefitItem}>
                                <AntDesign name="checkcircle" size={20} color="#4CAF50" />
                                <Text style={styles.benefitText}>Support technique dédié</Text>
                            </View>
                            <View style={styles.benefitItem}>
                                <AntDesign name="checkcircle" size={20} color="#4CAF50" />
                                <Text style={styles.benefitText}>Outils marketing intégrés</Text>
                            </View>
                        </View>
                    </View>

                    {/* Boutons d'action */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
                            <LinearGradient
                                colors={['#FF8C42', '#FFB366']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <MaterialIcons name="rocket-launch" size={24} color="#FFFFFF" />
                                <Text style={styles.primaryButtonText}>Commencer maintenant</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryButton} onPress={handleViewDemo}>
                            <View style={styles.secondaryButtonContent}>
                                <Feather name="play-circle" size={20} color="#FFFFFF" />
                                <Text style={styles.secondaryButtonText}>Voir la démo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Décoration flottante */}
                <View style={styles.floatingElements}>
                    <View style={[styles.floatingCircle, styles.circle1]} />
                    <View style={[styles.floatingCircle, styles.circle2]} />
                    <View style={[styles.floatingCircle, styles.circle3]} />
                    <View style={[styles.floatingCircle, styles.circle4]} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    logoText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginLeft: 8,
        letterSpacing: 1,
    },
    ownerBadge: {
        backgroundColor: '#FF8C42',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    ownerBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    mainContent: {
        flex: 1,
        paddingBottom: 40,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    mainTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 44,
        marginBottom: 16,
    },
    highlightText: {
        color: '#FF8C42',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.85)',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 50,
    },
    statCard: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        minWidth: 80,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FF8C42',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontWeight: '500',
    },
    featuresContainer: {
        marginBottom: 40,
    },
    featureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    featureItem: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    featureIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    featureDescription: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 16,
    },
    economicBenefits: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 24,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    benefitsTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    benefitsList: {
        gap: 12,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    benefitText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        marginLeft: 12,
        fontWeight: '500',
    },
    actionButtons: {
        gap: 16,
        marginBottom: 40,
    },
    primaryButton: {
        height: 60,
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#FF8C42',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
    },
    buttonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        paddingHorizontal: 32,
        gap: 12,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    secondaryButton: {
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    secondaryButtonContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    secondaryButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    testimonial: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 16,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FF8C42',
    },
    testimonialText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontStyle: 'italic',
        lineHeight: 24,
        marginBottom: 12,
    },
    testimonialAuthor: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '600',
    },
    floatingElements: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
    },
    floatingCircle: {
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    circle1: {
        width: 120,
        height: 120,
        top: 120,
        right: -60,
    },
    circle2: {
        width: 80,
        height: 80,
        top: 400,
        left: -40,
    },
    circle3: {
        width: 100,
        height: 100,
        bottom: 300,
        right: -50,
    },
    circle4: {
        width: 60,
        height: 60,
        bottom: 150,
        left: 30,
    },
});

export default OwnerLandingPage;