import {Dimensions, StyleSheet, Text, View, ScrollView} from "react-native";
import {Colors} from "@/utils/colors";
import {useLocalSearchParams,Stack} from "expo-router";
import {LocationProps as Location} from "@/utils/types/LocationProps";
import {CarProps as Car} from "@/utils/types/CarProps";
import locationData from "@/assets/location/location.json";
import carData from "@/assets/Car/cars.json";
import React, {useState} from "react";
import TabSelector from "@/components/location/TabSelector";
import InfoScreen from "@/components/location/InfoScreen";


const { width } = Dimensions.get('window');

export default function LocationDetails() {
    const { id } = useLocalSearchParams();
    console.log(id);
    // @ts-ignore
    const location = locationData.find((loc : Location) => loc.id === Number(id)) as unknown as Location;
    console.log(location);
    if (!location) return <Text>Location non trouvé</Text>;

    // @ts-ignore
    const car = carData.find((vehicle : Car) => vehicle.id === location.vehicle.id) as unknown as Car;

    // Définir 'info' comme valeur initiale pour activer l'onglet Informations par défaut
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState<'info' | 'documents' | 'ride'>('info');

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
        <ScrollView style={styles.container}>

                <View style={styles.card}>
                    <View >
                        <Text style={{fontSize:25, fontWeight:"bold"}}>Rental details</Text>
                        <Text style={{fontSize:20}}>Ref : {id}</Text>
                    </View>
                    <View style={[{borderRadius:15, backgroundColor: Colors.border, width: 100, height: 40, justifyContent:'center'}]}>
                        <Text style={[styles.status, styles[location.status]]}> {location.status}</Text>
                    </View>

                </View>
                <View style={[{backgroundColor: Colors.background, overflow: 'hidden', elevation: 3,paddingVertical:10, marginVertical:10}]  }>
                    {/* On passe l'état 'activeTab' et 'setActiveTab' au composant TabSelector */}
                    <TabSelector
                        activeTab={activeTab}
                        setActiveTab={setActiveTab} // Permet de gérer l'état d'activation
                    />
                    <View style={{ flex: 1, padding: 20 }}>
                        {activeTab === 'info' && <InfoScreen  car={car} />}
                    {/*    {activeTab === 'documents' && <DocumentsScreen />}*/}
                    {/*    {activeTab === 'ride' && <RideScreen />}*/}
                    </View>
                </View>

        </ScrollView>
        </>


    )
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.9,
        overflow: 'hidden',
        borderRadius:5,
        backgroundColor: Colors.background,
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },
    status: {
        marginTop: 5,
        fontSize:18,
        fontWeight: 'semibold',
    },
    completed: {
        color: Colors.success, // Vert
    },
    pending: {
        color: Colors.warning, // Orange
    },
    cancelled: {
        color: Colors.error, // Rouge
    },
});