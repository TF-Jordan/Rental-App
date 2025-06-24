// sections/ProfessionalInfoSection.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomPicker from '../../../General/Forms/CustomPicker';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import { PersonnelData } from '../personnelValidationSchema';

// @ts-ignore
class ProfessionalInfoSection extends React.Component<{
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
            values, errors, touched, handleChange, handleBlur, setFieldValue,
            selectedDepartement, setSelectedDepartement, isExpanded, onToggle
        } = this.props;
        return (
            <CollapsibleSection
                title="Informations professionnelles"
                icon={<MaterialIcons name="work" size={24} color="#3B82F6"/>}
                isExpanded={isExpanded}
                onToggle={onToggle}
            >
                <View style={styles.inputGrid}>
                    <CustomPicker
                        label="Département *"
                        selectedValue={selectedDepartement}
                        // @ts-ignore
                        onValueChange={(dept) => {
                            setSelectedDepartement(dept);
                            setFieldValue('departement', dept);
                        }}
                        items={PersonnelData.departements}
                        placeholder="Sélectionner un département..."
                        error={errors.departement}
                        touched={touched.departement}
                    />

                    <CustomPicker
                        label="Poste *"
                        selectedValue={values.poste}
                        onValueChange={(poste: any) => setFieldValue('poste', poste)}
                        items={PersonnelData.postes}
                        placeholder="Sélectionner un poste..."
                        error={errors.poste}
                        touched={touched.poste}
                    />

                    <CustomFloatingInput
                        label="Date d'embauche *"
                        onChangeText={handleChange('dateEmbauche')}
                        onBlur={handleBlur('dateEmbauche')}
                        value={values.dateEmbauche}
                        placeholder="JJ/MM/AAAA"
                        error={errors.dateEmbauche}
                        touched={touched.dateEmbauche}
                    />

                    <CustomFloatingInput
                        label="Salaire (FCFA) *"
                        onChangeText={handleChange('salaire')}
                        onBlur={handleBlur('salaire')}
                        value={values.salaire}
                        keyboardType="numeric"
                        error={errors.salaire}
                        touched={touched.salaire}
                    />

                    <CustomPicker
                        label="Statut *"
                        selectedValue={values.statut}
                        // @ts-ignore
                        onValueChange={(statut) => setFieldValue('statut', statut)}
                        items={PersonnelData.statuts}
                        placeholder="Sélectionner un statut..."
                        error={errors.statut}
                        touched={touched.statut}
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

export default ProfessionalInfoSection;