import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Platform,StatusBar} from "react-native";
import {Ionicons,Feather,FontAwesome} from "@expo/vector-icons";

type HeaderProps={
    logo:string
}

export default function HEADER({logo}:HeaderProps){
    return(
        <View style={styles.container}>

            <View style={styles.topBar}>
                <Text style={styles.logo}>{logo}</Text>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.searchBar}>
                <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search something here"
                    placeholderTextColor="#6B7280"
                    style={styles.searchInput}
                />
                <Ionicons name="options-outline" size={20} color="gray" />
            </View>

        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 16,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0066FF', // Bleu vif
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: '#E5E7EB',
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: 'black',
    },
});