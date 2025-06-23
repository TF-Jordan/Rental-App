import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

type FilterSliderProps = {
    label: string;
    min: number;
    max: number;
    step: number;
    initialRange: [number, number];
    suffix?: string;
    onChange?: (range: [number, number]) => void;
};

const FilterSlider: React.FC<FilterSliderProps> = ({
                                                       label,
                                                       min,
                                                       max,
                                                       step,
                                                       initialRange,
                                                       suffix = '',
                                                       onChange,
                                                   }) => {
    const [range, setRange] = useState<[number, number]>(initialRange);

    const handleChange = (values: number[]) => {
        const rounded: [number, number] = [
            Math.round(values[0] / step) * step,
            Math.round(values[1] / step) * step,
        ];
        setRange(rounded);
        onChange && onChange(rounded);
    };


    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.sliderContainer}>
                    <Slider
                        containerStyle={styles.slider}
                        value={range}
                        // @ts-ignore
                        onValueChange={setRange}
                        minimumValue={min}
                        maximumValue={max}
                        step={step}
                        minimumTrackTintColor="#007AFF"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#007AFF"
                    />
                </View>
                <Text style={styles.value}>
                    {range[0]} - {range[1]} {suffix}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        minWidth: 60, // Pour assurer une largeur minimale pour le label
    },
    sliderContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    slider: {
        width: '100%',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#007AFF',
        minWidth: 80, // Pour assurer une largeur minimale pour les valeurs
        textAlign: 'right',
    },
});

export default FilterSlider;