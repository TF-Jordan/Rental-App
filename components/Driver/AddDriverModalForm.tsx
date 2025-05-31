import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { FloatingLabelInput } from 'react-native-floating-label-input';

const carData: Record<string, Record<string, number[]>> = {
    Toyota: {
        Corolla: [2015, 2016, 2017, 2018],
        Camry: [2018, 2019, 2020],
    },
    Honda: {
        Civic: [2016, 2017],
        Accord: [2017, 2018, 2019],
    },
};

const licenseByCountry: Record<string, string[]> = {
    Cameroon: ['A', 'B', 'C', 'D', 'E'],
    France: ['AM', 'A1', 'A2', 'B', 'C', 'D'],
};

const allYears: number[] = Object.values(carData)
    .flatMap((models) => Object.values(models).flat());

const validationSchema = Yup.object().shape({
    age: Yup.number()
        .required("L'âge est obligatoire")
        .typeError("L'âge doit être un nombre")
        .integer("L'âge doit être un entier")
        .min(18, "L'âge doit être au moins 18 ans")
        .max(100, "L'âge doit être inférieur à 100"),
    brand: Yup.string().required('La marque est obligatoire'),
    first_name: Yup.string().required('Le prénom est obligatoire'),
    last_name: Yup.string().required('Le nom est obligatoire'),
    license_number: Yup.string()
        .required('Le numéro de permis est obligatoire')
        .min(3, 'Numéro de permis trop court'),
    license_type: Yup.string().required('Le type de permis est obligatoire'),
    model: Yup.string().required('Le modèle est obligatoire'),
    year: Yup.number()
        .required("L'année est obligatoire")
        .oneOf(allYears, 'Année invalide'),
});

const AddDriverModal: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('Cameroon');

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
                <AntDesign name="pluscircle" size={60} color="#3b82f6" />
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <ScrollView contentContainerStyle={styles.modalContent}>
                    <Text style={styles.title}>Ajouter un Chauffeur</Text>

                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            age: '',
                            license_type: '',
                            license_number: '',
                            brand: '',
                            model: '',
                            year: undefined,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log('Nouveau chauffeur :', values);
                            setModalVisible(false);
                        }}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, handleBlur }) => (
                            <>
                                <FloatingLabelInput
                                    label={'Nom'}
                                    onChangeText={handleChange('first_name')}
                                    onBlur={handleBlur('first_name')}
                                    value={values.first_name}
                                />
                                {errors.first_name && touched.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}

                                <FloatingLabelInput
                                    label={'Prenom'}
                                    onChangeText={handleChange('last_name')}
                                    onBlur={handleBlur('last_name')}
                                    value={values.last_name}
                                />
                                {errors.last_name && touched.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}

                                <FloatingLabelInput
                                    label={'Age'}
                                    onChangeText={handleChange('age')}
                                    onBlur={handleBlur('age')}
                                    value={values.age}
                                    keyboardType={'numeric'}
                                />
                                {errors.age && touched.age && <Text style={styles.errorText}>{errors.age}</Text>}

                                <Text>Pays</Text>
                                <Picker
                                    selectedValue={selectedCountry}
                                    onValueChange={(country) => {
                                        setSelectedCountry(country);
                                        setFieldValue('license_type', '');
                                    }}
                                >
                                    {Object.keys(licenseByCountry).map((country) => (
                                        <Picker.Item key={country} label={country} value={country} />
                                    ))}
                                </Picker>

                                <Text>Type de permis</Text>
                                <Picker
                                    selectedValue={values.license_type}
                                    onValueChange={(value) => setFieldValue('license_type', value)}
                                >
                                    <Picker.Item label="Choisir un type..." value="" />
                                    {licenseByCountry[selectedCountry].map((type) => (
                                        <Picker.Item key={type} label={type} value={type} />
                                    ))}
                                </Picker>
                                {errors.license_type && touched.license_type && <Text style={styles.errorText}>{errors.license_type}</Text>}

                                <FloatingLabelInput
                                    label={'Numéro de permis'}
                                    onChangeText={handleChange('license_number')}
                                    onBlur={handleBlur('license_number')}
                                    value={values.license_number}
                                />
                                {errors.license_number && touched.license_number && <Text style={styles.errorText}>{errors.license_number}</Text>}

                                <Text>Marque</Text>
                                <Picker
                                    selectedValue={selectedBrand}
                                    onValueChange={(brand) => {
                                        setSelectedBrand(brand);
                                        setSelectedModel('');
                                        setFieldValue('brand', brand);
                                        setFieldValue('model', '');
                                        setFieldValue('year', undefined);
                                    }}
                                >
                                    <Picker.Item label="Choisir une marque..." value="" />
                                    {Object.keys(carData).map((brand) => (
                                        <Picker.Item key={brand} label={brand} value={brand} />
                                    ))}
                                </Picker>
                                {errors.brand && touched.brand && <Text style={styles.errorText}>{errors.brand}</Text>}

                                <Text>Modèle</Text>
                                <Picker
                                    selectedValue={selectedModel}
                                    enabled={selectedBrand !== ''}
                                    onValueChange={(model) => {
                                        setSelectedModel(model);
                                        setFieldValue('model', model);
                                        setFieldValue('year', undefined);
                                    }}
                                >
                                    <Picker.Item label="Choisir un modèle..." value="" />
                                    {selectedBrand &&
                                        Object.keys(carData[selectedBrand]).map((model) => (
                                            <Picker.Item key={model} label={model} value={model} />
                                        ))}
                                </Picker>
                                {errors.model && touched.model && <Text style={styles.errorText}>{errors.model}</Text>}

                                <Text>Année</Text>
                                <Picker
                                    selectedValue={values.year}
                                    enabled={selectedModel !== ''}
                                    onValueChange={(year) => setFieldValue('year', year)}
                                >
                                    <Picker.Item label="Choisir une année..." value={undefined} />
                                    {selectedBrand &&
                                        selectedModel &&
                                        carData[selectedBrand][selectedModel].map((year) => (
                                            <Picker.Item key={year} label={String(year)} value={year} />
                                        ))}
                                </Picker>
                                {errors.year && touched.year && <Text style={styles.errorText}>{errors.year}</Text>}

                                <View style={{ marginTop: 20 }}>
                                    <Button title="Enregistrer" onPress={handleSubmit as any} />
                                    <Button title="Annuler" onPress={() => setModalVisible(false)} color="red" />
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        zIndex: 10,
    },
    modalContent: {
        padding: 20,
        paddingBottom: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 10,
    },
});

export default AddDriverModal;
