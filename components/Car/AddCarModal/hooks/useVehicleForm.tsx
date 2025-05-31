import { useState } from 'react';
import { Alert } from 'react-native';
import { transformFormData } from '../vehicleValidationSchema';


/**
 * useVehicleForm
 *
 * Hook personnalisé pour gérer l’état et la soumission du formulaire d’ajout de véhicule.
 * Ce hook centralise la logique de manipulation des données du formulaire,
 * l’expansion des sections du formulaire, et la gestion de la soumission.
 *
 * ⚠️ C’est ici que **doit être effectué l’appel API** pour envoyer les données du véhicule
 * vers le backend ou la base de données. L’appel actuel (onAddVehicle) est une abstraction,
 * mais en production, il faut remplacer cette logique par une requête API réelle (ex : fetch/axios).
 *
 * @param {Function} onAddVehicle - Fonction de rappel appelée après validation pour ajouter le véhicule (ex: mise à jour d’un état local ou envoi au serveur).
 * @param {Function} setModalVisible - Fonction pour fermer la modale après soumission.
 *
 * États internes :
 * - selectedBrand (string) : Marque actuellement sélectionnée dans le formulaire.
 * - expandedSections (object) : Gère les sections dépliées (ex: basic, engine, features).
 *
 * Fonctions retournées :
 * - toggleSection(section) : Ouvre/ferme dynamiquement une section du formulaire.
 * - handleSubmit(values) : Transforme les données du formulaire, affiche une alerte de succès,
 *   appelle `onAddVehicle`, puis ferme la modale.
 *
 * Exemple d’intégration d’un appel API dans handleSubmit :
 * ```ts
 * const handleSubmit = async (values) => {
 *   const vehicleData = transformFormData(values);
 *   try {
 *     const response = await axios.post('/api/vehicles', vehicleData);
 *     if (response.status === 201) {
 *       Alert.alert("Succès", "Véhicule ajouté avec succès !");
 *       onAddVehicle(response.data);
 *       setModalVisible(false);
 *     }
 *   } catch (error) {
 *     Alert.alert("Erreur", "Échec de l'ajout du véhicule.");
 *   }
 * };
 * ```
 *
 * @returns {{
 *   selectedBrand: string,
 *   setSelectedBrand: Function,
 *   expandedSections: object,
 *   toggleSection: Function,
 *   handleSubmit: Function
 * }}
 */



export default function useVehicleForm (onAddVehicle: (arg0: { id: number; year: number; pricePerDay: number; passenger: number; horsepower: number | undefined; capacity: number | undefined; fonctionnalities: { air_condition: any; usb_input: any; seat_belt: any; audio_input: any; child_seat: any; bluetooth: any; sleeping_bed: any; onboard_computer: any; gps: any; luggage: any; water: any; additional_covers: any; }; engine: { type: any; horsepower: number | undefined; capacity: number | undefined; }; fuel_efficiency: { city: any; highway: any; }; images: never[]; reviews: never[]; service_history: never[]; air_condition: any; usb_input: any; seat_belt: any; audio_input: any; child_seat: any; bluetooth: any; sleeping_bed: any; onboard_computer: any; gps: any; luggage: any; water: any; additional_covers: any; engine_type: any; fuel_city: any; fuel_highway: any; }) => void, setModalVisible: (arg0: boolean) => void){
    const [selectedBrand, setSelectedBrand] = useState('');
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        engine: false,
        features: false,
    });

    const toggleSection = (section: string | number) => {
        // @ts-ignore
        setExpandedSections(prev => ({
            ...prev,
            // @ts-ignore
            [section]: !prev[section]
        }));
    };

    const handleSubmit = (values: { year: string; pricePerDay: string; passenger: string; horsepower: string; capacity: string; air_condition: any; usb_input: any; seat_belt: any; audio_input: any; child_seat: any; bluetooth: any; sleeping_bed: any; onboard_computer: any; gps: any; luggage: any; water: any; additional_covers: any; engine_type: any; fuel_city: any; fuel_highway: any; }) => {
        const vehicleData = transformFormData(values); //contient les valeurs du formulaires (concernant le nouveau vehicule a ajouter)
        console.log(vehicleData);

        Alert.alert(
            "Succès",
            "Le véhicule a été ajouté avec succès !",
            [
                {
                    text: "OK",
                    onPress: () => {
                        if (onAddVehicle) onAddVehicle(vehicleData);
                        setModalVisible(false);
                    }
                }
            ]
        );
    };

    return {
        selectedBrand,
        setSelectedBrand,
        expandedSections,
        toggleSection,
        handleSubmit
    };
};
