import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuthForm } from './Auth/hooks/useAuthForm';
import { CustomTextInput } from './Auth/CustomTextInput';
import { COLORS, SPACING, TYPOGRAPHY } from './Auth/constants/theme';

const { width, height } = Dimensions.get('window');

export const AuthScreen: React.FC = () => {
    const {
        isLogin,
        setIsLogin,
        formik,
        isLoading,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleGoogleLogin,
        handleFacebookLogin,
        handleForgotPassword,
    } = useAuthForm();


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header avec gradient */}
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.header}
                    >
                        <View style={styles.logoContainer}>
                            <View style={styles.logoIcon}>
                                <Ionicons name="car-sport" size={32} color={COLORS.white} />
                            </View>
                            <Text style={styles.logoText}>EASY-RENT</Text>
                            <Text style={styles.logoSubtext}>Luxe & Simplicité</Text>
                        </View>
                    </LinearGradient>

                    {/* Formulaire */}
                    <View style={styles.formContainer}>
                        {/* Toggle Connexion/Inscription */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    isLogin && styles.toggleButtonActive,
                                ]}
                                onPress={() => setIsLogin(true)}
                            >
                                <Text
                                    style={[
                                        styles.toggleText,
                                        isLogin && styles.toggleTextActive,
                                    ]}
                                >
                                    Connexion
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    !isLogin && styles.toggleButtonActive,
                                ]}
                                onPress={() => setIsLogin(false)}
                            >
                                <Text
                                    style={[
                                        styles.toggleText,
                                        !isLogin && styles.toggleTextActive,
                                    ]}
                                >
                                    Inscription
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Titre */}
                        <Text style={styles.title}>
                            {isLogin ? 'Bon retour !' : 'Rejoignez-nous'}
                        </Text>
                        <Text style={styles.subtitle}>
                            {isLogin
                                ? 'Connectez-vous pour accéder à votre compte'
                                : 'Créez votre compte pour commencer'}
                        </Text>

                        {/* Champs du formulaire */}
                        {!isLogin && (
                            <>
                                <CustomTextInput
                                    label="Prénom"
                                    placeholder="Entrez votre prénom"
                                    value={formik.values.firstName}
                                    onChangeText={formik.handleChange('firstName')}
                                    onBlur={formik.handleBlur('firstName')}
                                    error={formik.touched.firstName ? formik.errors.firstName : undefined}
                                    leftIcon="person-outline"
                                />
                                <CustomTextInput
                                    label="Nom"
                                    placeholder="Entrez votre nom"
                                    value={formik.values.lastName}
                                    onChangeText={formik.handleChange('lastName')}
                                    onBlur={formik.handleBlur('lastName')}
                                    error={formik.touched.lastName ? formik.errors.lastName : undefined}
                                    leftIcon="person-outline"
                                />
                                <CustomTextInput
                                    label="Téléphone"
                                    placeholder="Entrez votre numéro"
                                    value={formik.values.phone}
                                    onChangeText={formik.handleChange('phone')}
                                    onBlur={formik.handleBlur('phone')}
                                    error={formik.touched.phone ? formik.errors.phone : undefined}
                                    leftIcon="call-outline"
                                    keyboardType="phone-pad"
                                />
                            </>
                        )}

                        <CustomTextInput
                            label="Email"
                            placeholder="Entrez votre email"
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            error={formik.touched.email ? formik.errors.email : undefined}
                            leftIcon="mail-outline"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <CustomTextInput
                            label="Mot de passe"
                            placeholder="Entrez votre mot de passe"
                            value={formik.values.password}
                            onChangeText={formik.handleChange('password')}
                            onBlur={formik.handleBlur('password')}
                            error={formik.touched.password ? formik.errors.password : undefined}
                            leftIcon="lock-closed-outline"
                            secureTextEntry={!showPassword}
                            rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            onRightIconPress={() => setShowPassword(!showPassword)}
                        />

                        {!isLogin && (
                            <CustomTextInput
                                label="Confirmer le mot de passe"
                                placeholder="Confirmez votre mot de passe"
                                value={formik.values.confirmPassword}
                                onChangeText={formik.handleChange('confirmPassword')}
                                onBlur={formik.handleBlur('confirmPassword')}
                                error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
                                leftIcon="lock-closed-outline"
                                secureTextEntry={!showConfirmPassword}
                                rightIcon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        )}

                        {/* Mot de passe oublié */}
                        {isLogin && (
                            <TouchableOpacity
                                style={styles.forgotPasswordContainer}
                                onPress={handleForgotPassword}
                            >
                                <Text style={styles.forgotPasswordText}>
                                    Mot de passe oublié ?
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Bouton principal */}
                        <TouchableOpacity
                            style={[
                                styles.primaryButton,
                                (!formik.isValid || isLoading) && styles.primaryButtonDisabled,
                            ]}
                            // @ts-ignore
                            onPress={formik.handleSubmit}
                            disabled={!formik.isValid || isLoading}
                        >
                            <LinearGradient
                                colors={
                                    !formik.isValid || isLoading
                                        ? [COLORS.gray, COLORS.gray]
                                        : [COLORS.primary, COLORS.secondary]
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.primaryButtonGradient}
                            >
                                {isLoading ? (
                                    <Text style={styles.primaryButtonText}>Chargement...</Text>
                                ) : (
                                    <Text style={styles.primaryButtonText}>
                                        {isLogin ? 'Se connecter' : "S'inscrire"}
                                    </Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>ou</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Boutons sociaux */}
                        <View style={styles.socialButtonsContainer}>
                            <TouchableOpacity
                                style={styles.socialButton}
                                onPress={handleGoogleLogin}
                            >
                                <Ionicons name="logo-google" size={20} color={COLORS.error} />
                                <Text style={styles.socialButtonText}>Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.socialButton}
                                onPress={handleFacebookLogin}
                            >
                                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                                <Text style={styles.socialButtonText}>Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer */}
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>
                                {isLogin ? "Vous n'avez pas de compte ? " : 'Vous avez déjà un compte ? '}
                            </Text>
                            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                                <Text style={styles.footerLink}>
                                    {isLogin ? "S'inscrire" : 'Se connecter'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    header: {
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    logoText: {
        ...TYPOGRAPHY.h1,
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: SPACING.xs,
    },
    logoSubtext: {
        ...TYPOGRAPHY.body,
        color: COLORS.white,
        opacity: 0.9,
        fontStyle: 'italic',
    },
    formContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xl,
        marginTop: -20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray,
        borderRadius: 25,
        padding: 4,
        marginBottom: SPACING.xl,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        borderRadius: 20,
    },
    toggleButtonActive: {
        backgroundColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    toggleText: {
        ...TYPOGRAPHY.body,
        color: COLORS.gray,
        fontWeight: '500',
    },
    toggleTextActive: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    title: {
        ...TYPOGRAPHY.h2,
        color: COLORS.dark,
        fontWeight: 'bold',
        marginBottom: SPACING.sm,
    },
    subtitle: {
        ...TYPOGRAPHY.body,
        color: COLORS.gray,
        marginBottom: SPACING.xl,
        lineHeight: 22,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.lg,
    },
    forgotPasswordText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.primary,
        fontWeight: '500',
    },
    primaryButton: {
        marginBottom: SPACING.lg,
        borderRadius: 25,
        overflow: 'hidden',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    primaryButtonDisabled: {
        shadowOpacity: 0,
        elevation: 0,
    },
    primaryButtonGradient: {
        paddingVertical: SPACING.lg,
        alignItems: 'center',
    },
    primaryButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.white,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.lg,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.lightGray,
    },
    dividerText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.gray,
        marginHorizontal: SPACING.md,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.md,
        marginHorizontal: SPACING.sm,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    socialButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.dark,
        marginLeft: SPACING.sm,
        fontWeight: '500',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: SPACING.xl,
    },
    footerText: {
        ...TYPOGRAPHY.body,
        color: COLORS.gray,
    },
    footerLink: {
        ...TYPOGRAPHY.body,
        color: COLORS.primary,
        fontWeight: '600',
    },
});

export  default  AuthScreen;