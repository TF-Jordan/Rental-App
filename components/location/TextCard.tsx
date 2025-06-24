import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Colors} from "@/utils/colors";

interface TextCardProps {
    text: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    padding?: number;
}

const TextCard: React.FC<TextCardProps> = ({
                                               text,
                                               backgroundColor = Colors.background, // Gris clair par défaut
                                               textColor = Colors.black, // Noir par défaut
                                               borderRadius = 10, // Bords arrondis par défaut
                                               padding = 16, // Padding par défaut
                                           }) => {
    return (
        <View style={[
            styles.container,
            {
                backgroundColor,
                borderRadius,
                padding,
            }
        ]}>
            <Text style={[styles.text, { color: textColor }]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Pour Android
        width: 150,
        height: 50,
        // Optionnel :
        minWidth: 80,
        maxWidth: 150,
        minHeight: 40,
        maxHeight: 50
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default TextCard;