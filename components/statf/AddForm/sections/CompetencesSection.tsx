// sections/CompetencesSection.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CollapsibleSection from '../../../General/Forms/CollapsibleSection';
import CustomSwitch from '../../../General/Forms/CustomSwitch';
import { competenceKeys, getCompetenceIcon, getCompetenceLabel } from '../personnelValidationSchema';

// @ts-ignore
const CompetencesSection = ({ values, setFieldValue, isExpanded, onToggle }) => {
    return (
        <CollapsibleSection
            title="Compétences & Expertise"
            icon={<MaterialIcons name="psychology" size={24} color="#3B82F6" />}
            isExpanded={isExpanded}
            onToggle={onToggle}
        >
            <View style={styles.competencesGrid}>
                {competenceKeys.map((competence) => (
                    <CustomSwitch
                        key={competence}
                        label={getCompetenceLabel(competence)}
                        value={values[competence]}
                        onValueChange={(value: any) => setFieldValue(competence, value)}
                        icon={getCompetenceIcon(competence)}
                    />
                ))}
            </View>
        </CollapsibleSection>
    );
};

const styles = StyleSheet.create({
    competencesGrid: {
        gap: 12,
    },
});

export default CompetencesSection;