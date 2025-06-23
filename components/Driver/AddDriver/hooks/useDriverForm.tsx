import { SetStateAction, useState } from 'react';
import { Alert } from 'react-native';
import { createDriverFormData, transformDriverFormData } from '../driverValidationSchema';

export default function useDriverForm(
    setModalVisible: {
        (value: SetStateAction<boolean>): void;
        (arg0: boolean): void;
    }
) {
    const [expandedSections, setExpandedSections] = useState({
        personal: true,
        license: false,
        contact: false,
        documents: false,
    });

    const toggleSection = (section: string | number) => {
        // @ts-ignore
        setExpandedSections(prev => ({
            ...prev,
            // @ts-ignore
            [section]: !prev[section]
        }));
    };

    const onDriverSubmit = (values: any) => {
        const driverData = transformDriverFormData(values);
        const formDataToSend = createDriverFormData(driverData);

        console.log(values);
        console.log("✅ Données du conducteur :", driverData);
        console.log(formDataToSend);

        Alert.alert(
            "Succès",
            "Le conducteur a été ajouté avec succès !",
            [
                {
                    text: "OK",
                    onPress: () => {
                        // 🔥 C'EST ICI QUE L'APPEL API DOIT ÊTRE FAIT !
                        // Cette fonction onAddDriver doit être remplacée par votre appel API
                        setModalVisible(false);
                    }
                }
            ]
        );
    };

    return {
        expandedSections,
        toggleSection,
        onDriverSubmit
    };
}