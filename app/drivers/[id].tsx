
import { ScrollView, Text, StyleSheet ,View} from 'react-native';
import { useLocalSearchParams ,Stack} from 'expo-router';
import driversData from '@/assets/Drivers/drivers.json';
import { DriverProps as Driver } from "@/utils/types/DriverProps";
import { getDriverStatusInfo } from '@/assets/Drivers/DriverProperty';

// Import des composants
import DriverHeader from '@/components/Driver/Details/DriverHeader';
import DriverContactSection from '@/components/Driver/Details/DriverContactSection';
import DriverLicenseSection from '@/components/Driver/Details/DriverLicenseSection';
import DriverDocumentsSection from '@/components/Driver/Details/DriverDocumentsSection';
import DriverCalendarSection from '@/components/Driver/Details/DriverCalendarSection';

export default function DriverDetails() {
    const { id } = useLocalSearchParams();
    const driver = driversData.find(d => d.id === id) as unknown as Driver;

    if (!driver) return <Text>Conducteur non trouvé</Text>;

    const statusInfo = getDriverStatusInfo(driver.status);

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,      // Affiche juste la barre avec bouton retour
                    headerTitle: '',         // Pas de titre
                    headerBackTitle: 'Back', // Texte personnalisé
                    headerTransparent: true, // Style optionnel
                }}
            />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header avec gradient */}
            <DriverHeader driver={driver} statusInfo={statusInfo} />

            <View style={styles.contentContainer}>
                {/* Section Coordonnées */}
                <DriverContactSection driver={driver} />

                {/* Section Permis */}
                <DriverLicenseSection driver={driver} />

                {/* Section Documents (conditionelle) */}
                <DriverDocumentsSection driver={driver} />

                {/* Section Calendrier */}
                <DriverCalendarSection driver={driver} />
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});