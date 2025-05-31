import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, useWindowDimensions} from 'react-native';
import { Link } from 'expo-router';
import { BlurView } from 'expo-blur';
import { DriverProps } from "@/utils/types/DriverProps";
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import StarRating from "@/components/General/StarRating";
import {getDriverStatusInfo} from '@/assets/Drivers/DriverProperty'







const {width,height}=Dimensions.get('window');
export default function DriverCard({ driver }: { driver: DriverProps }){



    const statusInfo = getDriverStatusInfo(driver.status);

    return (
        <View style={styles.card}>
            <ImageBackground
                source={{ uri: driver.photo || 'https://via.placeholder.com/300x150' }}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                {/* Badge de statut en haut à gauche */}
                <View style={styles.statusContainer}>
                    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
                        <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
                        <Text style={styles.statusText}>{statusInfo.text}</Text>
                    </View>
                </View>

                <BlurView
                    intensity={40}
                    tint="light"
                    style={styles.blurContainer}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.infoRow}>
                            <FontAwesome5 name="user" size={18} color="#333" style={styles.icon} />
                            <Text style={styles.name}>
                                {driver.first_name} {driver.last_name}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            {/*composant pour les etoiles*/}
                            <StarRating rating={driver.rating} showNumber={true} />
                        </View>
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
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width,
        height: 400,
        borderRadius: 15,
        overflow: 'hidden',
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
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    blurContainer: {
        padding: 15,
        backgroundColor: 'rgb(255,255,255)',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    statusContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});