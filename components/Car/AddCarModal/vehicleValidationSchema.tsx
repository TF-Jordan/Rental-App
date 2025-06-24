import * as Yup from 'yup';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// ✅ Corrections des erreurs de syntaxe
export const vehicleValidationSchema = Yup.object().shape({
    brand: Yup.string().required('La marque est obligatoire'),
    model: Yup.string().required('Le modèle est obligatoire'),
    year: Yup.number()
        .required('L\'année est obligatoire')
        .min(2000, 'L\'année doit être supérieure à 2000')
        .max(new Date().getFullYear(), 'L\'année ne peut pas être future'), // ✅ Correction: new Date()
    type: Yup.string().required('Le type de véhicule est obligatoire'),
    pricePerDay: Yup.number()
        .required('Le prix par jour est obligatoire')
        .min(1, 'Le prix doit être supérieur à 0'),
    passenger: Yup.number()
        .required('Le nombre de passagers est obligatoire')
        .min(1, 'Au moins 1 passager')
        .max(50, 'Maximum 50 passagers'),
    license_plate: Yup.string()
        .required('La plaque d\'immatriculation est obligatoire')
        .min(3, 'Plaque trop courte'),
    description: Yup.string().required('La description est obligatoire'),
    color: Yup.string().required('La couleur est obligatoire'),
    transmission: Yup.string().required('Le type de transmission est obligatoire'),
    vin: Yup.string()
        .min(17, 'Le VIN doit contenir 17 caractères')
        .max(17, 'Le VIN doit contenir 17 caractères'),
    // Documents - rendus optionnels pour les tests
    registration_certificate: Yup.mixed().nullable(),
    technical_inspection: Yup.mixed().nullable(),
    insurance: Yup.mixed().nullable(),
    tax_sticker: Yup.array().of(Yup.string()).nullable(),
    // Images - rendues optionnelles pour les tests
    images: Yup.array().of(Yup.object())
        .min(0, "Aucune image requise pour les tests")
        .max(5, "Maximum 5 images sont autorisées"),
});

// ✅ Correction: export const au lieu de export const initialValues
export const initialValues = {
    brand: '',
    model: '',
    year: '',
    type: '',
    pricePerDay: '',
    passenger: '',
    license_plate: '',
    description: '',
    color: '',
    transmission: '',
    vin: '',
    rating: 0,
    available: true,
    // Fonctionnalités
    air_condition: false,
    usb_input: false,
    seat_belt: true,
    audio_input: false,
    child_seat: false,
    bluetooth: false,
    sleeping_bed: false,
    onboard_computer: false,
    gps: false,
    luggage: false,
    water: false,
    additional_covers: false,
    // Moteur
    engine_type: '',
    horsepower: '',
    capacity: '',
    // Efficacité carburant
    fuel_city: '',
    fuel_highway: '',
    // Les documents
    registration_certificate: null,
    technical_inspection: null,
    insurance: null,
    tax_sticker: null,
    // Les photos du véhicule
    images: [],
};

// Configuration des icônes de fonctionnalités
export const getFeatureIcon = (feature: string) => {
    const iconMap = {
        air_condition: <Ionicons name="snow" size={20} color="#3B82F6" />,
        usb_input: <MaterialIcons name="usb" size={20} color="#3B82F6" />,
        seat_belt: <MaterialIcons name="airline-seat-legroom-normal" size={20} color="#3B82F6" />,
        audio_input: <Ionicons name="musical-notes" size={20} color="#3B82F6" />,
        child_seat: <MaterialIcons name="child-care" size={20} color="#3B82F6" />,
        bluetooth: <MaterialIcons name="bluetooth" size={20} color="#3B82F6" />,
        sleeping_bed: <MaterialIcons name="hotel" size={20} color="#3B82F6" />,
        onboard_computer: <MaterialIcons name="computer" size={20} color="#3B82F6" />,
        gps: <MaterialIcons name="gps-fixed" size={20} color="#3B82F6" />,
        luggage: <MaterialIcons name="luggage" size={20} color="#3B82F6" />,
        water: <Ionicons name="water" size={20} color="#3B82F6" />,
        additional_covers: <MaterialIcons name="security" size={20} color="#3B82F6" />
    };
    // @ts-ignore
    return iconMap[feature] || <MaterialIcons name="star" size={20} color="#3B82F6" />;
};

// Configuration des libellés de fonctionnalités
export const getFeatureLabel = (feature: string) => {
    const labelMap = {
        air_condition: 'Climatisation',
        usb_input: 'Entrée USB',
        seat_belt: 'Ceintures de sécurité',
        audio_input: 'Entrée audio',
        child_seat: 'Siège enfant',
        bluetooth: 'Bluetooth',
        sleeping_bed: 'Lit de couchage',
        onboard_computer: 'Ordinateur de bord',
        gps: 'GPS',
        luggage: 'Espace bagages',
        water: 'Réservoir d\'eau',
        additional_covers: 'Couvertures supplémentaires'
    };
    // @ts-ignore
    return labelMap[feature] || feature;
};

// ✅ Correction: export const au lieu de export const featureKeys
export const featureKeys = [
    'air_condition', 'usb_input', 'seat_belt', 'audio_input', 'child_seat',
    'bluetooth', 'sleeping_bed', 'onboard_computer', 'gps', 'luggage',
    'water', 'additional_covers'
];

// Fonction pour transformer les données du formulaire
export const transformFormData = (values:any) => {
    console.log("🔄 Transformation des données:", values);
    return {
        ...values,
        id: Date.now(),
        type: values.type,
        brand: values.brand,
        model: values.model,
        year: values.year ? parseInt(values.year) : new Date().getFullYear(), // ✅ Correction: new Date()
        rating: values.rating,
        passenger: values.passenger ? parseInt(values.passenger) : 4,
        description: values.description,
        pricePerDay: values.pricePerDay ? parseFloat(values.pricePerDay) : 0,
        vin: values.vin,
        capacity: values.capacity ? parseFloat(values.capacity) : undefined,
        fonctionnalities: {
            air_condition: values.air_condition,
            usb_input: values.usb_input,
            seat_belt: values.seat_belt,
            audio_input: values.audio_input,
            child_seat: values.child_seat,
            bluetooth: values.bluetooth,
            sleeping_bed: values.sleeping_bed,
            onboard_computer: values.onboard_computer,
            gps: values.gps,
            luggage: values.luggage,
            water: values.water,
            additional_covers: values.additional_covers,
        },
        engine: {
            type: values.engine_type,
            horsepower: values.horsepower ? parseInt(values.horsepower) : undefined,
            capacity: values.capacity ? parseFloat(values.capacity) : undefined,
        },
        transmission: values.transmission,
        color:values.color,
        fuel_efficiency: {
            city: values.fuel_city,
            highway: values.fuel_highway,
        },
        license_plate: values.license_plate,
        images: values.images || [],
        documents: {
            registration_certificate: values.registration_certificate,
            technical_inspection: values.technical_inspection,
            insurance: values.insurance,
            tax_sticker: values.tax_sticker,
        },
        reviews: [],
        service_history: [],
    };
};

export const createVehicleFormData = (vehicleData:any) => {
    const formData = new FormData();

    // Données textuelles
    Object.keys(vehicleData).forEach(key => {
        if (key !== 'images' && key !== 'documents' && key !== 'fonctionnalities' &&
            key !== 'engine' && key !== 'fuel_efficiency') {
            // @ts-ignore
            if (vehicleData[key] !== null && vehicleData[key] !== undefined) {
                // @ts-ignore
                formData.append(key, vehicleData[key].toString());
            }
        }
    });

    // Objets complexes en JSON
    if (vehicleData.fonctionnalities) {
        formData.append('fonctionnalities', JSON.stringify(vehicleData.fonctionnalities));
    }
    if (vehicleData.engine) {
        formData.append('engine', JSON.stringify(vehicleData.engine));
    }
    if (vehicleData.fuel_efficiency) {
        formData.append('fuel_efficiency', JSON.stringify(vehicleData.fuel_efficiency));
    }

    // Documents
    if (vehicleData.documents) {
        if (vehicleData.documents.registration_certificate) {
            // @ts-ignore
            formData.append('registration_certificate', {
                uri: vehicleData.documents.registration_certificate.uri,
                type: vehicleData.documents.registration_certificate.mimeType,
                name: vehicleData.documents.registration_certificate.name,
            });
        }
        if (vehicleData.documents.technical_inspection) {
            // @ts-ignore
            formData.append('technical_inspection', {
                uri: vehicleData.documents.technical_inspection.uri,
                type: vehicleData.documents.technical_inspection.mimeType,
                name: vehicleData.documents.technical_inspection.name,
            });
        }
        if (vehicleData.documents.insurance) {
            // @ts-ignore
            formData.append('insurance', {
                uri: vehicleData.documents.insurance.uri,
                type: vehicleData.documents.insurance.mimeType,
                name: vehicleData.documents.insurance.name,
            });
        }
        if (vehicleData.documents.tax_sticker) {
            // @ts-ignore
            formData.append('tax_sticker', {
                uri: vehicleData.documents.tax_sticker.uri,
                type: vehicleData.documents.tax_sticker.mimeType,
                name: vehicleData.documents.tax_sticker.name,
            });
        }
    }

    // Images
    if (vehicleData.images && vehicleData.images.length > 0) {
        vehicleData.images.forEach((image: { uri: any; mimeType: any; fileName: any; }, index: any) => {
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