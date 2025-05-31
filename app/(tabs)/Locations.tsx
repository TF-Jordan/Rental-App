
import {FlatList, View, Text} from "react-native";
// @ts-ignore
import LocationCard, {Location}from "@/components/location/locationState";
import location from "@/assets/location/location.json";
import React from "react";
import HEADER from "@/components/General/Header";


export default function Locations(){
    return(
        <>
            <HEADER logo='EASY-RENT' />

                <Text style={{fontSize:20, fontWeight:"bold"}}>Renting Request</Text>
                <FlatList
                    data={location as Location[]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <LocationCard location={item} />}
                    contentContainerStyle={{ padding: 16 }}
                    scrollEnabled={true}
                />
        </>
    )
}