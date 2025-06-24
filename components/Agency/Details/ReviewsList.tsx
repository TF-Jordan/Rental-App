// components/Agency/AgencyReviewsList.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from '@/components/General/StarRating';

interface Review {
    reviewer: string;
    rating: number;
    comment: string;
}

interface AgencyReviewsListProps {
    reviews: Review[];
}

/**
 * AgencyReviewsList
 *
 * Composant d'affichage des avis clients pour une agence.
 * Utilise la même logique et les mêmes styles que ReviewsList des véhicules,
 * avec des noms de champs adaptés aux données des agences.
 */
export default function AgencyReviewsList({ reviews }: AgencyReviewsListProps) {
    return (
        <View>
            {reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewerName}>{review.reviewer}</Text>
                        <StarRating rating={review.rating} showNumber={false} />
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    reviewItem: {
        marginBottom: 16,
        padding: 15,
        backgroundColor: '#F8FAFC',
        borderRadius: 10,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
    },
    reviewComment: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
    },
});
