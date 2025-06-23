import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomPicker from '../../../General/Forms/CustomPicker';
import CustomFloatingInput from '../../../General/Forms/CustomFloatingInput';
import { agencyTypes } from '../agencyValidationSchema';


class BasicAgencyInfoSection extends React.Component<{
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
                title="Informations de base"
                icon={<MaterialIcons name="business" size={24} color="#3B82F6"/>}
                isExpanded={isExpanded}
                onToggle={onToggle}
            >
                <View style={styles.inputGrid}>
                    <CustomFloatingInput
                        label="Nom de l'agence *"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        error={errors.name}
                        touched={touched.name}
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

                    <CustomFloatingInput
                        label="Slogan *"
                        onChangeText={handleChange('slogan')}
                        onBlur={handleBlur('slogan')}
                        value={values.slogan}
                        error={errors.slogan}
                        touched={touched.slogan}
                    />

                    <CustomPicker
                        label="Type d'agence *"
                        selectedValue={values.type}
                        onValueChange={(type: any) => setFieldValue('type', type)}
                        items={agencyTypes}
                        placeholder="Sélectionner un type..."
                        error={errors.type}
                        touched={touched.type}
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

export default BasicAgencyInfoSection;
