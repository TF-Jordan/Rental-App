import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface SchedulingModalProps {
    visible: boolean;
    onClose: () => void;
    selectedDates: { start: Date | null; end: Date | null };
    selectedType: 'working_hours' | 'day_off' | 'scheduled';
    onTypeChange: (type: 'day_off' | 'scheduled') => void;
    onSave: (start: Date, end: Date, type: 'working_hours' | 'day_off' | 'scheduled') => void;
}

const SchedulingModal: React.FC<SchedulingModalProps> = ({
                                                             visible,
                                                             onClose,
                                                             selectedDates,
                                                             selectedType,
                                                             onTypeChange,
                                                             onSave,
                                                         }) => {
    const [startDate, setStartDate] = useState<Date>(selectedDates.start || new Date());
    const [endDate, setEndDate] = useState<Date>(selectedDates.end || new Date());
    const [showPicker, setShowPicker] = useState<'start' | 'end' | null>(null);

    useEffect(() => {
        if (selectedDates.start) setStartDate(selectedDates.start);
        if (selectedDates.end) setEndDate(selectedDates.end);
    }, [selectedDates]);

    const handleSave = () => {
        if (startDate > endDate) {
            alert('La date de fin doit être après la date de début');
            return;
        }
        onSave(startDate, endDate, selectedType);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Ajouter / Modifier un planning</Text>

                            {/* Type de planning */}
                            <Text style={styles.label}>Type de planning</Text>
                            <View style={styles.select}>
                                {['day_off', 'scheduled'].map((type) => (
                                    <TouchableOpacity key={type} style={[styles.typeOption, selectedType === type && styles.typeOptionSelected,]} onPress={() => onTypeChange(type as any)}>
                                        <Text style={[styles.typeText, selectedType === type && styles.typeTextSelected,]}>
                                            {type === 'day_off' ? 'Day off' : type === 'scheduled' ? 'Scheduled' : 'Scheduled'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Dates */}
                            <View style={styles.datesRow}>
                                <View style={styles.dateBlock}>
                                    <Text style={styles.label}>Date de début</Text>
                                    <TouchableOpacity onPress={() => setShowPicker('start')} style={styles.dateInput}>
                                        <Text>{startDate.toDateString()}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.dateBlock}>
                                    <Text style={styles.label}>Date de fin</Text>
                                    <TouchableOpacity onPress={() => setShowPicker('end')} style={styles.dateInput}>
                                        <Text>{endDate.toDateString()}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {showPicker && (
                                <DateTimePicker
                                    value={showPicker === 'start' ? startDate : endDate}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={(_, date) => {
                                        if (date) {
                                            showPicker === 'start' ? setStartDate(date) : setEndDate(date);
                                        }
                                        setShowPicker(null);
                                    }}
                                />
                            )}

                            {/* Actions */}
                            <View style={styles.actions}>
                                <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>Annuler</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                    <Text style={styles.saveText}>Enregistrer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default SchedulingModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
    },
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    typeOption: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    typeOptionSelected: {
        backgroundColor: '#007bff',
    },
    typeText: {
        color: '#333',
    },
    typeTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    datesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dateBlock: {
        flex: 1,
        marginHorizontal: 5,
    },
    dateInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#fafafa',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    cancelButton: {
        padding: 10,
        backgroundColor: '#e2e2e2',
        borderRadius: 5,
        marginRight: 10,
    },
    saveButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    cancelText: {
        color: '#333',
    },
    saveText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
