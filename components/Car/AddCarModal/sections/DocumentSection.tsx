// src/components/FormSections/DocumentsSection.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import CustomPicker from '../../../General/Forms/CustomPicker';

// @ts-ignore
export default function DocumentsSection({ values, errors, touched, handleChange, handleBlur, setFieldValue, isExpanded, onToggle }) {
    return (
        <CollapsibleSection
            title="Documents"
            icon={<MaterialIcons name="insert-drive-file" size={24} color="#3B82F6" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <View style={styles.inputGrid}>
                <CustomFloatingInput
                    label="Numéro d'immatriculation du certificat *"
                    value={values.registration_certificate}
                    onChangeText={handleChange('registration_certificate')}
                    onBlur={handleBlur('registration_certificate')}
                    error={errors.registration_certificate}
                    touched={touched.registration_certificate}
                />

                <CustomFloatingInput
                    label="Numéro d'assurance *"
                    value={values.insurance_number}
                    onChangeText={handleChange('insurance_number')}
                    onBlur={handleBlur('insurance_number')}
                    error={errors.insurance_number}
                    touched={touched.insurance_number}
                />

                <CustomPicker
                    label="Type de carte grise *"
                    selectedValue={values.carte_grise_type}
                    // @ts-ignore
                    onValueChange={(value) => setFieldValue('carte_grise_type', value)}
                    items={['Particulier', 'Professionnel', 'Temporaire']}
                    placeholder="Sélectionner le type..."
                    error={errors.carte_grise_type}
                    touched={touched.carte_grise_type}
                />

                {/* Tu peux aussi ajouter un champ de téléversement ou d'image ici */}
            </View>
        </CollapsibleSection>
    );
}

const styles = StyleSheet.create({
    inputGrid: {
        gap: 16,
    },
});
