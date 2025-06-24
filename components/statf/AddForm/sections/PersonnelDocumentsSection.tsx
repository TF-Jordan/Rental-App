// sections/PersonnelDocumentsSection.tsx
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import DocumentUploadField from '../../../General/Forms/DocumentUploadField';
import ImageUploadField from '../../../General/Forms/ImageUploadField';

// @ts-ignore
const PersonnelDocumentsSection = ({ values, setFieldValue, isExpanded, onToggle }) => {

    const pickDocument = async (fieldName: string) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets[0]) {
                setFieldValue(fieldName, result.assets[0]);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de sélectionner le document');
        }
    };

    const pickPhoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setFieldValue('photo', result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de sélectionner la photo');
        }
    };

    const removeDocument = (fieldName: string) => {
        setFieldValue(fieldName, null);
    };

    const removePhoto = () => {
        setFieldValue('photo', null);
    };

    return (
        <CollapsibleSection
            title="Documents & Photo"
            icon={<MaterialIcons name="folder" size={24} color="#3B82F6" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <View style={styles.documentsGrid}>
                <DocumentUploadField
                    label="CV"
                    value={values.cv?.name}
                    onPress={() => pickDocument('cv')}
                    onRemove={() => removeDocument('cv')}
                />

                <DocumentUploadField
                    label="Contrat de travail"
                    value={values.contrat?.name}
                    onPress={() => pickDocument('contrat')}
                    onRemove={() => removeDocument('contrat')}
                />

                <DocumentUploadField
                    label="Pièce d'identité"
                    value={values.piece_identite?.name}
                    onPress={() => pickDocument('piece_identite')}
                    onRemove={() => removeDocument('piece_identite')}
                />

                <ImageUploadField
                    label="Photo de profil"
                    images={values.photo ? [values.photo] : []}
                    onAddImages={pickPhoto}
                    onRemoveImage={removePhoto}
                    maxImages={1}
                />
            </View>
        </CollapsibleSection>
    );
};

const styles = StyleSheet.create({
    documentsGrid: {
        gap: 16,
    },
});

export default PersonnelDocumentsSection;