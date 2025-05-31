import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import agenciesData from '@/assets/Agency/agencies.json';
import { AgencyProps } from "@/utils/types/AgencyProps";
import AgencyHeader from '@/components/Agency/Details/AgencyHeader';
import PropertySection from '@/components/General/PropertySection';
import InfoRow from '@/components/General/InfoRow';
import ReviewsList from '@/components/Agency/Details/ReviewsList';

export default function AgencyDetails() {
    const { id } = useLocalSearchParams();
    const agency = agenciesData.find(a => a.id === Number(id)) as unknown as AgencyProps;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!agency) return <Text>Agence non trouvée</Text>;

    // Fonction pour déterminer le statut de l'agence
    const getAgencyStatus = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const openHour = parseInt(agency.openingTime.split(':')[0]);
        const closeHour = parseInt(agency.closingTime.split(':')[0]);

        const isOpen = currentHour >= openHour && currentHour < closeHour;

        return {
            text: isOpen ? 'Ouvert maintenant' : 'Fermé',
            bgColor: isOpen ? '#10B981' : '#EF4444'
        };
    };

    const statusInfo = getAgencyStatus();

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <AgencyHeader
                agency={agency}
                statusInfo={statusInfo}
                selectedImageIndex={selectedImageIndex}
                onImageSelect={setSelectedImageIndex}
            />

            {/* Section Informations générales */}
            <PropertySection title="Informations générales" iconName="info">
                <InfoRow
                    iconName="location-on"
                    iconType="material"
                    label="Adresse"
                    value={`${agency.city}, ${agency.quater}`}
                />
                <InfoRow
                    iconName="access-time"
                    iconType="material"
                    label="Horaires d'ouverture"
                    value={`${agency.openingTime} - ${agency.closingTime}`}
                />
                <InfoRow
                    iconName="category"
                    iconType="material"
                    label="Type d'agence"
                    value={agency.type}
                />
                <InfoRow
                    iconName="people"
                    iconType="material"
                    label="Abonnés"
                    value={agency.followers.toString()}
                />
            </PropertySection>

            {/* Section Description */}
            <PropertySection title="À propos" iconName="description">
                <Text style={styles.description}>{agency.description}</Text>
                <View style={styles.sloganContainer}>
                    <Text style={styles.sloganLabel}>Notre slogan :</Text>
                    <Text style={styles.slogan}>"{agency.slogan}"</Text>
                </View>
            </PropertySection>

            {/* Section Avis */}
            {agency.reviews && agency.reviews.length > 0 && (
                <PropertySection title="Avis clients" iconName="star">
                    <ReviewsList reviews={agency.reviews} />
                </PropertySection>
            )}
        </ScrollView>
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
    description: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 22,
        textAlign: 'justify',
    },
    sloganContainer: {
        marginTop: 16,
        padding: 15,
        backgroundColor: '#F1F5F9',
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
    },
    sloganLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    slogan: {
        fontSize: 16,
        color: '#1E293B',
        fontStyle: 'italic',
        fontWeight: '500',
    },
});