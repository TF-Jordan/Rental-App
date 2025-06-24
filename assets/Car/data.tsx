import {CarProps} from "@/utils/types/CarProps";
import Cars from "@/assets/Car/cars.json";

export default function transformRawVehicles(rawVehicles: CarProps[]): any[] {
    return rawVehicles.map(vehicle => ({
        id: vehicle.id,
        type: vehicle.type,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        rating: vehicle.rating,
        passenger: vehicle.passenger,
        description: vehicle.description,
        pricePerDay: vehicle.pricePerDay,
        vin: vehicle.vin,

        documents: {
            registration_certificate: vehicle.documents?.registration_certificate,
            technical_inspection: vehicle.documents?.technical_inspection,
            insurance: vehicle.documents?.insurance,
            tax_sticker: vehicle.documents?.tax_sticker ?? [],
        },

        fonctionnalities: {
            air_condition: vehicle.fonctionnalities?.air_condition ?? false,
            usb_input: vehicle.fonctionnalities?.usb_input ?? false,
            seat_belt: vehicle.fonctionnalities?.seat_belt ?? false,
            audio_input: vehicle.fonctionnalities?.audio_input ?? false,
            child_seat: vehicle.fonctionnalities?.child_seat ?? false,
            bluetooth: vehicle.fonctionnalities?.bluetooth ?? false,
            sleeping_bed: vehicle.fonctionnalities?.sleeping_bed ?? false,
            onboard_computer: vehicle.fonctionnalities?.onboard_computer ?? false,
            gps: vehicle.fonctionnalities?.gps ?? false,
            luggage: vehicle.fonctionnalities?.luggage ?? false,
            water: vehicle.fonctionnalities?.water ?? false,
            additional_covers: vehicle.fonctionnalities?.additional_covers ?? false,
        },

        engine: {
            type: vehicle.engine?.type,
            horsepower: vehicle.engine?.horsepower,
            capacity: vehicle.engine?.capacity,
        },

        transmission: vehicle.transmission,
        color: vehicle.color,

        fuel_efficiency: {
            city: vehicle.fuel_efficiency?.city,
            highway: vehicle.fuel_efficiency?.highway,
        },

        license_plate: vehicle.license_plate,

        registration: {
            state: vehicle.registration?.state,
            expiry: vehicle.registration?.expiry,
        },

        owner: {
            name: vehicle.owner?.name,
            address: vehicle.owner?.address,
            phone: vehicle.owner?.phone,
            email: vehicle.owner?.email,
        },

        service_history: Array.isArray(vehicle.service_history)
            ? vehicle.service_history.map(item => ({
                date: item.date,
                service_type: item.service_type,
                mileage: item.mileage,
                provider: item.provider,
            }))
            : [],

        insurance: {
            provider: vehicle.insurance?.provider,
            policy_number: vehicle.insurance?.policy_number,
            expiry: vehicle.insurance?.expiry,
        },

        agency: {
            id: vehicle.agency?.id,
        },

        images: vehicle.images ?? [],

        reviews: Array.isArray(vehicle.reviews)
            ? vehicle.reviews.map(r => ({
                id: r.id,
                reviewer_name: r.reviewer_name,
                reviewer_id: r.reviewer_id,
                comment: r.comment,
                rating: r.rating,
            }))
            : [],

        likes: Array.isArray(vehicle.likes)
            ? vehicle.likes.map(like => ({
                id: like.id,
                userId: like.userId,
                userName: like.userName,
                createdAt: like.createdAt,
            }))
            : [],

        comments: Array.isArray(vehicle.comments)
            ? vehicle.comments.map(comment => ({
                id: comment.id,
                userId: comment.userId,
                userName: comment.userName,
                userAvatar: comment.userAvatar,
                comment: comment.comment,
                createdAt: comment.createdAt,
                replies: comment.replies ?? [],
            }))
            : [],

        shares: Array.isArray(vehicle.shares)
            ? vehicle.shares.map(share => ({
                id: share.id,
                userId: share.userId,
                userName: share.userName,
                platform: share.platform,
                createdAt: share.createdAt,
            }))
            : [],

        totalLikes: vehicle.totalLikes,
        totalComments: vehicle.totalComments,
        totalShares: vehicle.totalShares,
        isLikedByCurrentUser: vehicle.isLikedByCurrentUser,
        currentUserId: vehicle.currentUserId,
        favorite: vehicle.favorite,
        available: vehicle.available,
    }));
}

// @ts-ignore
export let vehiclesData=transformRawVehicles(Cars.vehicles);