import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import CustomPicker from '../../../General/Forms/CustomPicker';
import { DriverData } from '../driverValidationSchema';

// @ts-ignore
export default class PersonalInfoSection extends React.Component<{
    values: any,
    errors: any,
    touched: any,
    handleChange: any,
    handleBlur: any,
    setFieldValue: any,
    isExpanded: any,
    onToggle: any
}> {
    render() {
        let {
            values, errors, touched, handleChange, handleBlur, setFieldValue, isExpanded, onToggle
        } = this.props;
        return (
            <CollapsibleSection
                title="Informations personnelles"
                icon={<MaterialIcons name="person" size={24} color="#3B82F6"/>}
                isExpanded={isExpanded}
                onToggle={onToggle}
            >
                <View style={styles.inputGrid}>
                    <CustomFloatingInput
                        label="Prénom *"
                        onChangeText={handleChange('first_name')}
                        onBlur={handleBlur('first_name')}
                        value={values.first_name}
                        error={errors.first_name}
                        touched={touched.first_name}
                    />

                    <CustomFloatingInput
                        label="Nom *"
                        onChangeText={handleChange('last_name')}
                        onBlur={handleBlur('last_name')}
                        value={values.last_name}
                        error={errors.last_name}
                        touched={touched.last_name}
                    />

                    <CustomFloatingInput
                        label="Âge *"
                        onChangeText={handleChange('age')}
                        onBlur={handleBlur('age')}
                        value={values.age}
                        keyboardType="numeric"
                        error={errors.age}
                        touched={touched.age}
                    />

                    <CustomPicker
                        label="Statut *"
                        selectedValue={values.status}
                        onValueChange={(status: any) => setFieldValue('status', status)}
                        items={DriverData.statusOptions}
                        placeholder="Sélectionner un statut..."
                        error={errors.status}
                        touched={touched.status}
                    />
                </View>
            </CollapsibleSection>
        );
    }
}

const styles = StyleSheet.create({
    inputGrid: {
        gap: 16,
    },
});