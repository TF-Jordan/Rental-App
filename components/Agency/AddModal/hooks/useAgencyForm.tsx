import { SetStateAction, useState } from 'react';
import { Alert } from 'react-native';
import { createAgencyFormData, transformAgencyFormData } from '../agencyValidationSchema';

export default function useAgencyForm(
    setModalVisible: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }
) {
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        contact: false,
        media: false,
    });

    const toggleSection = (section: string | number) => {
        // @ts-ignore
        setExpandedSections(prev => ({
            ...prev,
            // @ts-ignore
            [section]: !prev[section]
        }));
    };

    const onAgencySubmit = (values: any) => {
        const agencyData = transformAgencyFormData(values);
        const formDataToSend = createAgencyFormData(agencyData);

        console.log("✅ Données de l'agence :", agencyData);

        Alert.alert(
            "Succès",
            "L'agence a été ajoutée avec succès !",
            [
                {
                    text: "OK",
                    onPress: () => {
                        //Appel d'API ici
                        setModalVisible(false);
                    }
                }
            ]
        );
    };

    return {
        expandedSections,
        toggleSection,
        onAgencySubmit
    };
}