import React, {useState} from "react";
import {View, StyleSheet, LayoutChangeEvent,Text} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type Props={
    total:number,
    enService:number,
    indisponible:number,
    autre:number
}


export default function VehicleChart({total,enService,autre,indisponible}:Props){
    const [containerWidth, setContainerWidth] =useState(300);//largeur par defaut du graphe

      //recupere les mesure du parent
    const onLayout=(event:LayoutChangeEvent)=>{
        const {width}=event.nativeEvent.layout;
        setContainerWidth(width);
    };

    const calculatePercentage = (value: number) => {
        const sum = enService + indisponible + autre;
        return ((value / sum) * 100).toFixed(1) + '%';
    };

    const data=[
        {
            name:'Total',
            effectif:total,
            color:'#0cb4ff',
            legendFontColor:'#0cb4ff',
            legendFontSize:14,
        },
        {
            name:'En service',
            effectif:enService,
            color:'#4CAF50',
            legendFontColor:'#4CAF50',
            legendFontSize:14,
            percentage:calculatePercentage(enService)
        },
        {
            name: 'Chez le réparateur',
            effectif: indisponible,
            color: '#FFC107', // Jaune
            legendFontColor: '#FFC107',
            legendFontSize: 14,
            percentage: calculatePercentage(indisponible)
        },
        {
            name: 'Inactifs',
            effectif: autre,
            color: '#F44336', // Rouge
            legendFontColor: '#F44336',
            legendFontSize: 14,
            percentage: calculatePercentage(autre)
        },
    ]
    return(
        <View style={styles.container} onLayout={onLayout}>
            <PieChart
                data={data}
                width={containerWidth}
                height={220}
                chartConfig={{
                    color:()=>'rgba(0,0,0,0.1)'
                }}
                accessor="effectif"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hasLegend={true}
               />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,      // Espace vertical autour
        paddingHorizontal: 8,    // Légers bords intérieurs gauche/droite
    },
});
