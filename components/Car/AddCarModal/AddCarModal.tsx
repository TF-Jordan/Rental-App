import React, { useState } from 'react';
import { View } from 'react-native';
import FloatingButton from '../../General/FloatingButton';
import VehicleModal from './VehicleModal';



/**
 * AddCarModal
 *
 * Composant qui encapsule un bouton flottant pour ajouter un véhicule
 * et ouvre une modale (VehicleModal) contenant un formulaire d'ajout.
 *
 * Props :
 * @param {Function} onAddVehicle - Callback appelée lors de la soumission du formulaire avec les données du nouveau véhicule.
 *
 * Comportement :
 * - Le bouton flottant (FloatingButton) permet d’ouvrir le formulaire dans une modale.
 * - La modale (VehicleModal) est affichée ou cachée selon l’état `modalVisible`.
 *
 * Composants utilisés :
 * - FloatingButton : bouton d’action rapide, avec une icône "plus".
 * - VehicleModal : formulaire d’ajout de véhicule.
 *
 * État local :
 * - modalVisible (boolean) : gère l’affichage de la modale.
 *
 * Usage :
 * ```tsx
 * <AddCarModal onAddVehicle={handleAddVehicle} />
 * ```
 */

// @ts-ignore
export default function AddCarModal({ onAddVehicle }: Function) {
    const [modalVisible, setModalVisible] = useState(false);

    // @ts-ignore
    return (
        <View style={{ flex: 1 }}>
            <FloatingButton
                onPress={() => setModalVisible(true)}
                title=""
                iconName="plus"
            />

            <VehicleModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onAddVehicle={onAddVehicle}
            />
        </View>
    );
}