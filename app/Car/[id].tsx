import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams ,Stack} from 'expo-router';
import vehiclesData from '@/assets/Car/cars.json';
import driversData from '@/assets/Drivers/drivers.json'
import {DriverProps as driver} from "@/utils/types/DriverProps";
import { CarProps as Vehicle } from "@/utils/types/CarProps";
import { CarStatusInfo } from '@/assets/Car/StatutsInfo';
import VehicleHeader from '@/components/Car/Details/CarHeader';
import VehicleSection from '@/components/Car/Details/VehicleSection';
import InfoRow from '@/components/General/InfoRow';
import FeatureGrid from '@/components/Car/Details/FeatureGrid';
import ReviewsList from '@/components/Car/Details/ReviewsList';
import DriverCard from "@/components/Driver/DriverCard";

export default function VehicleDetails() {
    const { id } = useLocalSearchParams();
    const vehicle = vehiclesData.find(v => v.id === Number(id)) as unknown as Vehicle;
    const driverAsigned=driversData.find(d=>d.vehicle_assigned.find(v=>v.id===vehicle.id ))//Cherche dans le tableau driversData un conducteur qui a un véhicule assigné (dans son tableau vehicle_assigned) dont l'id correspond à l'id du véhicule trouvé précédemment
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!vehicle) return <Text>Véhicule non trouvé</Text>;

    const statusInfo = CarStatusInfo(vehicle?.available ?? false);

    // @ts-ignore
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,      // Affiche juste la barre avec bouton retour
                    headerTitle: '',         // Pas de titre
                    headerBackTitle: 'Back', // Texte personnalisé
                    headerTransparent: true, // Style optionnel
                }}
            />
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <VehicleHeader
                vehicle={vehicle}
                statusInfo={statusInfo}
                selectedImageIndex={selectedImageIndex}
                onImageSelect={setSelectedImageIndex}
            />

            {/* Section Informations générales */}
            <VehicleSection title="Informations générales" iconName="info">
                <InfoRow
                    iconName="hashtag"
                    label="Numéro de châssis"
                    value={vehicle.vin || 'Non spécifié'}
                />
                <InfoRow
                    iconName="palette"
                    iconType="material"
                    label="Couleur"
                    value={vehicle.color || 'Non spécifiée'}
                />
                <InfoRow
                    iconName="id-card"
                    label="Plaque d'immatriculation"
                    value={vehicle.license_plate}
                />
                <InfoRow
                    iconName="people"
                    iconType="material"
                    label="Nombre de passagers"
                    // @ts-ignore
                    value={vehicle.passenger.toString()}
                />
            </VehicleSection>

            {/* Section Moteur */}
            {vehicle.engine && (
                <VehicleSection title="Moteur" iconName="cog" iconType="fontawesome">
                    <InfoRow
                        iconName="category"
                        iconType="material"
                        label="Type"
                        value={vehicle.engine.type || 'Non spécifié'}
                    />
                    <InfoRow
                        iconName="tachometer-alt"
                        label="Puissance"
                        value={`${vehicle.engine.horsepower || 'Non spécifié'} CV`}
                    />
                    <InfoRow
                        iconName="speed"
                        iconType="material"
                        label="Cylindrée"
                        value={`${vehicle.engine.capacity || 'Non spécifié'} L`}
                    />
                    <InfoRow
                        iconName="settings"
                        iconType="material"
                        label="Transmission"
                        value={vehicle.transmission || 'Non spécifié'}
                    />
                </VehicleSection>
            )}

            {/* Section Équipements */}
            <VehicleSection title="Équipements" iconName="build">
                <FeatureGrid features={vehicle.fonctionnalities} />
            </VehicleSection>

            {/* Section Documents */}
            {vehicle.documents && (
                <VehicleSection title="Documents" iconName="folder">
                    <InfoRow
                        iconName="file-alt"
                        label="Certificat d'immatriculation"
                        value={vehicle.documents.registration_certificate}
                    />
                    <InfoRow
                        iconName="build"
                        iconType="material"
                        label="Contrôle technique"
                        value={vehicle.documents.technical_inspection}
                    />
                    <InfoRow
                        iconName="security"
                        iconType="material"
                        label="Assurance"
                        value={vehicle.documents.insurance}
                    />
                </VehicleSection>
            )}

            <VehicleSection title="Conducteur" iconName="support">
                <>
                    {driverAsigned ? (
                        <DriverCard driver={driverAsigned}/>
                    ):(
                        <Text>Aucun conducteur assigné</Text>
                    )}
               </>
            </VehicleSection>

            {/* Section Avis */}
            {vehicle.reviews && vehicle.reviews.length > 0 && (
                <VehicleSection title="Avis clients" iconName="star">
                    <ReviewsList reviews={vehicle.reviews} />
                </VehicleSection>
            )}
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContent: {
        paddingBottom: 20,
    },
});