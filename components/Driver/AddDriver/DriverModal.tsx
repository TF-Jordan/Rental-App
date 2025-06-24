import React from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import ModalHeader from '@/components/General/Forms/ModalHeader';
import DriverFormSections from './sections/DriverFormSections';
import ActionButtons from '@/components/General/Forms/ActionButtons';
import { driverValidationSchema, initialDriverValues } from './driverValidationSchema';
import useDriverForm from './hooks/useDriverForm';

interface DriverModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// @ts-ignore
const DriverModal: React.FC<DriverModalProps> = ({
                                                     modalVisible,
                                                     setModalVisible,
                                                 }) => {
    const {
        expandedSections,
        toggleSection,
        onDriverSubmit
    } = useDriverForm(setModalVisible);

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            presentationStyle="fullScreen"
        >
            <ModalHeader
                title="Nouveau Conducteur"
                onClose={() => setModalVisible(false)}
            />

            <ScrollView
                style={styles.modalContent}
                showsVerticalScrollIndicator={false}
            >
                <Formik
                    initialValues={initialDriverValues}
                    validationSchema={driverValidationSchema}
                    onSubmit={onDriverSubmit}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, handleBlur }) => (
                        <View style={styles.formContainer}>
                            <DriverFormSections
                                // @ts-ignore
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

export default DriverModal;