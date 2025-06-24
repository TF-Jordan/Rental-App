import React from 'react';
import { View } from 'react-native';
import PersonalInfoSection from './PersonalInfoSection';
import LicenseSection from './LicenseSection';
import ContactSection from './ContactSection';
import DriverDocumentsSection from './DriverDocumentsSection';





// @ts-ignore
const DriverFormSections = ({values, errors, touched, handleChange, handleBlur, setFieldValue, expandedSections, toggleSection}: object) => {
    return (
        <View>
            <PersonalInfoSection
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.personal}
                onToggle={() => toggleSection('personal')}
            />

            <LicenseSection
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.license}
                onToggle={() => toggleSection('license')}
            />

            <ContactSection
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.contact}
                onToggle={() => toggleSection('contact')}
            />

            <DriverDocumentsSection
                values={values}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.documents}
                onToggle={() => toggleSection('documents')}
            />
        </View>
    );
};

export default DriverFormSections;