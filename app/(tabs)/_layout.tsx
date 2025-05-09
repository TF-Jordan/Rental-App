import {Tabs} from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {Ionicons} from "@expo/vector-icons";

export default function TabLayout(){
    return(
        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen
                name='Dashboard'
                options={{
                    title:'Dashboard',
                    tabBarIcon:({color,size})=>(<MaterialIcons name="dashboard" size={size} color={color} />),
                }}/>
            <Tabs.Screen
                name='Véhicles'
                options={{
                    title:"Véhicles",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="car-outline" size={size} color={color} />
                    ),
                }}/>
        </Tabs>
    )
}