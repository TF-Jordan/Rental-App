import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        shadowColor: '#f40d0d',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        borderBottomWidth: 5,

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
});