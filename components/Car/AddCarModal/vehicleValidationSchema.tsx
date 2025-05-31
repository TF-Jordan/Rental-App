import * as Yup from 'yup';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


/**
 * === Configuration de formulaire pour l'ajout de véhicule ===
 *
 * Ce fichier contient :
 * - Le schéma de validation `Yup` pour les champs du formulaire de véhicule.
 * - Les valeurs initiales utilisées par le formulaire.
 * - Une fonction pour transformer les données du formulaire en un format exploitable.
 * - Les configurations des icônes et des libellés pour les fonctionnalités du véhicule.
 *
 * === 1. Schéma de validation : `vehicleValidationSchema` ===
 * Utilise `Yup` pour valider les champs suivants :
 * - brand, model, type, transmission, color, description : chaînes requises
 * - year : nombre ≥ 2000 et ≤ année actuelle
 * - pricePerDay : nombre ≥ 1
 * - passenger : nombre entre 1 et 50
 * - license_plate : chaîne requise, au moins 3 caractères
 * - vin : chaîne de 17 caractères
 *
 * === 2. Valeurs initiales : `initialValues` ===
 * Décrit l'état initial du formulaire. Comprend :
 * - Les champs de base du véhicule
 * - Des booléens pour les fonctionnalités (air_condition, bluetooth, etc.)
 * - Des champs moteur : engine_type, horsepower, capacity
 * - Efficacité carburant : fuel_city, fuel_highway
 * - Champs supplémentaires comme `rating`, `available`
 *
 * === 3. Icônes de fonctionnalités : `getFeatureIcon(feature)` ===
 * Retourne une icône React Native Vector Icon (Ionicons ou MaterialIcons)
 * associée à une fonctionnalité. Ex :
 * - 'air_condition' → flocon de neige
 * - 'bluetooth' → logo Bluetooth
 *
 * @param feature (string) : Nom de la fonctionnalité
 * @returns JSX.Element (icône)
 *
 * === 4. Libellés de fonctionnalités : `getFeatureLabel(feature)` ===
 * Retourne le nom affichable en français de chaque fonctionnalité.
 * Utilisé pour l'affichage des options de confort sur une carte véhicule.
 *
 * @param feature (string) : Nom de la fonctionnalité
 * @returns string (libellé en français)
 *
 * === 5. Liste des fonctionnalités disponibles : `featureKeys` ===
 * Liste brute des clés booléennes représentant les options de confort.
 *
 * === 6. Transformation des données : `transformFormData(values)` ===
 * Formate les données issues du formulaire (souvent sous forme de strings)
 * en un objet structuré avec :
 * - ID généré automatiquement
 * - Conversion des strings en nombres (année, prix, passagers, puissance...)
 * - Groupement des options dans `fonctionnalities`, moteur dans `engine`,
 *   consommation dans `fuel_efficiency`.
 * - Ajoute des champs vides pour `images`, `reviews`, `service_history`.
 *
 * @param values (object) : Données brutes du formulaire
 * @returns object : Données formatées pour enregistrement ou affichage
 */




// Schéma de validation
export const vehicleValidationSchema = Yup.object().shape({
    brand: Yup.string().required('La marque est obligatoire'),
    model: Yup.string().required('Le modèle est obligatoire'),
    year: Yup.number()
        .required('L\'année est obligatoire')
        .min(2000, 'L\'année doit être supérieure à 2000')
        .max(new Date().getFullYear(), 'L\'année ne peut pas être future'),
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
});

// Valeurs initiales du formulaire
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
};

// Configuration des icônes de fonctionnalités
export const getFeatureIcon = (feature: string | number) => {
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
export const getFeatureLabel = (feature: string | number) => {
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

// Liste des fonctionnalités
export const featureKeys = [
    'air_condition', 'usb_input', 'seat_belt', 'audio_input', 'child_seat',
    'bluetooth', 'sleeping_bed', 'onboard_computer', 'gps', 'luggage',
    'water', 'additional_covers'
];

// Fonction pour transformer les données du formulaire
export const transformFormData = (values: { year: string; pricePerDay: string; passenger: string; horsepower: string; capacity: string; air_condition: any; usb_input: any; seat_belt: any; audio_input: any; child_seat: any; bluetooth: any; sleeping_bed: any; onboard_computer: any; gps: any; luggage: any; water: any; additional_covers: any; engine_type: any; fuel_city: any; fuel_highway: any; }) => {
    return {
        ...values,
        id: Date.now(),
        year: parseInt(values.year),
        pricePerDay: parseFloat(values.pricePerDay),
        passenger: parseInt(values.passenger),
        horsepower: values.horsepower ? parseInt(values.horsepower) : undefined,
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
        fuel_efficiency: {
            city: values.fuel_city,
            highway: values.fuel_highway,
        },
        images: [],
        reviews: [],
        service_history: [],
    };
};