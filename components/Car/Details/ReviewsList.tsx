import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from "@/components/General/StarRating";

interface Review {
    reviewer_name: string;
    rating: number;
    comment: string;
}

interface ReviewsListProps {
    reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
    return (
        <View>
            {reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                        <Text style={styles.reviewerName}>{review.reviewer_name}</Text>
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