import * as Yup from 'yup';

export const authValidationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Le prénom doit contenir au moins 2 caractères')
        .required('Le prénom est requis'),
    lastName: Yup.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .required('Le nom est requis'),
    email: Yup.string()
        .email('Email invalide')
        .required('L\'email est requis'),
    phone: Yup.string()
        .matches(/^[0-9+\-\s()]+$/, 'Numéro de téléphone invalide')
        .min(8, 'Le numéro doit contenir au moins 8 chiffres')
        .required('Le téléphone est requis'),
    password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre')
        .required('Le mot de passe est requis'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
        .required('La confirmation du mot de passe est requise'),
});

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email invalide')
        .required('L\'email est requis'),
    password: Yup.string()
        .required('Le mot de passe est requis'),
});
