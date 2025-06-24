import * as Yup from 'yup';

export const driverValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('Le prénom est obligatoire'),
    last_name: Yup.string().required('Le nom est obligatoire'),
    age: Yup.number()
        .required('L\'âge est obligatoire')
        .min(18, 'Le conducteur doit avoir au moins 18 ans')
        .max(70, 'L\'âge maximum est de 70 ans'),
    license_number: Yup.string().required('Le numéro de permis est obligatoire'),
    license_type: Yup.string().required('Le type de permis est obligatoire'),
    phone: Yup.string()
        .required('Le numéro de téléphone est obligatoire')
        .min(8, 'Numéro de téléphone trop court'),
    email: Yup.string()
        .email('Email invalide')
        .required('L\'email est obligatoire'),
    address: Yup.string().required('L\'adresse est obligatoire'),
    location: Yup.string().required('La localisation est obligatoire'),
    insurance_provider: Yup.string().required('Le fournisseur d\'assurance est obligatoire'),
    insurance_policy: Yup.string().required('La police d\'assurance est obligatoire'),

    // Documents - optionnels pour les tests
    id_card: Yup.mixed().nullable(),
    driver_licence: Yup.mixed().nullable(),
    profile_picture: Yup.mixed().nullable(),
});

export const initialDriverValues = {
    first_name: '',
    last_name: '',
    age: '',
    license_number: '',
    license_type: '',
    address: '',
    phone: '',
    email: '',
    location: '',
    insurance_provider: '',
    insurance_policy: '',
    available: true,
    status: 'Available',

    // Documents
    id_card: null,
    driver_licence: null,
    profile_picture: null,
};

// Données statiques pour les sélecteurs
export const DriverData = {
    licenseTypes: [
        'Permis A', 'Permis B', 'Permis C', 'Permis D', 'Permis E'
    ],
    locations: [
        'Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua', 'Maroua', 'Ngaoundéré'
    ],
    insuranceProviders: [
        'ACTIVA', 'ALLIANZ', 'AXA', 'COLINA', 'NSIA', 'SAHAM'
    ],
    statusOptions: [
        'Active', 'Available', 'Out_of_Service', 'Emergency'
    ]
};

// Fonction pour transformer les données du formulaire
export const transformDriverFormData = (values: any) => {
    console.log("🔄 Transformation des données conducteur:", values);

    return {
        ...values,
        id: Date.now(),
        age: values.age ? parseInt(values.age) : 18,
        rating: 0,
        available: values.available || true,
        status: values.status || 'Available',
        created_at: new Date(),
        status_updated_at: new Date(),
        status_updated_by: 'admin', // À remplacer par l'utilisateur connecté
        isSelected: false,
        documents: {
            id_card: values.id_card,
            driver_licence: values.driver_licence,
        },
        photo: values.profile_picture || '',
        profile_picture: values.profile_picture || '',
    };
};

export const createDriverFormData = (driverData: any) => {
    const formData = new FormData();

    // Données textuelles
    Object.keys(driverData).forEach(key => {
        if (key !== 'documents' && key !== 'profile_picture') {
            // @ts-ignore
            if (driverData[key] !== null && driverData[key] !== undefined) {
                // @ts-ignore
                formData.append(key, driverData[key].toString());
            }
        }
    });

    // Documents
    if (driverData.documents) {
        if (driverData.documents.id_card) {
            // @ts-ignore
            formData.append('id_card', {
                uri: driverData.documents.id_card.uri,
                type: driverData.documents.id_card.mimeType,
                name: driverData.documents.id_card.name,
            });
        }

        if (driverData.documents.driver_licence) {
            // @ts-ignore
            formData.append('driver_licence', {
                uri: driverData.documents.driver_licence.uri,
                type: driverData.documents.driver_licence.mimeType,
                name: driverData.documents.driver_licence.name,
            });
        }
    }

    // Photo de profil
    if (driverData.profile_picture) {
        // @ts-ignore
        formData.append('profile_picture', {
            uri: driverData.profile_picture.uri,
            type: driverData.profile_picture.mimeType || 'image/jpeg',
            name: driverData.profile_picture.fileName || 'profile.jpg',
        });
    }

    return formData;
};
