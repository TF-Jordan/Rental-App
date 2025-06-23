import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomSwitch from '../../../General/Forms/CustomSwitch';
import { featureKeys, getFeatureIcon, getFeatureLabel } from '../vehicleValidationSchema';

// @ts-ignore
const FeaturesSection = ({ values, setFieldValue, isExpanded, onToggle }) => {
    return (
        <CollapsibleSection
            title="Fonctionnalités & Équipements"
            icon={<MaterialIcons name="star" size={24} color="#3B82F6" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <View style={styles.featuresGrid}>
                {featureKeys.map((feature) => (
                    <CustomSwitch
                        key={feature}
                        label={getFeatureLabel(feature)}
                        value={values[feature]}
                        onValueChange={(value: any) => setFieldValue(feature, value)}
                        icon={getFeatureIcon(feature)}
                    />
                ))}
            </View>
        </CollapsibleSection>
    );
};

const styles = StyleSheet.create({
    featuresGrid: {
        gap: 12,
    },
});

export default FeaturesSection;
