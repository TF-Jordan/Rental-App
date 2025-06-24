import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// @ts-ignore
const ActionButtons = ({ onSave, onCancel }) => {
    return (
        <View style={styles.actionButtons}>
            <TouchableOpacity
                style={styles.saveButton}
                onPress={onSave}
                activeOpacity={0.8}
            >
                <MaterialIcons name="save" size={20} color="white" />
                <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
                activeOpacity={0.8}
            >
                <MaterialIcons name="cancel" size={20} color="#EF4444" />
                <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
        paddingHorizontal: 4,
    },
    saveButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B82F6',
        paddingVertical: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        gap: 8,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#EF4444',
        gap: 8,
    },
    cancelButtonText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ActionButtons;