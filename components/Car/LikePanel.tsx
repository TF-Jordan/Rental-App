import {useState} from "react";
import {View,TouchableOpacity,Text,StyleSheet} from "react-native";
import {Heart,MessageCircle,Share2} from "lucide-react-native";


interface ActionPanelProps {
    initialLikes?:number;
    onCommentPress?:()=>void;
    onSharePress?:()=>void;
}

