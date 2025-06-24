
import * as Yup from 'yup';
import { MaterialIcons } from '@expo/vector-icons';

export const personnelValidationSchema = Yup.object().shape({
    nom: Yup.string().required('Le nom est obligatoire'),
    prenom: Yup.string().required('Le prénom est obligatoire'),
    email: Yup.string()
        .email('Email invalide')
        .required('L\'email est obligatoire'),
    telephone: Yup.string()
        .required('Le téléphone est obligatoire')
        .min(8, 'Numéro trop court'),
    poste: Yup.string().required('Le poste est obligatoire'),
    departement: Yup.string().required('Le département est obligatoire'),
    dateEmbauche: Yup.string().required('La date d\'embauche est obligatoire'),
    salaire: Yup.number()
        .required('Le salaire est obligatoire')
        .min(1, 'Le salaire doit être supérieur à 0'),
    statut: Yup.string().required('Le statut est obligatoire'),
    adresse: Yup.string().required('L\'adresse est obligatoire'),

    // Documents optionnels
    cv: Yup.mixed().nullable(),
    contrat: Yup.mixed().nullable(),
    piece_identite: Yup.mixed().nullable(),

    // Photo optionnelle
    photo: Yup.string().nullable(),
});

export const initialPersonnelValues = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    poste: '',
    departement: '',
    dateEmbauche: '',
    salaire: '',
    statut: '',
    adresse: '',

    // Compétences
    gestion_projet: false,
    communication: false,
    leadership: false,
    analyse_donnees: false,
    developpement: false,
    marketing: false,
    ventes: false,
    comptabilite: false,
    ressources_humaines: false,
    service_client: false,
    logistique: false,
    qualite: false,

    // Documents
    cv: null,
    contrat: null,
    piece_identite: null,

    // Photo
    photo: null,
};

// Configuration des icônes de compétences
export const getCompetenceIcon = (competence: string) => {
    const iconMap = {
        gestion_projet: <MaterialIcons name="assignment" size={20} color="#3B82F6" />,
        communication: <MaterialIcons name="chat" size={20} color="#3B82F6" />,
        leadership: <MaterialIcons name="groups" size={20} color="#3B82F6" />,
        analyse_donnees: <MaterialIcons name="analytics" size={20} color="#3B82F6" />,
        developpement: <MaterialIcons name="code" size={20} color="#3B82F6" />,
        marketing: <MaterialIcons name="campaign" size={20} color="#3B82F6" />,
        ventes: <MaterialIcons name="trending-up" size={20} color="#3B82F6" />,
        comptabilite: <MaterialIcons name="calculate" size={20} color="#3B82F6" />,
        ressources_humaines: <MaterialIcons name="people" size={20} color="#3B82F6" />,
        service_client: <MaterialIcons name="support-agent" size={20} color="#3B82F6" />,
        logistique: <MaterialIcons name="local-shipping" size={20} color="#3B82F6" />,
        qualite: <MaterialIcons name="verified" size={20} color="#3B82F6" />
    };
    // @ts-ignore
    return iconMap[competence] || <MaterialIcons name="star" size={20} color="#3B82F6" />;
};

// Configuration des libellés de compétences
export const getCompetenceLabel = (competence: string) => {
    const labelMap = {
        gestion_projet: 'Gestion de projet',
        communication: 'Communication',
        leadership: 'Leadership',
        analyse_donnees: 'Analyse de données',
        developpement: 'Développement',
        marketing: 'Marketing',
        ventes: 'Ventes',
        comptabilite: 'Comptabilité',
        ressources_humaines: 'Ressources humaines',
        service_client: 'Service client',
        logistique: 'Logistique',
        qualite: 'Qualité'
    };
    // @ts-ignore
    return labelMap[competence] || competence;
};

export const competenceKeys = [
    'gestion_projet', 'communication', 'leadership', 'analyse_donnees',
    'developpement', 'marketing', 'ventes', 'comptabilite',
    'ressources_humaines', 'service_client', 'logistique', 'qualite'
];

// Données de référence
export const PersonnelData = {
    departements: [
        'Ressources Humaines',
        'Informatique',
        'Marketing',
        'Ventes',
        'Comptabilité',
        'Logistique',
        'Production',
        'Qualité'
    ],
    postes: [
        'Directeur',
        'Manager',
        'Chef d\'équipe',
        'Employé',
        'Assistant',
        'Stagiaire',
        'Consultant',
        'Technicien'
    ],
    statuts: [
        'Actif',
        'Inactif',
        'En congé',
        'En formation',
        'Démissionnaire'
    ]
};

// Fonction pour transformer les données du formulaire
export const transformPersonnelFormData = (values: any) => {
    console.log("🔄 Transformation des données personnel:", values);

    return {
        ...values,
        id: Date.now(),
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        telephone: values.telephone,
        poste: values.poste,
        departement: values.departement,
        dateEmbauche: values.dateEmbauche,
        salaire: values.salaire ? parseFloat(values.salaire) : 0,
        statut: values.statut,
        adresse: values.adresse,

        competences: competenceKeys.filter(key => values[key]),

        // Calendrier de service par défaut (peut être modifié plus tard)
        calendrierService: {
            lundi: true,
            mardi: true,
            mercredi: true,
            jeudi: true,
            vendredi: true,
            samedi: false,
            dimanche: false
        },

        // Données par défaut
        activites: [],
        statistiques: {
            formations: 0,
            projetsEnCours: 0,
            tauxPresence: 100,
            performance: 0
        },

        photo: values.photo || '',

        documents: {
            cv: values.cv,
            contrat: values.contrat,
            piece_identite: values.piece_identite,
        }
    };
};

export const createPersonnelFormData = (personnelData: any) => {
    const formData = new FormData();

    // Données textuelles
    Object.keys(personnelData).forEach(key => {
        if (key !== 'photo' && key !== 'documents' && key !== 'competences' &&
            key !== 'calendrierService' && key !== 'activites' && key !== 'statistiques') {
            // @ts-ignore
            if (personnelData[key] !== null && personnelData[key] !== undefined) {
                // @ts-ignore
                formData.append(key, personnelData[key].toString());
            }
        }
    });

    // Objets complexes en JSON
    if (personnelData.competences) {
        formData.append('competences', JSON.stringify(personnelData.competences));
    }

    if (personnelData.calendrierService) {
        formData.append('calendrierService', JSON.stringify(personnelData.calendrierService));
    }

    if (personnelData.statistiques) {
        formData.append('statistiques', JSON.stringify(personnelData.statistiques));
    }

    // Documents
    if (personnelData.documents) {
        if (personnelData.documents.cv) {
            // @ts-ignore
            formData.append('cv', {
                uri: personnelData.documents.cv.uri,
                type: personnelData.documents.cv.mimeType,
                name: personnelData.documents.cv.name,
            });
        }

        if (personnelData.documents.contrat) {
            // @ts-ignore
            formData.append('contrat', {
                uri: personnelData.documents.contrat.uri,
                type: personnelData.documents.contrat.mimeType,
                name: personnelData.documents.contrat.name,
            });
        }

        if (personnelData.documents.piece_identite) {
            // @ts-ignore
            formData.append('piece_identite', {
                uri: personnelData.documents.piece_identite.uri,
                type: personnelData.documents.piece_identite.mimeType,
                name: personnelData.documents.piece_identite.name,
            });
        }
    }

    // Photo
    if (personnelData.photo) {
        // @ts-ignore
        formData.append('photo', {
            uri: personnelData.photo,
            type: 'image/jpeg',
            name: 'photo_personnel.jpg',
        });
    }

    return formData;
};