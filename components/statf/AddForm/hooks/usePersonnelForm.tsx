
import { SetStateAction, useState } from 'react';
import { Alert } from 'react-native';
import { createPersonnelFormData, transformPersonnelFormData } from '../personnelValidationSchema';

export default function usePersonnelForm(
    setModalVisible: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }
) {
    const [selectedDepartement, setSelectedDepartement] = useState('');
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        contact: false,
        professional: false,
        competences: false,
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

    // 🎯 FONCTION PRINCIPALE - C'EST ICI QUE SE FAIT L'APPEL API
    const onPersonnelSubmit = (values: any) => {
        const personnelData = transformPersonnelFormData(values);
        const formDataToSend = createPersonnelFormData(personnelData);

        console.log(values);
        console.log("✅ Données du personnel :", personnelData);
        console.log(formDataToSend);

        // 🚨 POINT IMPORTANT : L'appel API doit être fait dans onAddPersonnel
        // Cette fonction reçoit les données formatées et doit les envoyer au backend
        Alert.alert(
            "Succès",
            "Le membre du personnel a été ajouté avec succès !",
            [
                {
                    text: "OK",
                    onPress: () => {
                         setModalVisible(false);
                    }
                }
            ]
        );
    };

    return {
        selectedDepartement,
        setSelectedDepartement,
        expandedSections,
        toggleSection,
        onPersonnelSubmit
    };
}