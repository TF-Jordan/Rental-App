import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
/**
 * CustomSwitch
 * -------------
 * Ce composant React Native représente un interrupteur (switch) personnalisé,
 * accompagné d'une étiquette (label) et éventuellement d'une icône.
 * Il est conçu pour être réutilisable et personnalisable dans différentes parties d'une application mobile.
 *
 * Props :
 * - label (string) : Texte affiché à côté de l'icône pour décrire l'interrupteur.
 * - value (boolean) : État actuel du switch (true ou false). Contrôle si le switch est activé ou non.
 * - onValueChange (function) : Fonction appelée lorsqu'on change l'état du switch (toggle).
 * - icon (React.ReactNode) : Élément React représentant une icône, affichée à gauche du label.
 *
 * Exemple d'utilisation :
 * ```tsx
 * import { CustomSwitch } from './CustomSwitch';
 * import { Feather } from '@expo/vector-icons';
 *
 * export default function SettingsScreen() {
 *   const [isEnabled, setIsEnabled] = useState(false);
 *
 *   return (
 *     <CustomSwitch
 *       label="Activer les notifications"
 *       value={isEnabled}
 *       onValueChange={(newValue) => setIsEnabled(newValue)}
 *       icon={<Feather name="bell" size={20} color="#3B82F6" />}
 *     />
 *   );
 * }
 * ```
 *
 * Fonctionnement :
 * - L'icône est affichée dans un cercle bleu clair à gauche.
 * - Le texte (label) s'affiche à côté de l’icône.
 * - Le switch est aligné à droite, avec des couleurs personnalisées pour Android/iOS.
 * - Le conteneur a un fond gris très clair avec une bordure.
 */




// @ts-ignore
export default function CustomSwitch({ label, value, onValueChange, icon }){
    return(<View style={styles.customSwitchContainer}>
        <View style={styles.switchLeft}>
            <View style={styles.switchIcon}>
                {icon}
            </View>
            <Text style={styles.switchLabel}>{label}</Text>
        </View>
        <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
            thumbColor={value ? '#FFFFFF' : '#9CA3AF'}
            ios_backgroundColor="#E5E7EB"
        />
    </View>
)};

const styles = StyleSheet.create({
    customSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    switchLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    switchIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EBF4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    switchLabel: {
        fontSize: 15,
        color: '#374151',
        fontWeight: '500',
        flex: 1,
    },
});
