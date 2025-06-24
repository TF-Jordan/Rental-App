import { SetStateAction, useState} from 'react';
import {Alert} from 'react-native';
import {createVehicleFormData, transformFormData} from '../vehicleValidationSchema';

export default function useVehicleForm(setModalVisible: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }){
    const [selectedBrand, setSelectedBrand] = useState('');
    const [expandedSections, setExpandedSections] = useState({
        basic: true,
        engine: false,
        features: false,
        document: false,
    });

    const toggleSection = (section: string | number) => {
        // @ts-ignore
        setExpandedSections(prev => ({
            ...prev,
            // @ts-ignore
            [section]: !prev[section]
        }));
    };

    const onVehicleSubmit = (values: any) => {
        const vehicleData = transformFormData(values);
        const formDataToSend = createVehicleFormData(vehicleData);
        console.log(values);
        console.log("✅ Données du véhicule :", vehicleData);
        console.log(formDataToSend);

        Alert.alert(
            "Succès",
            "Le véhicule a été ajouté avec succès !",
            [
                {
                    text: "OK",
                    onPress: () => {
                        //Appel d'api ici
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
        onVehicleSubmit
    };
};
