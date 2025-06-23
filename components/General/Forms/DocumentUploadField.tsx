import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface DocumentUploadFieldProps {
    label: string;
    value?: string | string[];
    onPress: () => void;
    onRemove: () => void;
    multiple?: boolean;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
                                                                     label,
                                                                     value,
                                                                     onPress,
                                                                     onRemove,
                                                                     multiple = false
                                                                 }) => {
    const hasFiles = multiple ?
        (Array.isArray(value) && value.length > 0) :
        Boolean(value);

    const getDisplayText = () => {
        if (multiple && Array.isArray(value)) {
            return value.length > 1 ?
                `${value.length} fichiers sélectionnés` :
                value[0]?.split('/').pop() || 'Fichier sélectionné';
        }
        return typeof value === 'string' ?
            value.split('/').pop() || 'Document sélectionné' :
            'Document sélectionné';
    };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            {hasFiles ? (
                <View style={styles.fileContainer}>
                    <View style={styles.fileInfo}>
                        <MaterialIcons name="picture-as-pdf" size={24} color="#EF4444" />
                        <Text style={styles.fileName} numberOfLines={1}>
                            {getDisplayText()}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                        <MaterialIcons name="close" size={20} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
                    <MaterialIcons name="cloud-upload" size={24} color="#6B7280" />
                    <Text style={styles.uploadText}>
                        {multiple ? 'Sélectionner des fichiers PDF' : 'Sélectionner un fichier PDF'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    uploadButton: {
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
    },
    uploadText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
    },
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    fileInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    fileName: {
        flex: 1,
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    removeButton: {
        padding: 4,
    },
});

export default DocumentUploadField;