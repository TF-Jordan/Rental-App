import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import CustomPicker from '../../../General/Forms/CustomPicker';
import { DriverData } from '../driverValidationSchema';

// @ts-ignore
class LicenseSection extends React.Component<{
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
                title="Informations de permis"
                icon={<MaterialIcons name="credit-card" size={24} color="#3B82F6"/>}
                isExpanded={isExpanded}
                onToggle={onToggle}
            >
                <View style={styles.inputGrid}>
                    <CustomFloatingInput
                        label="Numéro de permis *"
                        onChangeText={handleChange('license_number')}
                        onBlur={handleBlur('license_number')}
                        value={values.license_number}
                        error={errors.license_number}
                        touched={touched.license_number}
                    />

                    <CustomPicker
                        label="Type de permis *"
                        selectedValue={values.license_type}
                        onValueChange={(type: any) => setFieldValue('license_type', type)}
                        items={DriverData.licenseTypes}
                        placeholder="Sélectionner un type de permis..."
                        error={errors.license_type}
                        touched={touched.license_type}
                    />

                    <CustomFloatingInput
                        label="Fournisseur d'assurance *"
                        onChangeText={handleChange('insurance_provider')}
                        onBlur={handleBlur('insurance_provider')}
                        value={values.insurance_provider}
                        error={errors.insurance_provider}
                        touched={touched.insurance_provider}
                    />

                    <CustomFloatingInput
                        label="Police d'assurance *"
                        onChangeText={handleChange('insurance_policy')}
                        onBlur={handleBlur('insurance_policy')}
                        value={values.insurance_policy}
                        error={errors.insurance_policy}
                        touched={touched.insurance_policy}
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

export default LicenseSection;
