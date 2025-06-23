import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import CustomPicker from '../../../General/Forms/CustomPicker';
import { DriverData } from '../driverValidationSchema';

// @ts-ignore
class ContactSection extends React.Component<{
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
                title="Informations de contact"
                icon={<MaterialIcons name="contact-phone" size={24} color="#3B82F6"/>}
                isExpanded={isExpanded}
                onToggle={onToggle}
            >
                <View style={styles.inputGrid}>
                    <CustomFloatingInput
                        label="Téléphone *"
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        keyboardType="phone-pad"
                        error={errors.phone}
                        touched={touched.phone}
                    />

                    <CustomFloatingInput
                        label="Email *"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        error={errors.email}
                        touched={touched.email}
                    />

                    <CustomFloatingInput
                        label="Adresse *"
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        multiline={true}
                        error={errors.address}
                        touched={touched.address}
                    />

                    <CustomPicker
                        label="Localisation *"
                        selectedValue={values.location}
                        onValueChange={(location: any) => setFieldValue('location', location)}
                        items={DriverData.locations}
                        placeholder="Sélectionner une ville..."
                        error={errors.location}
                        touched={touched.location}
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

export default ContactSection;
