import {Tabs} from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Ionicons} from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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

            <Tabs.Screen
                name='Conducteurs'
                options={{
                    title:"Conducteurs",
                    tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="steering" size={size} color={color} />
                    ),
                }}/>

            <Tabs.Screen
                name='Car'
                options={{
                    title:"Vehicles",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="car-alt" size={24} color={color} />
                    ),
                }}/>
        </Tabs>
    )
}