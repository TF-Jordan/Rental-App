import React, {useState} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import VehicleCard from "@/components/Car/CarCard";
import AddCarModal from "@/components/Car/AddCarModal/AddCarModal";
import {CarProps, Like} from "@/utils/types/CarProps";
import {vehiclesData} from "@/assets/Car/data";
import {useVehicleSocialActions} from "@/components/Car/useVehicleSocialActions";

interface VehicleListProps {
    vehicles: CarProps[];
    currentUserId?: number; // Optionnel avec valeur par défaut
}

export default function VehicleList({
                                        vehicles,
                                        currentUserId = 1, // Valeur par défaut
                                    }: VehicleListProps) {
    const {
        vehicles: managedVehicles,
        toggleLike,
        addComment,
        recordShare,
        updateVehicles
    } = useVehicleSocialActions({
        initialVehicles: vehicles,
        currentUserId
    });

    // Synchroniser avec les véhicules reçus en props
    React.useEffect(() => {
        updateVehicles(vehicles);
    }, [vehicles, updateVehicles]);

    return (
        <View style={styles.container}>
            <FlatList
                data={managedVehicles}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <VehicleCard
                        vehicle={item}
                        currentUserId={currentUserId}
                        onToggleLike={(vehicleId) => toggleLike(vehicleId)}
                        onAddComment={(vehicleId, comment) => addComment(vehicleId, comment)}
                        onShare={(vehicleId, platform) => recordShare(vehicleId, platform)}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={5}
                getItemLayout={(data, index) => ({
                    length: 444,
                    offset: 444 * index,
                    index,
                })}
            />
            <AddCarModal/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
        paddingBottom: 100, // Espace pour le bouton flottant
    },
});