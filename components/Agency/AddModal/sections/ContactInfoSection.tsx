
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';

class ContactInfoSection extends React.Component<{
    values: any,
    errors: any,
    touched: any,
    handleChange: any,
    handleBlur: any,
    isExpanded: any,
    onToggle: any
}> {
    render() {
        let {
            values, errors, touched, handleChange, handleBlur, isExpanded, onToggle
        } = this.props;
        return (
            <CollapsibleSection
                title="Informations de contact"
                icon={<MaterialIcons name="location-on" size={24} color="#3B82F6"/>}
                isExpanded={isExpanded}
                onToggle={onToggle}
            >
                <View style={styles.inputGrid}>
                    <CustomFloatingInput
                        label="Ville *"
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        value={values.city}
                        error={errors.city}
                        touched={touched.city}
                    />

                    <CustomFloatingInput
                        label="Quartier *"
                        onChangeText={handleChange('quater')}
                        onBlur={handleBlur('quater')}
                        value={values.quater}
                        error={errors.quater}
                        touched={touched.quater}
                    />

                    <CustomFloatingInput
                        label="Heure d'ouverture *"
                        onChangeText={handleChange('openingTime')}
                        onBlur={handleBlur('openingTime')}
                        value={values.openingTime}
                        placeholder="Ex: 08:00"
                        error={errors.openingTime}
                        touched={touched.openingTime}
                    />

                    <CustomFloatingInput
                        label="Heure de fermeture *"
                        onChangeText={handleChange('closingTime')}
                        onBlur={handleBlur('closingTime')}
                        value={values.closingTime}
                        placeholder="Ex: 18:00"
                        error={errors.closingTime}
                        touched={touched.closingTime}
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

export default ContactInfoSection;
