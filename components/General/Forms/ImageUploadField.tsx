import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ImageUploadFieldProps {
    label: string;
    images: string[];
    onAddImages: () => void;
    onRemoveImage: (index: number) => void;
    maxImages?: number;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
                                                               label,
                                                               images,
                                                               onAddImages,
                                                               onRemoveImage,
                                                               maxImages = 10
                                                           }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.counter}>
                    {images.length}/{maxImages}
                </Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.addButton,
                    images.length >= maxImages && styles.addButtonDisabled
                ]}
                onPress={onAddImages}
                disabled={images.length >= maxImages}
            >
                <MaterialIcons
                    name="add-photo-alternate"
                    size={24}
                    color={images.length >= maxImages ? '#9CA3AF' : '#6B7280'}
                />
                <Text style={[
                    styles.addText,
                    images.length >= maxImages && styles.addTextDisabled
                ]}>
                    Ajouter des photos
                </Text>
            </TouchableOpacity>

            {images.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.imagesList}
                >
                    {images.map((imageUri, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={{ uri: imageUri }} style={styles.image} />
                            <TouchableOpacity
                                style={styles.removeImageButton}
                                onPress={() => onRemoveImage(index)}
                            >
                                <MaterialIcons name="close" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    counter: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 20,
        gap: 8,
        marginBottom: 12,
    },
    addButtonDisabled: {
        backgroundColor: '#F3F4F6',
        borderColor: '#D1D5DB',
    },
    addText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
    },
    addTextDisabled: {
        color: '#9CA3AF',
    },
    imagesList: {
        flexDirection: 'row',
    },
    imageContainer: {
        position: 'relative',
        marginRight: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    removeImageButton: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: '#EF4444',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});

export default ImageUploadField;