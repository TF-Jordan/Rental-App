import React from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import ModalHeader from '@/components/General/Forms/ModalHeader';
import AgencyFormSections from './sections/AgencyFormSections';
import ActionButtons from '@/components/General/Forms/ActionButtons';
import { agencyValidationSchema, initialAgencyValues } from './agencyValidationSchema';
import useAgencyForm from './hooks/useAgencyForm';

interface AgencyModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgencyModal: React.FC<AgencyModalProps> = ({
                                                     modalVisible,
                                                     setModalVisible,
                                                 }) => {
    const {
        expandedSections,
        toggleSection,
        onAgencySubmit
    } = useAgencyForm(setModalVisible);

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle="fullScreen"
        >
            <ModalHeader
                title="Nouvelle Agence"
                onClose={() => setModalVisible(false)}
            />

            <ScrollView
                style={styles.modalContent}
                showsVerticalScrollIndicator={false}
            >
                <Formik
                    initialValues={initialAgencyValues}
                    validationSchema={agencyValidationSchema}
                    onSubmit={onAgencySubmit}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, handleBlur }) => (
                        <View style={styles.formContainer}>
                            <AgencyFormSections
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
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

export default AgencyModal;
