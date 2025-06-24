import React from 'react';
import { Modal, ScrollView, StyleSheet,View } from 'react-native';
import { Formik } from 'formik';
import ModalHeader from '../../General/Forms/ModalHeader';
import VehicleFormSections from './sections/VehicleFormSections';
import ActionButtons from '../../General/Forms/ActionButtons';
import { vehicleValidationSchema, initialValues } from './vehicleValidationSchema';

import useVehicleForm from './hooks/useVehicleForm';

/**
 * VehicleModal
 *
 * Ce composant affiche un formulaire dans une fenêtre modale plein écran
 * permettant d'ajouter un nouveau véhicule. Il utilise Formik pour gérer le
 * formulaire, la validation via Yup, et des composants personnalisés pour les
 * différentes sections du formulaire.
 *
 * Props :
 * @param {boolean} modalVisible - Détermine si le modal est visible.
 * @param {Function} setModalVisible - Fonction pour fermer le modal.
 * @param {Function} onAddVehicle - Callback appelée lors de la soumission du formulaire avec les données du véhicule.
 *
 * Composants internes :
 * - ModalHeader : En-tête du modal avec un titre et un bouton de fermeture.
 * - VehicleFormSections : Composant affichant les sections du formulaire.
 * - ActionButtons : Boutons pour sauvegarder ou annuler.
 *
 * Hooks :
 * - useVehicleForm : Hook personnalisé qui gère :
 *   - selectedBrand (string) : Marque du véhicule sélectionnée.
 *   - setSelectedBrand (Function) : Setter pour selectedBrand.
 *   - expandedSections (string[]) : Sections dépliées du formulaire.
 *   - toggleSection (Function) : Permet de replier/déplier une section.
 *   - handleSubmit (Function) : Fonction appelée lors de la soumission.
 *
 * Validation :
 * - Schema défini via Yup dans vehicleValidationSchema.
 *
 * Initialisation :
 * - Valeurs initiales définies dans initialValues.
 *
 * Style :
 * - modalContent : fond clair, scrollable.
 * - formContainer : padding interne du formulaire.
 *
 * Usage :
 * ```tsx
 * <VehicleModal
 *   modalVisible={modalVisible}
 *   setModalVisible={setModalVisible}
 *   onAddVehicle={handleVehicleSubmit}
 * />
 * ```
 */


interface VehicleModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// @ts-ignore
const VehicleModal: React.FC<VehicleModalProps> = ({
                                                       modalVisible,
                                                       setModalVisible,
                                                   }) => {
    const {
        selectedBrand,
        setSelectedBrand,
        expandedSections,
        toggleSection,
        onVehicleSubmit
    } = useVehicleForm(setModalVisible);

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle="fullScreen"
        >
            <ModalHeader
                title="Nouveau Véhicule"
                onClose={() => setModalVisible(false)}
            />

            <ScrollView
                style={styles.modalContent}
                showsVerticalScrollIndicator={false}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={vehicleValidationSchema}
                    onSubmit={onVehicleSubmit}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, handleBlur }) => (
                        <View style={styles.formContainer}>
                            <VehicleFormSections
                                // @ts-ignore
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                selectedBrand={selectedBrand}
                                setSelectedBrand={setSelectedBrand}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}

                            />

                            <ActionButtons
                                onSave={handleSubmit}
                                onCancel={() => setModalVisible(false)}
                            />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    formContainer: {
        padding: 20,
        paddingBottom: 40,
    },
});

export default VehicleModal;
