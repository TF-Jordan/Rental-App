import React from 'react';
import { Pressable, Text, StyleSheet , View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('GeneralVehicules')}
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? '#388E3C' : '#4CAF50' },
                ]}
            >
                <Text style={styles.buttonText}>Aller à la page générale</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
