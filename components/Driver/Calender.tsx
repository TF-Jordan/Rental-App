import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
// @ts-ignore
import { Calendar, DateCallbackHandler, CalendarMarkingProps } from 'react-native-calendars';
import {PlusCircle} from "lucide-react-native";
import SchedulingModal from '@/components/Driver/SchedulindModal'


/**
 * Props:
 * @param driverData - scheduling JSON for a driver
 */
interface SchedulingEntry {
    start: string;
    end: string;
}
interface Scheduling {
    working_hours: { start: string; end: string };
    days_off: SchedulingEntry[];
    scheduled_ranges: SchedulingEntry[];
}
interface Driver {
    id: string;
    scheduling: Scheduling;
}
interface CalendarSchedulerProps {
    driver: Driver;
}

const CalendarScheduler: React.FC<CalendarSchedulerProps> = ({ driver }) => {
    const [markedDates, setMarkedDates] = useState<CalendarMarkingProps>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState<'work' | 'off' | 'scheduled'>('off');
    const [range, setRange] = useState<{ start: Date; end: Date }>({ start: new Date(), end: new Date() });
    const [pickerMode, setPickerMode] = useState<'start' | 'end'>('start');
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        const marks: CalendarMarkingProps = {};
        // mark working days by default (repeating weekdays)
        // For simplicity, assume working days are Mon-Fri
        // highlight scheduled_ranges
        driver.scheduling.scheduled_ranges.forEach(range => {
            const start = new Date(range.start);
            const end = new Date(range.end);
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateKey = d.toISOString().split('T')[0];
                marks[dateKey] = { marked: true, dotColor: 'green' };
            }
        });
        // highlight days_off
        driver.scheduling.days_off.forEach(range => {
            const start = new Date(range.start);
            const end = new Date(range.end);
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateKey = d.toISOString().split('T')[0];
                marks[dateKey] = { marked: true, dotColor: 'red' };
            }
        });
        setMarkedDates(marks);
    }, [driver]);

    const onDayPress: DateCallbackHandler = (day: { dateString: any; }) => {
        console.log('Selected date', day.dateString);
    };

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const onChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            if (pickerMode === 'start') setRange(prev => ({ ...prev, start: selectedDate }));
            else setRange(prev => ({ ...prev, end: selectedDate }));
        }
    };

    const saveRange = () => {
        const updatedMarks = { ...markedDates };
        const start = new Date(range.start);
        const end = new Date(range.end);

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];
            const color = type === 'scheduled' ? 'green' : 'red';
            updatedMarks[dateKey] = { marked: true, dotColor: color };
        }

        setMarkedDates(updatedMarks);
        closeModal();
    };


    return (
        <View style={styles.container}>
            <Calendar
                markingType={'dot'}
                markedDates={markedDates}
                onDayPress={onDayPress}
            />
            <TouchableOpacity style={styles.fab} onPress={openModal}>
                <View style={{flexDirection:'row'}}>
                    <PlusCircle size={20} color="#3B82F6" />
                    <Text style={{color:"#3B82F6"}}> ADD</Text>
                </View>
            </TouchableOpacity>


            <View style={styles.legendContainer}>
                <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: 'green' }]} /><Text>Scheduled</Text></View>
                <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: 'red' }]} /><Text>Day Off</Text></View>
            </View>

                <SchedulingModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    selectedDates={range}
                    // @ts-ignore
                    selectedType={type}
                    onTypeChange={(newType) => setType(newType)}
                    onSave={(start, end, selectedType) => {
                        const updatedMarks = { ...markedDates };
                        const color = selectedType === 'scheduled' ? 'green' : 'red';

                        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                            const dateKey = d.toISOString().split('T')[0];
                            updatedMarks[dateKey] = { marked: true, dotColor: color };
                        }

                        setMarkedDates(updatedMarks);
                        setModalVisible(false);
                    }}
                />

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    legendContainer: { flexDirection: 'row', marginVertical: 8 },
    legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
    dot: { width: 12, height: 12, borderRadius: 6, marginRight: 4 },
    fab: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
    },buttonText: { color: '#fff', fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    pickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
    modalActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }
});

export default CalendarScheduler;
