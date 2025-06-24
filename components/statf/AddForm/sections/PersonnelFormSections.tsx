// sections/PersonnelFormSections.tsx
import React from 'react';
import { View } from 'react-native';
import BasicInfoPersonnelSection from './BasicInfoPersonnelSection';
import ProfessionalInfoSection from './ProfessionalInfoSection';
import CompetencesSection from './CompetencesSection';
import PersonnelDocumentsSection from './PersonnelDocumentsSection';

// @ts-ignore
const PersonnelFormSections = ({values, errors, touched, handleChange, handleBlur, setFieldValue, selectedDepartement, setSelectedDepartement, expandedSections, toggleSection}: object) => {
    return (
        <View>
            <BasicInfoPersonnelSection
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                selectedDepartement={selectedDepartement}
                setSelectedDepartement={setSelectedDepartement}
                isExpanded={expandedSections.basic}
                onToggle={() => toggleSection('basic')}
            />

            <ProfessionalInfoSection
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                selectedDepartement={selectedDepartement}
                setSelectedDepartement={setSelectedDepartement}
                isExpanded={expandedSections.professional}
                onToggle={() => toggleSection('professional')}
            />

            <CompetencesSection
                values={values}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.competences}
                onToggle={() => toggleSection('competences')}
            />

            <PersonnelDocumentsSection
                values={values}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.documents}
                onToggle={() => toggleSection('documents')}
            />
        </View>
    );
};

export default PersonnelFormSections;