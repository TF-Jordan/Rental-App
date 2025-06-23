import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const { width } = Dimensions.get('window');

type Props = {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ReactNode;
}

export default function StatCard({ title, value, subtitle, icon }: Props) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animationSequence = Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
        ]);

        animationSequence.start();

        // Animation continue pour l'icône
        const iconRotation = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 8000,
                useNativeDriver: true,
            })
        );
        iconRotation.start();

        return () => {
            animationSequence.stop();
            iconRotation.stop();
        };
    }, []);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style={[
                styles.cardWrapper,
                {
                    opacity: fadeAnim,
                    transform: [
                        { scale: scaleAnim },
                        { translateY: slideAnim }
                    ],
                },
            ]}
        >
            {/* Background gradient principal */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.98)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            />

            {/* Contenu principal */}
            <View style={styles.card}>
                {/* Header simplifié */}
                <Text style={styles.title}>{title}</Text>

                <View style={styles.contentContainer}>
                    <View style={styles.mainContent}>
                        <Animated.Text
                            style={[
                                styles.value,
                                {
                                    transform: [{ translateX: slideAnim }],
                                }
                            ]}
                        >
                            {value}
                        </Animated.Text>

                        <View style={styles.subtitleContainer}>
                            <View style={styles.indicator} />
                            <Text style={styles.subtitle}>{subtitle}</Text>
                        </View>
                    </View>

                    <View style={styles.iconContainer}>
                        {/* Cercle d'animation simplifié */}
                        <Animated.View
                            style={[
                                styles.iconRing,
                                { transform: [{ rotate: rotateInterpolate }] }
                            ]}
                        />

                        <View style={styles.iconBackground}>
                            {icon}
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardWrapper: {
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 18,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        backgroundColor: '#fff',
    },
    gradientBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    card: {
        padding: 20,
        paddingBottom: 24,
        position: 'relative',
        zIndex: 1,
    },
    title: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainContent: {
        flex: 1,
    },
    value: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1E293B',
        lineHeight: 38,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
        marginRight: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#059669',
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: 56,
        height: 56,
        marginLeft: 16,
    },
    iconRing: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: 'rgba(100, 116, 139, 0.15)',
        borderStyle: 'dashed',
    },
    iconBackground: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    bottomBorder: {
        height: 3,
        width: '100%',
    },
});