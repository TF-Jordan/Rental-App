// components/StarRating.tsx
import { View, StyleSheet ,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type StarRatingProps = {
    rating: number;
    size?: number;
    showNumber?: boolean;
};

const StarRating = ({
                        rating,
                        size = 16,
                        showNumber = false
                    }: StarRatingProps) => {
    // Calcul des étoiles pleines et demi-étoiles
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <View style={styles.container}>
            {/* Étoiles pleines */}
            {[...Array(fullStars)].map((_, index) => (
                <Ionicons
                    key={`full-${index}`}
                    name="star"
                    size={size}
                    color="#FFD700"
                />
            ))}

            {/* Demi-étoile (si nécessaire) */}
            {hasHalfStar && (
                <Ionicons
                    key="half"
                    name="star-half"
                    size={size}
                    color="#FFD700"
                />
            )}

            {/* Étoiles vides */}
            {[...Array(emptyStars)].map((_, index) => (
                <Ionicons
                    key={`empty-${index}`}
                    name="star-outline"
                    size={size}
                    color="#FFD700"
                />
            ))}

            {/* Affichage numérique optionnel */}
            {showNumber && (
                <Text style={[styles.ratingText, { fontSize: size * 0.75 }]}>
                    ({rating.toFixed(1)})
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    ratingText: {
        marginLeft: 4,
        color: '#666',
        fontWeight: '500',
    },
});

export default StarRating;