import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomPicker from '../../../General/Forms/CustomPicker';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import { CarData } from '@/assets/Car/CarData';

// @ts-ignore
const EngineSection = ({ values, handleChange, handleBlur, setFieldValue, isExpanded, onToggle }) => {
    return (
        <CollapsibleSection
            title="Moteur & Performance"
            icon={<MaterialIcons name="build" size={24} color="#3B82F6" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <View style={styles.inputGrid}>
                <CustomPicker
                    label="Type de moteur"
                    selectedValue={values.engine_type}
                    onValueChange={(type: any) => setFieldValue('engine_type', type)}
                    items={CarData.engineTypes}
                    placeholder="Type de moteur..." error={undefined} touched={undefined}                />
                <CustomFloatingInput
                    label="Puissance (CV)"
                    onChangeText={handleChange('horsepower')}
                    onBlur={handleBlur('horsepower')}
                    value={values.horsepower}
                    keyboardType="numeric" error={undefined} touched={undefined}                />
                <CustomFloatingInput
                    label="Cylindrée (L)"
                    onChangeText={handleChange('capacity')}
                    onBlur={handleBlur('capacity')}
                    value={values.capacity}
                    keyboardType="numeric" error={undefined} touched={undefined}                />
                <CustomFloatingInput
                    label="Consommation ville (L/100km)"
                    onChangeText={handleChange('fuel_city')}
                    onBlur={handleBlur('fuel_city')}
                    value={values.fuel_city}
                    keyboardType="numeric" error={undefined} touched={undefined}                />
                <CustomFloatingInput
                    label="Consommation autoroute (L/100km)"
                    onChangeText={handleChange('fuel_highway')}
                    onBlur={handleBlur('fuel_highway')}
                    value={values.fuel_highway}
                    keyboardType="numeric" error={undefined} touched={undefined}                />
            </View>
        </CollapsibleSection>
    );
};

const styles = StyleSheet.create({
    inputGrid: {
        gap: 16,
    },
});

export default EngineSection;
