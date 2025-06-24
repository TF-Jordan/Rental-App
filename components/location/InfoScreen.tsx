import FontAwesome from '@expo/vector-icons/FontAwesome';
import {CarProps} from "@/utils/types/CarProps";
import {View, Text, StyleSheet,Dimensions, Image} from 'react-native';
import FeaturesCard from "@/components/location/fonctionnalites";
import {Colors} from "@/utils/colors";





const { width } = Dimensions.get('window');
const InfoScreen = ({ car }: { car: CarProps }) => {
    return (
        <>
            <View style={styles.infoScreen}>
                <FontAwesome name="automobile" size={20} color={Colors.primary} />
                <Text style={styles.infoText}>Vehicle</Text>
            </View>
            <Image
                source={{uri: car.images[0] || 'https://via.placeholder.com/300x150'}}
                style={styles.image}></Image>
            <FeaturesCard functionalities={car.fonctionnalities}/>
        </>
    )
};

export default InfoScreen;

const styles = StyleSheet.create({
    infoScreenContainer: {
        width: width,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.background,
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
    },
    infoScreen: {
        flexDirection:'row',
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        gap:10
    },
    infoText: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    image: {
        width: '80%',
        height: 150,
    },
})