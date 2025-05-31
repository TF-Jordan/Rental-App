import { Dimensions, View, StyleSheet, Image, Text, Pressable } from "react-native";
import { LocationProps } from "@/utils/types/LocationProps";
import { Colors } from "@/utils/colors";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from "expo-router";

const { width } = Dimensions.get('window');

const LocationCard = ({ location }: { location: LocationProps }) => {
    const formattedPrice = Number(location.price).toLocaleString('fr-FR');

    // @ts-ignore
    return (
        <View style={styles.card}>
            <Link href={`/locations/${location.id}`} asChild>
                <Pressable accessibilityLabel={`Voir détails de la location de ${location.vehicle.brand}`}>
                    <Image
                        source={{ uri: location.vehicle.image[0] || 'https://via.placeholder.com/300x150' }}
                        style={styles.image}
                    />
                </Pressable>

            </Link>
            <View style={styles.content}>
                <View style={styles.marqueContainer}>
                    <Text style={styles.marque}>{location.vehicle.brand}</Text>
                    <Text style={[styles.status, styles[location.status]]}>
                        {location.status === "pending" ? "⏱ pending" :
                            location.status === "cancelled" ? "✖ cancelled" : "✓ completed"}
                    </Text>
                </View>

                <View style={styles.date}>
                    <Feather name="calendar" size={20} color={Colors.primary} />
                    <View>
                        <Text>De : {location.pick_up.date.toString()}</Text>
                        <Text>À : {location.drop_off.date.toString()}</Text>
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <View style={styles.money}>
                        <FontAwesome5 name="money-check" size={20} color={Colors.primary} />
                        <Text style={styles.priceText}> {formattedPrice} XAF</Text>
                    </View>
                    <View style={styles.bonus}>
                        <AntDesign name="gift" size={20} color={Colors.success} />
                        <Text style={styles.gift}>{location.bonusPoints}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LocationCard;

const styles = StyleSheet.create({
    card: {
        width: width,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.background,
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 10,
    },
    marqueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    marque: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
    },
    status: {
        fontSize: 16,
        fontWeight: '600',
    },
    completed: {
        color: '#4CAF50', // Vert
    },
    pending: {
        color: '#FFA500', // Orange
    },
    cancelled: {
        color: '#F44336', // Rouge
    },
    date: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    money: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 5,
    },
    bonus: {
        alignItems: 'center',
    },
    gift: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.success,
        marginTop: 2,
    },
});
