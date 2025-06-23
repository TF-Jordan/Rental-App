import React from 'react';
import { View } from 'react-native';
import BasicInfoSection from './BasicInfoSection';
import EngineSection from './EngineSection';
import FeaturesSection from './FeaturesSection';
import DocumentsSection from "./DocumentSection";



// @ts-ignore
const VehicleFormSections = ({values, errors, touched, handleChange, handleBlur, setFieldValue, selectedBrand, setSelectedBrand, expandedSections, toggleSection
                             }: object) => {
    return (
        <View>
            <BasicInfoSection
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                isExpanded={expandedSections.basic}
                onToggle={() => toggleSection('basic')}
            />

            <EngineSection
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.engine}
                onToggle={() => toggleSection('engine')}
            />

            <FeaturesSection
                values={values}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.features}
                onToggle={() => toggleSection('features')}
            />

            <DocumentsSection
                values={values}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.document}
                onToggle={() => toggleSection('document')}
            />
        </View>
    );
};

export default VehicleFormSections;
