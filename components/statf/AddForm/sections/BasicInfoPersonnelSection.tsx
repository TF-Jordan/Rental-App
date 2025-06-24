import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomPicker from '../../../General/Forms/CustomPicker';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import { PersonnelData } from '../personnelValidationSchema';



// @ts-ignore
export default class BasicInfoPersonnelSection extends React.Component<{
    values: any,
    errors: any,
    touched: any,
    handleChange: any,
    handleBlur: any,
    setFieldValue: any,
    selectedDepartement: any,
    setSelectedDepartement: any,
    isExpanded: any,
    onToggle: any
}> {
    render() {
        let {
            values, errors, touched, handleChange, handleBlur,
            setFieldValue, selectedDepartement, setSelectedDepartement,
            isExpanded, onToggle
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
                        label="Nom *"
                        onChangeText={handleChange('nom')}
                        onBlur={handleBlur('nom')}
                        value={values.nom}
                        error={errors.nom}
                        touched={touched.nom}
                    />

                    <CustomFloatingInput
                        label="Prénom *"
                        onChangeText={handleChange('prenom')}
                        onBlur={handleBlur('prenom')}
                        value={values.prenom}
                        error={errors.prenom}
                        touched={touched.prenom}
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
                        label="Téléphone *"
                        onChangeText={handleChange('telephone')}
                        onBlur={handleBlur('telephone')}
                        value={values.telephone}
                        keyboardType="phone-pad"
                        error={errors.telephone}
                        touched={touched.telephone}
                    />

                    <CustomFloatingInput
                        label="Adresse *"
                        onChangeText={handleChange('adresse')}
                        onBlur={handleBlur('adresse')}
                        value={values.adresse}
                        multiline={true}
                        error={errors.adresse}
                        touched={touched.adresse}
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