import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, StatusBar } from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from '@/utils/colors';
import {Link} from "expo-router";

type HeaderProps = {
    logo: string;
};

export default function HEADER({ logo }: HeaderProps) {
    // @ts-ignore
    return (
        <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.topBar}>
                <Text style={styles.logo}>{logo}</Text>
                <View style={styles.iconsContainer}>
                    <Link href={`/notification/NotificationScreen/`} asChild>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    </Link>
                    <TouchableOpacity>
                        <Feather name="menu" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
 </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 20 : 40,
        paddingHorizontal: 16,
        height: "60%",
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: 16,
    },
    searchWrapper: {
        marginTop: 16,
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        color: '#000',
    },
});
