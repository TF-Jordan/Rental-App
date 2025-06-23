import {Stack} from 'expo-router'
import { StatusBar, SafeAreaView } from 'react-native';


export default function Root(){
    return(

            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar
                    barStyle="dark-content" // ou "light-content" si fond sombre
                    translucent
                    backgroundColor="transparent"
                />
        <Stack>
            <Stack.Screen name="(tabs)"  options={{headerShown:false}}/>
        </Stack>
            </SafeAreaView>
    )
}