import {View,Text,StyleSheet,ScrollView} from "react-native";
import HEADER from "@/components/Header";
import StatCard from "@/components/StatCard";
import TabSelector from "@/components/TabSelector";
import GraphStatCar from "@/components/GraphStat";
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

export default function Dashboard(){
    return (
           <>
            <HEADER logo='EASY-RENT'/>
               <View>
                  <TabSelector />
               </View>
               <View>
               <Text style={styles.title}>Tableau de bord</Text>
               <Text style={styles.subtitle}>
                   Aperçu de la performance et des statistiques de votre compagnie
               </Text>
               </View>
            <ScrollView style={styles.container}>
                <StatCard label="Véhicules" bodyText="70" bottomText='25% depuis le moi dernier' icon={<FontAwesome5 name="car" size={24} color="#00BFFF" />} />
                <StatCard label="Chauffeurs" bodyText="20" bottomText='25% depuis le moi dernier' icon={<Feather name="user" size={24} color="#00BFFF" />} />
                <StatCard label="Revenus" bodyText="1008776 XAF" bottomText='25% depuis le moi dernier' icon={<MaterialIcons name="attach-money" size={24} color="#00BFFF" />} />
                <StatCard label="Revenus" bodyText="20" bottomText='25% depuis le moi dernier' icon={<Feather name="bar-chart-2" size={24} color="#00BFFF" />} />
                <GraphStatCar enService={45} autre={40} indisponible={15} total={100}/>
            </ScrollView>
           </>

    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    title: {
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
    },
    subtitle: {
        textAlign:'center',
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },

});