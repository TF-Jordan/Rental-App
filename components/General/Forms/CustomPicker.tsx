import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


/**
 * CustomPicker
 *
 * Composant personnalisé basé sur `@react-native-picker/picker` pour afficher une liste déroulante
 * avec une étiquette, un message d'erreur, et un style cohérent avec le reste des champs de formulaire.
 *
 * Particulièrement adapté à une intégration avec Formik ou tout autre système de formulaire réactif.
 *
 * @param {string} label - Libellé affiché au-dessus du picker.
 * @param {string | number} selectedValue - Valeur actuellement sélectionnée.
 * @param {(value: string | number) => void} onValueChange - Fonction appelée lors d’un changement de valeur.
 * @param {Array<string | number>} items - Liste des valeurs disponibles à choisir.
 * @param {string} placeholder - Texte du premier élément, souvent utilisé comme instruction.
 * @param {string} [error] - Message d'erreur à afficher en dessous du champ.
 * @param {boolean} [touched] - Indique si le champ a été touché (utile pour gérer l'affichage des erreurs).
 *
 * @example
 * <CustomPicker
 *   label="Marque"
 *   selectedValue={values.brand}
 *   onValueChange={(val) => setFieldValue('brand', val)}
 *   items={['Toyota', 'Honda', 'Ford']}
 *   placeholder="Sélectionnez une marque"
 *   error={errors.brand}
 *   touched={touched.brand}
 * />
 */



// @ts-ignore
export default function CustomPicker({label, selectedValue, onValueChange, items, placeholder, error, touched
                      }){
    // @ts-ignore
    return (
        <View style={styles.pickerContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={[styles.pickerWrapper, error && touched && styles.inputError]}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    style={styles.picker}
                >
                    <Picker.Item label={placeholder} value="" color="#9CA3AF"/>
                    {items.map((item: unknown) => (
                        // @ts-ignore
                        <Picker.Item key={item} label={item} value={item}/>
                    ))}
                </Picker>
            </View>
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        marginBottom: 4,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    inputError: {
        borderColor: '#EF4444',
        borderWidth: 2,
    },
    errorText: {
        fontSize: 12,
        color: '#EF4444',
        marginTop: 4,
        marginLeft: 4,
    },
});
