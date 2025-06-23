// hooks/useVehicleStats.ts
import { useMemo } from 'react';
import { CarProps } from '@/utils/types/CarProps';

export interface VehicleStatsData {
    // Statistiques d'utilisation
    occupancyRate: number;
    statusDistribution: { labels: string[]; data: number[] };
    averageRentalDuration: number;

    // Statistiques financières
    totalRevenue: number;
    averageRevenuePerVehicle: number;
    monthlyRevenue: { labels: string[]; datasets: [{ data: number[] }] };
    topEarningVehicles: { labels: string[]; datasets: [{ data: number[] }] };

    // Engagement social
    topLikedVehicles: { labels: string[]; datasets: [{ data: number[] }] };
    engagementStats: { labels: string[]; data: number[] };
    sharesPlatforms: { labels: string[]; data: number[] };

    // Performance opérationnelle
    maintenanceFrequency: { labels: string[]; datasets: [{ data: number[] }] };
    availabilityRate: number;

    // Satisfaction client
    averageRating: number;
    ratingDistribution: { labels: string[]; datasets: [{ data: number[] }] };

    // Préférences clients
    popularBrands: { labels: string[]; data: number[] };
    popularFeatures: { labels: string[]; datasets: [{ data: number[] }] };
    typeDistribution: { labels: string[]; data: number[] };
}

export const useVehicleStats = (vehicles: CarProps[]): VehicleStatsData => {
    // @ts-ignore
    return useMemo(() => {
        if (!vehicles || vehicles.length === 0) {
            return getEmptyStats();
        }

        // Statistiques d'utilisation
        const availableCount = vehicles.filter(v => v.available).length;
        const occupancyRate = ((vehicles.length - availableCount) / vehicles.length) * 100;

        const statusCounts = vehicles.reduce((acc, vehicle) => {
            const status = vehicle.available ? 'available' : 'unavailable';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const statusDistribution = {
            labels: Object.keys(statusCounts).map(status => status === 'available' ? 'Disponible' : 'Indisponible'),
            data: Object.values(statusCounts).map(count => count / vehicles.length)
        };

        // Statistiques financières
        const totalRevenue = vehicles.reduce((sum, vehicle) => sum + vehicle.pricePerDay * 30, 0); // Simulation 30 jours
        const averageRevenuePerVehicle = totalRevenue / vehicles.length;

        const monthlyRevenue = {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
            datasets: [{
                data: Array.from({ length: 6 }, (_, i) =>
                    Math.floor(totalRevenue * (0.8 + Math.random() * 0.4) / 6)
                )
            }]
        };

        const topEarningVehicles = {
            labels: vehicles.slice(0, 5).map(v => `${v.brand} ${v.model}`.substring(0, 8)),
            datasets: [{
                data: vehicles.slice(0, 5).map(v => v.pricePerDay * 30)
            }]
        };

        // Engagement social
        const topLikedVehicles = {
            labels: vehicles
                .sort((a, b) => b.totalLikes - a.totalLikes)
                .slice(0, 5)
                .map(v => `${v.brand} ${v.model}`.substring(0, 8)),
            datasets: [{
                data: vehicles
                    .sort((a, b) => b.totalLikes - a.totalLikes)
                    .slice(0, 5)
                    .map(v => v.totalLikes)
            }]
        };

        const engagementStats = {
            labels: ['Likes', 'Commentaires', 'Partages'],
            data: [
                vehicles.reduce((sum, v) => sum + v.totalLikes, 0) / vehicles.length / 100,
                vehicles.reduce((sum, v) => sum + v.totalComments, 0) / vehicles.length / 100,
                vehicles.reduce((sum, v) => sum + v.totalShares, 0) / vehicles.length / 100
            ].map(val => Math.min(val, 1))
        };

        const platformCounts = vehicles.reduce((acc, vehicle) => {
            vehicle.shares.forEach(share => {
                acc[share.platform] = (acc[share.platform] || 0) + 1;
            });
            return acc;
        }, {} as Record<string, number>);

        const sharesPlatforms = {
            labels: Object.keys(platformCounts).map(platform => platform.charAt(0).toUpperCase() + platform.slice(1)),
            data: Object.values(platformCounts).map(count => count / vehicles.reduce((sum, v) => sum + v.shares.length, 0))
        };

        // Performance opérationnelle
        const maintenanceData = vehicles.map(vehicle => ({
            name: `${vehicle.brand} ${vehicle.model}`.substring(0, 8),
            count: vehicle.service_history.length
        }));

        const maintenanceFrequency = {
            labels: maintenanceData.slice(0, 6).map(d => d.name),
            datasets: [{
                data: maintenanceData.slice(0, 6).map(d => d.count)
            }]
        };

        const availabilityRate = (availableCount / vehicles.length) * 100;

        // Satisfaction client
        const allRatings = vehicles.flatMap(v => v.reviews.map(r => r.rating));
        const averageRating = allRatings.length > 0 ?
            allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length : 0;

        const ratingCounts = allRatings.reduce((acc, rating) => {
            acc[Math.floor(rating)] = (acc[Math.floor(rating)] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);

        const ratingDistribution = {
            labels: ['1⭐', '2⭐', '3⭐', '4⭐', '5⭐'],
            datasets: [{
                data: [1, 2, 3, 4, 5].map(star => ratingCounts[star] || 0)
            }]
        };

        // Préférences clients
        const brandCounts = vehicles.reduce((acc, vehicle) => {
            if (vehicle.brand) {
                acc[vehicle.brand] = (acc[vehicle.brand] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const popularBrands = {
            labels: Object.keys(brandCounts).slice(0, 5),
            data: Object.values(brandCounts).slice(0, 5).map((count: number) => count / vehicles.length)
        };

        const featureKeys = Object.keys(vehicles[0]?.fonctionnalities || {});
        const featureCounts = featureKeys.map(feature => ({
            feature,
            count: vehicles.filter(v => v.fonctionnalities[feature as keyof typeof v.fonctionnalities]).length
        }));

        const popularFeatures = {
            labels: featureCounts.slice(0, 6).map(f => f.feature.replace('_', ' ')),
            datasets: [{
                data: featureCounts.slice(0, 6).map(f => f.count)
            }]
        };

        const typeCounts = vehicles.reduce((acc, vehicle) => {
            if (vehicle.type) {
                acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const typeDistribution = {
            labels: Object.keys(typeCounts),
            data: Object.values(typeCounts).map((count: number) => count / vehicles.length)
        };

        // Statistiques temporelles (supprimé)

        return {
            occupancyRate,
            statusDistribution,
            averageRentalDuration: 3.5, // Simulation
            totalRevenue,
            averageRevenuePerVehicle,
            monthlyRevenue,
            topEarningVehicles,
            topLikedVehicles,
            engagementStats,
            sharesPlatforms,
            maintenanceFrequency,
            availabilityRate,
            averageRating,
            ratingDistribution,
            popularBrands,
            popularFeatures,
            typeDistribution
        };
    }, [vehicles]);
};

const getEmptyStats = (): VehicleStatsData => ({
    occupancyRate: 0,
    statusDistribution: { labels: [], data: [] },
    averageRentalDuration: 0,
    totalRevenue: 0,
    averageRevenuePerVehicle: 0,
    monthlyRevenue: { labels: [], datasets: [{ data: [] }] },
    topEarningVehicles: { labels: [], datasets: [{ data: [] }] },
    topLikedVehicles: { labels: [], datasets: [{ data: [] }] },
    engagementStats: { labels: [], data: [] },
    sharesPlatforms: { labels: [], data: [] },
    maintenanceFrequency: { labels: [], datasets: [{ data: [] }] },
    availabilityRate: 0,
    averageRating: 0,
    ratingDistribution: { labels: [], datasets: [{ data: [] }] },
    popularBrands: { labels: [], data: [] },
    popularFeatures: { labels: [], datasets: [{ data: [] }] },
    typeDistribution: { labels: [], data: [] }
});