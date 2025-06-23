import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import DocumentUploadField from '../../../General/Forms/DocumentUploadField';
import ImageUploadField from '../../../General/Forms/ImageUploadField';

// @ts-ignore
const DriverDocumentsSection = ({ values, setFieldValue, isExpanded, onToggle }) => {

    const pickDocument = async (fieldName: string) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setFieldValue(fieldName, result.assets[0]);
            }
        } catch (error) {
            console.error('Erreur lors de la sélection du document:', error);
        }
    };

    const pickProfileImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setFieldValue('profile_picture', result.assets[0]);
            }
        } catch (error) {
            console.error('Erreur lors de la sélection de l\'image:', error);
        }
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
                    label="Carte d'identité"
                    value={values.id_card?.name}
                    onPress={() => pickDocument('id_card')}
                    onRemove={() => setFieldValue('id_card', null)}
                />

                <DocumentUploadField
                    label="Permis de conduire"
                    value={values.driver_licence?.name}
                    onPress={() => pickDocument('driver_licence')}
                    onRemove={() => setFieldValue('driver_licence', null)}
                />

                <ImageUploadField
                    label="Photo de profil"
                    images={values.profile_picture ? [values.profile_picture.uri] : []}
                    onAddImages={pickProfileImage}
                    onRemoveImage={() => setFieldValue('profile_picture', null)}
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

export default DriverDocumentsSection;
