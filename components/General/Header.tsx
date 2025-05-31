import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, StatusBar } from "react-native";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from '@/utils/colors';

type HeaderProps = {
    logo: string;
};

export default function HEADER({ logo }: HeaderProps) {
    return (
        <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.topBar}>
                <Text style={styles.logo}>{logo}</Text>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="menu" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* SearchBar avec fond propre, hors LinearGradient */}
            <View style={styles.searchWrapper}>
                <View style={styles.searchBar}>
                    <FontAwesome name="search" size={20} color="#6B7280" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Rechercher..."
                        placeholderTextColor="#6B7280"
                        style={styles.searchInput}
                    />
                    <Ionicons name="options-outline" size={20} color="#6B7280" />
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 20 : 40,
        paddingHorizontal: 16,
        paddingBottom: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
