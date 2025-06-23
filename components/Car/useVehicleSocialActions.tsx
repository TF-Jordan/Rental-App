import { useState, useCallback } from 'react';
import { CarProps, Like, Comment } from '@/utils/types/CarProps';

interface UseVehicleSocialActionsProps {
    initialVehicles: CarProps[];
    currentUserId: number;
}

interface UseVehicleSocialActionsReturn {
    vehicles: CarProps[];
    toggleLike: (vehicleId: number) => Promise<void>;
    addComment: (vehicleId: number, commentText: string) => Promise<void>;
    recordShare: (vehicleId: number, platform: string) => Promise<void>;
    updateVehicles: (newVehicles: CarProps[]) => void;
}

export const useVehicleSocialActions = ({
                                            initialVehicles,
                                            currentUserId
                                        }: UseVehicleSocialActionsProps): UseVehicleSocialActionsReturn => {
    const [vehicles, setVehicles] = useState<CarProps[]>(initialVehicles);

    // Fonction pour toggle un like
    const toggleLike = useCallback(async (vehicleId: number) => {
        try {
            // Mise à jour optimiste de l'UI
            setVehicles(prevVehicles =>
                prevVehicles.map(vehicle => {
                    if (vehicle.id === vehicleId) {
                        const isCurrentlyLiked = vehicle.isLikedByCurrentUser;
                        const newLike: Like = {
                            id: Date.now(),
                            userId: currentUserId,
                            userName: 'Utilisateur Actuel',
                            createdAt: new Date(),
                        };

                        return {
                            ...vehicle,
                            isLikedByCurrentUser: !isCurrentlyLiked,
                            totalLikes: isCurrentlyLiked ? vehicle.totalLikes - 1 : vehicle.totalLikes + 1,
                            likes: isCurrentlyLiked
                                ? vehicle.likes.filter(like => like.userId !== currentUserId)
                                : [...vehicle.likes, newLike],
                        };
                    }
                    return vehicle;
                })
            );

            // 🚨 APPEL API RÉEL ICI
            // const response = await api.toggleLike(vehicleId, currentUserId);
            // if (!response.success) {
            //   throw new Error('Échec du toggle like');
            // }

        } catch (error) {
            console.error('Erreur lors du toggle like:', error);

            // Rollback en cas d'erreur
            setVehicles(prevVehicles =>
                prevVehicles.map(vehicle => {
                    if (vehicle.id === vehicleId) {
                        const wasLiked = !vehicle.isLikedByCurrentUser;
                        return {
                            ...vehicle,
                            isLikedByCurrentUser: wasLiked,
                            totalLikes: wasLiked ? vehicle.totalLikes + 1 : vehicle.totalLikes - 1,
                            likes: wasLiked
                                ? [...vehicle.likes, {
                                    id: Date.now(),
                                    userId: currentUserId,
                                    userName: 'Utilisateur Actuel',
                                    createdAt: new Date(),
                                }]
                                : vehicle.likes.filter(like => like.userId !== currentUserId),
                        };
                    }
                    return vehicle;
                })
            );
        }
    }, [currentUserId]);

    // Fonction pour ajouter un commentaire
    const addComment = useCallback(async (vehicleId: number, commentText: string) => {
        try {
            const newComment: Comment = {
                id: Date.now(),
                userId: currentUserId,
                userName: 'Utilisateur Actuel',
                userAvatar: 'https://via.placeholder.com/40x40?text=UA',
                comment: commentText,
                createdAt: new Date(),
                replies: [],
            };

            // Mise à jour optimiste de l'UI - ajouter le commentaire en haut
            setVehicles(prevVehicles =>
                prevVehicles.map(vehicle => {
                    if (vehicle.id === vehicleId) {
                        return {
                            ...vehicle,
                            comments: [newComment, ...vehicle.comments],
                            totalComments: vehicle.totalComments + 1,
                        };
                    }
                    return vehicle;
                })
            );

            // 🚨 APPEL API RÉEL ICI

        } catch (error) {
            console.error('Erreur lors de l\'ajout du commentaire:', error);

            // Rollback en cas d'erreur
            setVehicles(prevVehicles =>
                prevVehicles.map(vehicle => {
                    if (vehicle.id === vehicleId) {
                        return {
                            ...vehicle,
                            comments: vehicle.comments.filter(comment => comment.id !== Date.now()),
                            totalComments: vehicle.totalComments - 1,
                        };
                    }
                    return vehicle;
                })
            );
        }
    }, [currentUserId]);

    // Fonction pour enregistrer un partage
    const recordShare = useCallback(async (vehicleId: number, platform: string) => {
        try {
            // Mise à jour optimiste de l'UI
            // @ts-ignore
            setVehicles(prevVehicles =>
                prevVehicles.map(vehicle => {
                    if (vehicle.id === vehicleId) {
                        const newShare = {
                            id: Date.now(),
                            userId: currentUserId,
                            userName: 'Utilisateur Actuel',
                            platform: platform,
                            createdAt: new Date(),
                        };

                        return {
                            ...vehicle,
                            totalShares: vehicle.totalShares + 1,
                            shares: [...vehicle.shares, newShare],
                        };
                    }
                    return vehicle;
                })
            );

            // 🚨 APPEL API RÉEL ICI
            // const response = await api.recordShare(vehicleId, platform, currentUserId);
            // if (!response.success) {
            //   throw new Error('Échec de l\'enregistrement du partage');
            // }

        } catch (error) {
            console.error('Erreur lors du partage:', error);

            // Rollback en cas d'erreur
            setVehicles(prevVehicles =>
                prevVehicles.map(vehicle => {
                    if (vehicle.id === vehicleId) {
                        return {
                            ...vehicle,
                            totalShares: vehicle.totalShares - 1,
                            shares: vehicle.shares.slice(0, -1), // Enlever le dernier partage ajouté
                        };
                    }
                    return vehicle;
                })
            );
        }
    }, [currentUserId]);

    // Fonction pour mettre à jour manuellement la liste des véhicules
    const updateVehicles = useCallback((newVehicles: CarProps[]) => {
        setVehicles(newVehicles);
    }, []);

    return {
        vehicles,
        toggleLike,
        addComment,
        recordShare,
        updateVehicles,
    };
};