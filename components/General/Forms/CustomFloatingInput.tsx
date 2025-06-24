import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';


/**
 * CustomFloatingInput
 *
 * Composant personnalisé basé sur `react-native-floating-label-input` pour un champ de formulaire
 * avec label flottant, gestion des erreurs, et support des champs multilignes.
 *
 * Utile dans les formulaires gérés par Formik, ou dans toute interface utilisateur nécessitant
 * une saisie avec un feedback visuel propre et cohérent.
 *
 * @param {string} label - Libellé flottant du champ de saisie.
 * @param {function} onChangeText - Fonction appelée lors de la modification du texte.
 * @param {function} onBlur - Fonction appelée lors de la perte de focus.
 * @param {string} value - Valeur actuelle du champ.
 * @param {'default' | 'numeric' | 'email-address' | 'phone-pad' | string} [keyboardType] - Type de clavier à afficher.
 * @param {boolean} [multiline=false] - Si le champ peut être multilignes (type textarea).
 * @param {string} [error] - Message d'erreur à afficher.
 * @param {boolean} [touched] - Indique si le champ a été touché (utile pour afficher les erreurs).
 * @param {object} props - Autres props passées au composant FloatingLabelInput.
 *
 * @example
 * <CustomFloatingInput
 *   label="Nom"
 *   value={values.name}
 *   onChangeText={handleChange('name')}
 *   onBlur={handleBlur('name')}
 *   error={errors.name}
 *   touched={touched.name}
 * />
 */



// @ts-ignore
const CustomFloatingInput = ({label, onChangeText, onBlur, value, keyboardType = 'default', multiline = false, error, touched, ...props
                             }) => {
    return (
        <View style={styles.inputContainer}>
            <FloatingLabelInput
                label={label}
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                // @ts-ignore
                keyboardType={keyboardType}
                multiline={multiline}
                // @ts-ignore
                containerStyles={[
                    styles.floatingInput,
                    multiline && styles.textAreaInput,
                    error && touched && styles.inputError
                ]}
                labelStyles={styles.floatingLabel}
                // @ts-ignore
                inputStyles={[
                    styles.floatingInputText,
                    multiline && styles.textAreaText
                ]}
                {...props}
            />
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 4,
    },
    floatingInput: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        backgroundColor: 'white',
        minHeight: 50,
    },
    floatingLabel: {
        color: '#6B7280',
        fontSize: 14,
    },
    floatingInputText: {
        color: '#1F2937',
        fontSize: 16,
    },
    textAreaInput: {
        minHeight: 100,
    },
    textAreaText: {
        textAlignVertical: 'top',
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

export default CustomFloatingInput;