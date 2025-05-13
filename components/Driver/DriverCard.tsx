import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';
import { DriverProps } from "@/utils/types/DriverProps";
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DriverCard = ({ driver }: { driver: DriverProps }) => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: driver.photo || 'https://via.placeholder.com/300x150' }}
                style={styles.image}
                resizeMode="cover"
            />

            <BlurView  reducedTransparencyFallbackColor="white" intensity={50} tint="light" style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <FontAwesome5 name="user" size={18} color="#333" style={styles.icon} />
                    <Text style={styles.name}>
                        {driver.first_name} {driver.last_name}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Feather name="calendar" size={18} color="#555" style={styles.icon} />
                    <Text style={styles.age}>{driver.age} ans</Text>
                </View>

                <View style={styles.infoRow}>
                    <MaterialIcons name="phone" size={18} color="#555" style={styles.icon} />
                    <Text style={styles.contact}>{driver.phone}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Link href={`/drivers/${driver.id}`} asChild>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Voir plus</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.9,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
    },
    infoContainer: {
        padding: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },
    icon: {
        marginRight: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    age: {
        fontSize: 16,
        color: '#555',
    },
    contact: {
        fontSize: 14,
        color: '#666',
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
});

export default DriverCard;
