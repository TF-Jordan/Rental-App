import { ScrollView, Text, View, StyleSheet ,Image} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import driversData from '@/assets/Drivers/drivers.json';
import {DriverProps as Driver} from "@/utils/types/DriverProps";




export default function DriverDetails() {
    const { id } = useLocalSearchParams();
    const driver = driversData.find(d => d.id === id) as unknown as Driver;

    if (!driver) return <Text>Conducteur non trouvé</Text>;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: driver.photo || 'https://via.placeholder.com/150' }}
                    style={styles.avatar}
                />
                <Text style={styles.title}>
                    {driver.first_name} {driver.last_name}
                </Text>
                <Text style={styles.subtitle}>{driver.age} ans</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Coordonnées</Text>
                <Text>📞 {driver.phone}</Text>
                <Text>📧 {driver.email}</Text>
                <Text>🏠 {driver.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Permis de conduire</Text>
                <Text>Numéro: {driver.license_number}</Text>
                <Text>Catégorie: {driver.license_type}</Text>
            </View>

            {driver.documents && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Documents</Text>
                    <Text>CNI: {driver.documents.id_card}</Text>
                    <Text>Permis: {driver.documents.driver_licence}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
    section: {
        marginBottom: 25,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
        marginBottom: 10,
    },
});