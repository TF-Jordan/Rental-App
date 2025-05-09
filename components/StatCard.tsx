import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


type Props = {

    label:string
    bodyText:string
    bottomText:string
    icon:React.ReactNode
}



export default function StatCard({label, bodyText,bottomText, icon}:Props){
    return(
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={styles.label}>{label}</Text>
                {icon}
            </View>
            <Text style={styles.value}>{bodyText}</Text>
            <Text style={styles.percentage}>{bottomText}</Text>
        </View>
    )
}





const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        elevation: 4,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        borderBottomWidth: 5,
        borderBottomColor: '#0cb4ff',


    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
    },
    percentage: {
        fontSize: 12,
        color: '#5acf3b',
        marginTop: 4,
    },
    gradientBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4, // Épaisseur de la bordure
    },
});