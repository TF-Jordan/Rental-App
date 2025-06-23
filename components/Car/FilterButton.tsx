import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/utils/colors';

interface FilterButtonProps {
    onPress: () => void;
    activeFiltersCount: number;
}

export default function FilterButton({ onPress, activeFiltersCount }: FilterButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.filterButton,
                activeFiltersCount > 0 && styles.filterButtonActive
            ]}
            onPress={onPress}
        >
            <MaterialIcons
                name="tune"
                size={18}
                color={activeFiltersCount > 0 ? '#fff' : Colors.primary}
            />
            <Text
                style={[
                    styles.filterButtonText,
                    activeFiltersCount > 0 && styles.filterButtonTextActive
                ]}
            >
                Filtres
            </Text>
            {activeFiltersCount > 0 && (
                <View style={styles.filterIndicator}>
                    <Text style={styles.filterIndicatorText}>
                        {activeFiltersCount}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: '#fff',
    },
    filterButtonActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filterButtonText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    filterButtonTextActive: {
        color: '#fff',
    },
    filterIndicator: {
        marginLeft: 4,
        backgroundColor: '#fff',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterIndicatorText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
});