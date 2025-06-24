import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarScheduler from "@/components/Driver/Calender";
import { DriverProps as Driver } from "@/utils/types/DriverProps";

interface DriverCalendarSectionProps {
    driver: Driver;
}

export default function DriverCalendarSection({ driver }: DriverCalendarSectionProps) {
    return (
        <View style={styles.calendarSection}>
            <View style={styles.sectionHeader}>
                <MaterialIcons name="calendar-today" size={24} color="#3B82F6" />
                <Text style={styles.sectionTitle}>Planning</Text>
            </View>
            <View style={styles.calendarContainer}>
                {/* @ts-ignore */}
                <CalendarScheduler driver={driver} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calendarSection: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        overflow: 'hidden',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
        backgroundColor: '#F1F5F9',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginLeft: 12,
        letterSpacing: 0.3,
    },
    calendarContainer: {
        padding: 20,
    },
});