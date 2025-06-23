import * as Yup from 'yup';

export const agencyValidationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est obligatoire'),
    description: Yup.string().required('La description est obligatoire'),
    slogan: Yup.string().required('Le slogan est obligatoire'),
    city: Yup.string().required('La ville est obligatoire'),
    quater: Yup.string().required('Le quartier est obligatoire'),
    openingTime: Yup.string().required('L\'heure d\'ouverture est obligatoire'),
    closingTime: Yup.string().required('L\'heure de fermeture est obligatoire'),
    type: Yup.string().required('Le type d\'agence est obligatoire'),
});

export const initialAgencyValues = {
    name: '',
    description: '',
    slogan: '',
    city: '',
    quater: '',
    openingTime: '',
    closingTime: '',
    type: '',
    images: [],
};

export const agencyTypes = [
    'Location de véhicules',
    'Concessionnaire',
    'Garage',
    'Transport',
    'Autre'
];

export const transformAgencyFormData = (values: any) => {
    return {
        ...values,
        id: Date.now(),
        followers: 0,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        reviews: [],
    };
};

export const createAgencyFormData = (agencyData: any) => {
    const formData = new FormData();

    Object.keys(agencyData).forEach(key => {
        if (key !== 'images' && key !== 'reviews') {
            if (agencyData[key] !== null && agencyData[key] !== undefined) {
                formData.append(key, agencyData[key].toString());
            }
        }
    });

    if (agencyData.images && agencyData.images.length > 0) {
        agencyData.images.forEach((image: any, index: number) => {
            // @ts-ignore
            formData.append(`images`, {
                uri: image.uri,
                type: image.mimeType || 'image/jpeg',
                name: image.fileName || `image_${index}.jpg`,
            });
        });
    }

    return formData;
};
