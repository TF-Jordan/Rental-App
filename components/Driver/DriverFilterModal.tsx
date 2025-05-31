import {FilterDriverProps} from "@/utils/types/DriverProps";
import {useState} from "react";
import {Text,Modal, TouchableOpacity, TouchableWithoutFeedback, View,StyleSheet} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Slider} from "@miblanchard/react-native-slider";
import {DriverLocations} from "@/assets/Drivers/DriverProperty";


interface FilterModalProps {
    visible: boolean;
    filters: FilterDriverProps;
    onChange: (f: { ratingRange: [number, number]; ageRange: [number, number]; location?: string }) => void;
    onClose: () => void;
    onClear: () => void;
}

export default function FilterModal({ visible, filters, onChange, onClose, onClear }: FilterModalProps) {
    const [local, setLocal] = useState(filters);
    const locations = DriverLocations;

    const update = (field: keyof typeof local, value: any) => {
        const next = { ...local, [field]: value };
        setLocal(next);
        onChange(next);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Filtres</Text>

                            <Text style={styles.sectionTitle}>Âge</Text>
                            <Slider
                                value={local.ageRange}
                                onValueChange={(v) => update('ageRange', [v[0], v[1]] as [number, number])}
                                minimumValue={25}
                                maximumValue={45}
                                step={1}
                                minimumTrackTintColor="#007AFF"
                                maximumTrackTintColor="#ccc"
                                trackClickable
                                thumbTintColor="#007AFF"
                            />
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueText}>{local.ageRange[0]} ans</Text>
                                <Text style={styles.valueText}>{local.ageRange[1]} ans</Text>
                            </View>

                            <Text style={styles.sectionTitle}>Notation</Text>
                            <Slider
                                value={local.ratingRange}
                                onValueChange={(v) => update('ratingRange', [v[0], v[1]] as [number, number])}
                                minimumValue={0}
                                maximumValue={5}
                                step={0.5}
                                minimumTrackTintColor="#007AFF"
                                maximumTrackTintColor="#ccc"
                                trackClickable
                                thumbTintColor="#007AFF"
                            />
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueText}>{local.ratingRange[0].toFixed(1)}★</Text>
                                <Text style={styles.valueText}>{local.ratingRange[1].toFixed(1)}★</Text>
                            </View>

                            <Text style={styles.sectionTitle}>Emplacement</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={local.location} onValueChange={(v) => update('location', v)}>
                                    <Picker.Item label="Toutes" value="" />
                                    {locations.map(loc => <Picker.Item key={loc} label={loc} value={loc} />)}
                                </Picker>
                            </View>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.clearButtonModal} onPress={() => { setLocal(filters); onClear(); }}>
                                    <Text style={styles.clearText}>Effacer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                    <Text style={styles.buttonText}>Fermer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}


const styles =StyleSheet.create({

    buttonText: { color: '#fff', fontWeight: '600' },
    clearButtonModal: { flex: 1, marginRight: 5, backgroundColor: '#fff', borderWidth: 1, borderColor: '#007AFF', padding: 12, borderRadius: 10, alignItems: 'center' },
    clearText: { color: '#007AFF', fontWeight: '600' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    pickerContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, overflow: 'hidden', marginTop: 8, marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 12, color: '#333' },
    valueContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
    valueText: { fontSize: 14, color: '#007AFF', fontWeight: '500' },
    modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', margin: 20, borderRadius: 20, padding: 20 },
    modalTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },

    closeButton: { flex: 1, marginLeft: 5, backgroundColor: '#007AFF', padding: 12, borderRadius: 10, alignItems: 'center' },
})