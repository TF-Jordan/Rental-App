import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';

// @ts-ignore
const DocumentsSection = ({ values, setFieldValue, isExpanded, onToggle }) => {

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

    const pickImages = async () => {
        try {

            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission refusée', 'Nous avons besoin de la permission pour accéder à vos photos');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsMultipleSelection: true,
                quality: 0.8,
                selectionLimit: 5,
            });


            if (!result.canceled) {
                const currentImages = values.images || [];
                const newImages = [...currentImages, ...result.assets];

                if (newImages.length > 5) {
                    Alert.alert('Limite dépassée', 'Maximum 5 images autorisées');
                    return;
                }

                setFieldValue('images', newImages);
            }
        } catch (error) {
            Alert.alert('Erreur', 'Impossible de sélectionner les images');
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = values.images.filter((_: any, i: number) => i !== index);
        setFieldValue('images', updatedImages);
    };

    const removeDocument = (fieldName: string) => {
        setFieldValue(fieldName, null);
    };

    // @ts-ignore
    const DocumentField = ({ label, fieldName, icon }) => (
        <View style={styles.documentField}>
            <Text style={styles.documentLabel}>{label}</Text>
            <View style={styles.documentRow}>
                <TouchableOpacity
                    style={[
                        styles.documentButton,
                        values[fieldName] && styles.documentButtonSelected
                    ]}
                    onPress={() => pickDocument(fieldName)}
                >
                    <MaterialIcons
                        name={icon}
                        size={20}
                        color={values[fieldName] ? "#10B981" : "#6B7280"}
                    />
                    <Text style={[
                        styles.documentButtonText,
                        values[fieldName] && styles.documentButtonTextSelected
                    ]}>
                        {values[fieldName] ? values[fieldName].name : 'Sélectionner'}
                    </Text>
                </TouchableOpacity>

                {values[fieldName] && (
                    <TouchableOpacity
                        onPress={() => removeDocument(fieldName)}
                        style={styles.removeDocumentButton}
                    >
                        <MaterialIcons name="close" size={16} color="#EF4444" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <CollapsibleSection
            title="Documents & Images"
            icon={<MaterialIcons name="folder" size={24} color="#3B82F6" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <View style={styles.container}>
                {/* Documents section */}
                <Text style={styles.sectionTitle}>Documents requis</Text>

                <DocumentField
                    label="Certificat d'immatriculation"
                    fieldName="registration_certificate"
                    icon="description"
                />

                <DocumentField
                    label="Contrôle technique"
                    fieldName="technical_inspection"
                    icon="verified"
                />

                <DocumentField
                    label="Assurance"
                    fieldName="insurance"
                    icon="security"
                />

                <DocumentField
                    label="Vignette"
                    fieldName="tax_sticker"
                    icon="local-offer"
                />

                {/* Images section */}
                <Text style={styles.sectionTitle}>Images du véhicule</Text>

                <TouchableOpacity
                    style={styles.imagePickerButton}
                    onPress={pickImages}
                >
                    <MaterialIcons name="add-photo-alternate" size={24} color="#3B82F6" />
                    <Text style={styles.imagePickerText}>
                        Ajouter des images ({values.images?.length || 0}/5)
                    </Text>
                </TouchableOpacity>

                {values.images && values.images.length > 0 && (
                    <View style={styles.imagesList}>
                        {values.images.map((image: { fileName: any; }, index: React.Key | null | undefined) => (
                            <View key={index} style={styles.imageItem}>
                                <MaterialIcons name="image" size={20} color="#10B981" />
                                <Text style={styles.imageItemText} numberOfLines={1}>
                                    {image.fileName || `Image ${Number(index) + 1}`}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => removeImage(Number(index))}
                                    style={styles.removeImageButton}
                                >
                                    <MaterialIcons name="close" size={16} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </CollapsibleSection>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginTop: 8,
    },
    documentField: {
        marginBottom: 12,
    },
    documentLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 6,
    },

    documentButtonSelected: {
        borderColor: '#10B981',
        backgroundColor: '#F0FDF4',
    },
    documentButtonText: {
        flex: 1,
        color: '#6B7280',
        fontSize: 14,
    },
    documentButtonTextSelected: {
        color: '#10B981',
        fontWeight: '500',
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 2,
        borderColor: '#3B82F6',
        borderStyle: 'dashed',
        borderRadius: 8,
        gap: 8,
    },
    imagePickerText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '500',
    },
    imagesList: {
        gap: 8,
    },
    imageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#F0FDF4',
        borderRadius: 6,
        gap: 8,
    },
    imageItemText: {
        flex: 1,
        color: '#10B981',
        fontSize: 12,
    },
    removeImageButton: {
        padding: 4,
    },
    documentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    documentButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: '#F9FAFB',
        gap: 8,
    },
    removeDocumentButton: {
        padding: 8,
        backgroundColor: '#FEF2F2',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
});

export default DocumentsSection;