import React from 'react';
import { View } from 'react-native';
import BasicInfoSection from './BasicInfoSection';
import EngineSection from './EngineSection';
import FeaturesSection from './FeaturesSection';
import DocumentsSection from "./DocumentSection";

/**
 * VehicleFormSections
 *
 * Composant principal qui regroupe et structure les différentes sections du
 * formulaire de véhicule : Informations de base, Moteur, Fonctionnalités.
 *
 * Il est conçu pour être utilisé avec une bibliothèque de gestion de formulaire
 * comme Formik, et il est optimisé pour fonctionner avec une logique d'expansion
 * (collapse/expand) de sections.
 *
 * Ce composant sert de **container** logique et visuel aux sous-sections :
 * - `BasicInfoSection` : Détails généraux du véhicule (marque, modèle, année, etc.)
 * - `EngineSection` : Informations liées au moteur (puissance, carburant, etc.)
 * - `FeaturesSection` : Options/fonctionnalités disponibles (GPS, climatisation, etc.)
 *
 * @param {object} props - Propriétés nécessaires pour gérer le formulaire et l'affichage :
 *
 * - `values` (object) : Toutes les valeurs du formulaire (Formik state).
 * - `errors` (object) : Messages d’erreur pour chaque champ.
 * - `touched` (object) : Indicateurs des champs visités (utile pour valider à la sortie de champ).
 * - `handleChange` (function) : Fonction fournie par Formik pour modifier les valeurs des champs.
 * - `handleBlur` (function) : Fonction appelée lors de la perte de focus sur un champ.
 * - `setFieldValue` (function) : Fonction pour modifier manuellement un champ spécifique.
 *
 * - `selectedBrand` (string) : Marque actuellement sélectionnée, utilisée dans `BasicInfoSection`.
 * - `setSelectedBrand` (function) : Fonction pour mettre à jour la marque sélectionnée.
 *
 * - `expandedSections` (object) : Contient l’état d’expansion de chaque section (ex: `{ basic: true, engine: false, ... }`).
 * - `toggleSection` (function) : Fonction pour ouvrir/fermer une section spécifique. Utilisée dans chaque `onToggle`.
 *
 * Ce composant permet une séparation claire des responsabilités par section,
 * ce qui rend le formulaire plus lisible, modulaire et maintenable.
 * /**
 *  * ------------------------------------------------------------
 *  * 📄 DOCUMENTATION : AJOUT D'UN NOUVEAU CHAMP AU FORMULAIRE
 *  * ------------------------------------------------------------
 *  *
 *  * Cette documentation décrit la procédure complète pour ajouter
 *  * un nouveau champ dans un formulaire React Native utilisant Formik.
 *  * Elle est valable pour n’importe quel type de champ : texte, switch,
 *  * date, fichier, etc.
 *  *
 *  * ------------------------------------------------------------
 *  * 🧩 1. Déclaration du champ dans initialValues
 *  * ------------------------------------------------------------
 *  * Dans le fichier contenant les valeurs initiales du formulaire,
 *  * ajouter une propriété correspondant au nouveau champ :
 *  *
 *  * Exemple :
 *  * const initialValues = {
 *  *   nom: '',
 *  *   marque: '',
 *  *   nouveauChamp: '', // <-- nouveau champ
 *  * };
 *  *
 *  * ------------------------------------------------------------
 *  * 🧱 2. Ajout visuel dans une section du formulaire
 *  * ------------------------------------------------------------
 *  * Dans le composant qui représente la section du formulaire
 *  * (ex: BasicInfoSection.tsx), ajouter un élément visuel pour ce champ :
 *  *
 *  * Exemple pour un champ texte :
 *  *
 *  * <Text style={styles.label}>Nouveau Champ</Text>
 *  * <TextInput
 *  *   style={styles.input}
 *  *   onChangeText={handleChange('nouveauChamp')}
 *  *   onBlur={handleBlur('nouveauChamp')}
 *  *   value={values.nouveauChamp}
 *  * />
 *  * {touched.nouveauChamp && errors.nouveauChamp && (
 *  *   <Text style={styles.error}>{errors.nouveauChamp}</Text>
 *  * )}
 *  *
 *  * Pour un autre type de champ (Picker, Switch, DocumentPicker, etc.),
 *  * adapter l’élément d’interface en conséquence.
 *  *
 *  * ------------------------------------------------------------
 *  * 📦 3. Passage des props Formik
 *  * ------------------------------------------------------------
 *  * Le composant de la section doit recevoir les props Formik nécessaires :
 *  *
 *  * const SectionX = ({
 *  *   values,
 *  *   errors,
 *  *   touched,
 *  *   handleChange,
 *  *   handleBlur,
 *  *   ...
 *  * }) => { ... }
 *  *
 *  * Cela garantit que le champ peut interagir correctement avec Formik.
 *  *
 *  * ------------------------------------------------------------
 *  * 📘 4. Ajout au schéma de validation (Yup)
 *  * ------------------------------------------------------------
 *  * Si une validation est utilisée via Yup :
 *  *
 *  * const validationSchema = Yup.object().shape({
 *  *   nouveauChamp: Yup.string().required("Champ requis"),
 *  *   // adapter selon le type (string, number, boolean, etc.)
 *  * });
 *  *
 *  * ------------------------------------------------------------
 *  * 🚀 5. Utilisation dans la soumission
 *  * ------------------------------------------------------------
 *  * Dans la fonction `onSubmit`, le champ est automatiquement inclus
 *  * dans l’objet `values` :
 *  *
 *  * const handleSubmit = (values) => {
 *  *   console.log(values.nouveauChamp);
 *  *   // envoyer à l’API, traiter, etc.
 *  * };
 *  *
 *  * ------------------------------------------------------------
 *  * 🧱 6. (Facultatif) Ajout dans une nouvelle section avec pliage
 *  * ------------------------------------------------------------
 *  * Si tu veux créer une nouvelle section pour ce champ :
 *  * 1. Créer un fichier ex: DocumentSection.tsx
 *  * 2. Intégrer cette section dans `VehicleFormSections.tsx` :
 *  *
 *  * <DocumentSection
 *  *   values={values}
 *  *   handleChange={handleChange}
 *  *   handleBlur={handleBlur}
 *  *   setFieldValue={setFieldValue}
 *  *   isExpanded={expandedSections.documents}
 *  *   onToggle={() => toggleSection('documents')}
 *  * />
 *  *
 *  * 3. Ajouter "documents: true/false" dans `expandedSections`
 *  *    pour contrôler son affichage.
 *  *
 *  * ------------------------------------------------------------
 *  * 🧪 Exemple : champ "couleur"
 *  * ------------------------------------------------------------
 *  * // initialValues :
 *  * couleur: '',
 *  *
 *  * // validationSchema :
 *  * couleur: Yup.string().required('Couleur obligatoire'),
 *  *
 *  * // dans l’interface :
 *  * <TextInput
 *  *   onChangeText={handleChange('couleur')}
 *  *   onBlur={handleBlur('couleur')}
 *  *   value={values.couleur}
 *  * />
 *  *
 *  * ------------------------------------------------------------
 *  * 🔁 Résumé des étapes
 *  * ------------------------------------------------------------
 *  * 1. Déclarer dans initialValues
 *  * 2. Ajouter l’élément visuel dans l’UI
 *  * 3. Passer les props Formik (values, errors, etc.)
 *  * 4. Ajouter dans Yup si utilisé
 *  * 5. Gérer dans la fonction de soumission
 *  * 6. (Optionnel) Créer une section dédiée
 *  *
 *  */






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
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                isExpanded={expandedSections.documents}
                onToggle={() => toggleSection('documents')}
            />
        </View>
    );
};

export default VehicleFormSections;
