// PersonnelModal.tsx
import React from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import ModalHeader from '@/components/General/Forms/ModalHeader';
import PersonnelFormSections from './sections/PersonnelFormSections';
import ActionButtons from '@/components/General/Forms/ActionButtons';
import { personnelValidationSchema, initialPersonnelValues } from './personnelValidationSchema';
import usePersonnelForm from './hooks/usePersonnelForm';

interface PersonnelModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// @ts-ignore
const PersonnelModal: React.FC<PersonnelModalProps> = ({
                                                           modalVisible,
                                                           setModalVisible,
                                                       }) => {
    const {
        selectedDepartement,
        setSelectedDepartement,
        expandedSections,
        toggleSection,
        onPersonnelSubmit
    } = usePersonnelForm(setModalVisible);

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle="fullScreen"
        >
            <ModalHeader
                title="Nouveau Personnel"
                onClose={() => setModalVisible(false)}
            />

            <ScrollView
                style={styles.modalContent}
                showsVerticalScrollIndicator={false}
            >
                <Formik
                    initialValues={initialPersonnelValues}
                    validationSchema={personnelValidationSchema}
                    onSubmit={onPersonnelSubmit}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, handleBlur }) => (
                        <View style={styles.formContainer}>
                            <PersonnelFormSections
                                // @ts-ignore
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                selectedDepartement={selectedDepartement}
                                setSelectedDepartement={setSelectedDepartement}
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

export default PersonnelModal;