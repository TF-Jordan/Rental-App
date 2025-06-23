import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import ImageUploadField from '../../../General/Forms/ImageUploadField';
import * as ImagePicker from "expo-image-picker";

class MediaSection extends React.Component<{ values: any, setFieldValue: any, isExpanded: any, onToggle: any }> {
    render() {
        let {values, setFieldValue, isExpanded, onToggle} = this.props;

        const handleAddImages = async () => {
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

        const handleRemoveImage = (index: number) => {
            const newImages = values.images.filter((_: any, i: number) => i !== index);
            setFieldValue('images', newImages);
        };

        return (
            <CollapsibleSection
                title="Photos de l'agence"
                icon={<MaterialIcons name="photo-library" size={24} color="#3B82F6"/>}
                isExpanded={isExpanded}
                onToggle={onToggle}
            >
                <View style={styles.mediaGrid}>
                    <ImageUploadField
                        label="Photos de l'agence"
                        images={values.images}
                        onAddImages={handleAddImages}
                        onRemoveImage={handleRemoveImage}
                        maxImages={5}
                    />
                </View>
            </CollapsibleSection>
        );
    }
}

const styles = StyleSheet.create({
    mediaGrid: {
        gap: 16,
    },
});

export default MediaSection;
