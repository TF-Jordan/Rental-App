import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomPicker from '../../../General/Forms/CustomPicker';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import { CarData } from '@/assets/Car/CarData';

// @ts-ignore
export default function BasicInfoSection ({values, errors, touched, handleChange, handleBlur, setFieldValue, selectedBrand, setSelectedBrand, isExpanded, onToggle
                          }){
    return (
        <CollapsibleSection
            title="Informations de base"
            icon={<MaterialIcons name="directions-car" size={24} color="#3B82F6" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <View style={styles.inputGrid}>
                <CustomPicker
                    label="Marque *"
                    selectedValue={selectedBrand}
                    // @ts-ignore
                    onValueChange={(brand) => {
                        setSelectedBrand(brand);
                        setFieldValue('brand', brand);
                        setFieldValue('model', '');
                    }}
                    items={Object.keys(CarData.brands)}
                    placeholder="Sélectionner une marque..."
                    error={errors.brand}
                    touched={touched.brand}
                />

                <CustomPicker
                    label="Modèle *"
                    selectedValue={values.model}
                    onValueChange={(model: any) => setFieldValue('model', model)}
                    // @ts-ignore
                    items={selectedBrand && CarData.brands[selectedBrand]?.models || []}
                    placeholder="Sélectionner un modèle..."
                    error={errors.model}
                    touched={touched.model}
                />

                <CustomFloatingInput
                    label="Année *"
                    onChangeText={handleChange('year')}
                    onBlur={handleBlur('year')}
                    value={values.year}
                    keyboardType="numeric"
                    error={errors.year}
                    touched={touched.year}
                />

                <CustomPicker
                    label="Type de véhicule *"
                    selectedValue={values.type}
                    // @ts-ignore
                    onValueChange={(type) => setFieldValue('type', type)}
                    items={CarData.vehicleTypes}
                    placeholder="Sélectionner un type..."
                    error={errors.type}
                    touched={touched.type}
                />

                <CustomFloatingInput
                    label="Prix par jour (FCFA) *"
                    onChangeText={handleChange('pricePerDay')}
                    onBlur={handleBlur('pricePerDay')}
                    value={values.pricePerDay}
                    keyboardType="numeric"
                    error={errors.pricePerDay}
                    touched={touched.pricePerDay}
                />

                <CustomFloatingInput
                    label="Nombre de passagers *"
                    onChangeText={handleChange('passenger')}
                    onBlur={handleBlur('passenger')}
                    value={values.passenger}
                    keyboardType="numeric"
                    error={errors.passenger}
                    touched={touched.passenger}
                />

                <CustomFloatingInput
                    label="Plaque d'immatriculation *"
                    onChangeText={handleChange('license_plate')}
                    onBlur={handleBlur('license_plate')}
                    value={values.license_plate}
                    error={errors.license_plate}
                    touched={touched.license_plate}
                />

                <CustomFloatingInput
                    label="VIN (optionnel)"
                    onChangeText={handleChange('vin')}
                    onBlur={handleBlur('vin')}
                    value={values.vin}
                    error={errors.vin}
                    touched={touched.vin}
                />

                <CustomPicker
                    label="Couleur *"
                    selectedValue={values.color}
                    // @ts-ignore
                    onValueChange={(color) => setFieldValue('color', color)}
                    items={CarData.colors}
                    placeholder="Sélectionner une couleur..."
                    error={errors.color}
                    touched={touched.color}
                />

                <CustomPicker
                    label="Transmission *"
                    selectedValue={values.transmission}
                    // @ts-ignore
                    onValueChange={(transmission) => setFieldValue('transmission', transmission)}
                    items={CarData.transmissionTypes}
                    placeholder="Type de transmission..."
                    error={errors.transmission}
                    touched={touched.transmission}
                />

                <CustomFloatingInput
                    label="Description *"
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    multiline={true}
                    error={errors.description}
                    touched={touched.description}
                />
            </View>
        </CollapsibleSection>
    );
};

const styles = StyleSheet.create({
    inputGrid: {
        gap: 16,
    },
});
