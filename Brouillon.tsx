import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function MonFormulaire() {
    const [image, setImage] = useState(null);
    const [document, setDocument] = useState(null);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0]); // ou result.uri selon ta version
        }
    };

    const handlePickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
        if (result.type === 'success') {
            setDocument(result);
        }
    };

    const envoyerFormulaire = async (values) => {
        const formData = new FormData();

        // Champs texte de Formik
        formData.append('nom', values.nom);
        formData.append('description', values.description);

        // Image
        if (image) {
            formData.append('photo', {
                uri: image.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
        }

        // Document
        if (document) {
            formData.append('document', {
                uri: document.uri,
                type: document.mimeType || 'application/octet-stream',
                name: document.name,
            });
        }

        try {
            const response = await fetch('http://10.0.2.2:8080/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();
            console.log('Succès:', data);
        } catch (err) {
            console.error('Erreur lors de l’envoi:', err);
        }
    };

    return (
        <Formik
            initialValues={{ nom: '', description: '' }}
            validationSchema={Yup.object({
                nom: Yup.string().required('Nom requis'),
                description: Yup.string().required('Description requise'),
            })}
            onSubmit={(values) => envoyerFormulaire(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                    <Text>Nom</Text>
                    <TextInput
                        onChangeText={handleChange('nom')}
                        onBlur={handleBlur('nom')}
                        value={values.nom}
                    />
                    {touched.nom && errors.nom && <Text>{errors.nom}</Text>}

                    <Text>Description</Text>
                    <TextInput
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                    />
                    {touched.description && errors.description && <Text>{errors.description}</Text>}

                    <Button title="Choisir une image" onPress={handlePickImage} />
                    <Button title="Choisir un document" onPress={handlePickDocument} />
                    <Button title="Envoyer" onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
}
