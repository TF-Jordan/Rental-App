import { useState } from 'react';
import { useFormik } from 'formik';
import { Alert } from 'react-native';
import { authValidationSchema, loginValidationSchema } from '../schemas/authSchema';
import { AuthFormValues, initialAuthValues } from '../types/authTypes';
// TODO: Importer vos services API
// import { authService } from '../services/authService';

export const useAuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik<AuthFormValues>({
        initialValues: initialAuthValues,
        validationSchema: isLogin ? loginValidationSchema : authValidationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                if (isLogin) {
                    // TODO: Appel API pour la connexion
                    // const response = await authService.login({
                    //   email: values.email,
                    //   password: values.password,
                    // });
                    // Stocker le token, rediriger, etc.
                    console.log('Connexion:', { email: values.email, password: values.password });
                    Alert.alert('Succès', 'Connexion réussie !');
                } else {
                    // TODO: Appel API pour l'inscription
                    // const response = await authService.register({
                    //   firstName: values.firstName,
                    //   lastName: values.lastName,
                    //   email: values.email,
                    //   phone: values.phone,
                    //   password: values.password,
                    // });
                    console.log('Inscription:', values);
                    Alert.alert('Succès', 'Inscription réussie !');
                }
            } catch (error) {
                console.error('Erreur:', error);
                Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
            } finally {
                setIsLoading(false);
            }
        },
    });

    // Réinitialiser le formulaire quand on change de mode
    const handleSetIsLogin = (value: boolean) => {
        setIsLogin(value);
        formik.resetForm();
    };

    const handleGoogleLogin = async () => {
        try {
            // TODO: Appel API pour connexion Google
            // const response = await authService.googleLogin();
            console.log('Connexion Google');
            Alert.alert('Info', 'Connexion avec Google (à implémenter)');
        } catch (error) {
            console.error('Erreur Google:', error);
            Alert.alert('Erreur', 'Erreur lors de la connexion avec Google');
        }
    };

    const handleFacebookLogin = async () => {
        try {
            // TODO: Appel API pour connexion Facebook
            // const response = await authService.facebookLogin();
            console.log('Connexion Facebook');
            Alert.alert('Info', 'Connexion avec Facebook (à implémenter)');
        } catch (error) {
            console.error('Erreur Facebook:', error);
            Alert.alert('Erreur', 'Erreur lors de la connexion avec Facebook');
        }
    };

    const handleForgotPassword = async () => {
        try {
            // TODO: Appel API pour mot de passe oublié
            // const response = await authService.forgotPassword(formik.values.email);
            console.log('Mot de passe oublié pour:', formik.values.email);
            Alert.alert('Info', 'Email de récupération envoyé (à implémenter)');
        } catch (error) {
            console.error('Erreur mot de passe oublié:', error);
            Alert.alert('Erreur', 'Erreur lors de l\'envoi de l\'email');
        }
    };

    return {
        isLogin,
        setIsLogin: handleSetIsLogin,
        formik,
        isLoading,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleGoogleLogin,
        handleFacebookLogin,
        handleForgotPassword,
    };
};
