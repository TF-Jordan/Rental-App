import React from 'react';
import { View } from 'react-native';
import BasicAgencyInfoSection from './BasicAgencyInfoSection';
import ContactInfoSection from './ContactInfoSection';
import MediaSection from './MediaSection';

class AgencyFormSections extends React.Component<{
    values: any,
    errors: any,
    touched: any,
    handleChange: any,
    handleBlur: any,
    setFieldValue: any,
    expandedSections: any,
    toggleSection: any
}> {
    render() {
        let {
            values, errors, touched, handleChange, handleBlur, setFieldValue, expandedSections, toggleSection
        } = this.props;
        return (
            <View>
                <BasicAgencyInfoSection
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    isExpanded={expandedSections.basic}
                    onToggle={() => toggleSection('basic')}
                />

                <ContactInfoSection
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    isExpanded={expandedSections.contact}
                    onToggle={() => toggleSection('contact')}
                />

                <MediaSection
                    values={values}
                    setFieldValue={setFieldValue}
                    isExpanded={expandedSections.media}
                    onToggle={() => toggleSection('media')}
                />
            </View>
        );
    }
}

export default AgencyFormSections;
