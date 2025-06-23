export type VehicleStatus = 'available' | 'unavailable' | 'maintenance' | 'reserved' | 'out_of_service';

// Nouveau type pour les commentaires
export interface Comment {
    id: number;
    userId: number;
    userName: string;
    userAvatar?: string;
    comment: string;
    createdAt: Date;
    replies?: Comment[];
}

// Nouveau type pour les likes
export interface Like {
    id: number;
    userId: number;
    userName: string;
    createdAt: Date;
}

// Nouveau type pour les partages
export interface Share {
    id: number;
    userId: number;
    userName: string;
    platform: 'facebook' | 'twitter' | 'whatsapp' | 'link' | 'other';
    createdAt: Date;
}

// Interface mise à jour pour CarProps
export interface CarProps {
    id: number;
    type?: string;
    brand?: string;
    model?: string;
    year?: number;
    rating?: number;
    passenger?: number;
    description: string;
    pricePerDay: number;
    vin?: string;
    documents?: {
        registration_certificate: string;
        technical_inspection: string;
        insurance: string;
        tax_sticker: string[];
    };
    fonctionnalities: {
        air_condition: boolean;
        usb_input: boolean;
        seat_belt: boolean;
        audio_input: boolean;
        child_seat: boolean;
        bluetooth: boolean;
        sleeping_bed: boolean;
        onboard_computer: boolean;
        gps: boolean;
        luggage: boolean;
        water: boolean;
        additional_covers: boolean;
    };
    engine: {
        type?: string;
        horsepower?: number;
        capacity?: number;
    };
    transmission?: string;
    color?: string;
    fuel_efficiency?: {
        city?: string;
        highway?: string;
    };
    license_plate: string;
    registration?: {
        state?: string;
        expiry?: Date;
    };
    owner?: {
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
    };
    service_history: {
        date?: Date;
        service_type?: string;
        mileage?: number;
        provider?: string;
    }[];
    insurance?: {
        provider?: string;
        policy_number?: string;
        expiry?: Date;
    };
    agency?: {
        id: number;
    };
    images: string[];
    reviews: {
        id?: number;
        reviewer_name: string;
        reviewer_id?: number;
        comment: string;
        rating: number;
    }[];

    // Nouvelles propriétés pour les fonctionnalités sociales
    likes: Like[];
    comments: Comment[];
    shares: Share[];
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    isLikedByCurrentUser: boolean;
    currentUserId?: number; // ID de l'utilisateur actuel

    favorite?: boolean;
    available: boolean;

    // Callbacks existants
    onLike?: (id: number) => void;
    onDislike?: (id: number) => void;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;

    // Nouveaux callbacks pour les fonctionnalités sociales
    onToggleLike?: (vehicleId: number, userId: number) => void;
    onAddComment?: (vehicleId: number, comment: string, userId: number) => void;
    onShare?: (vehicleId: number, platform: string, userId: number) => void;
}

export interface VehicleListProps {
    vehicles: CarProps[];
    setVehicles: (vehicles: CarProps[]) => void;
    filters: FilterVehicleProps;
}

export interface VehicleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (vehicleData: Partial<CarProps>) => void;
    initialData?: CarProps | null;
    title: string;
}

// Nouvelle interface pour la modal des commentaires
export interface CommentsModalProps {
    isVisible: boolean;
    onClose: () => void;
    vehicleId: number;
    comments: Comment[];
    onAddComment: (comment: string) => void;
    currentUserId: number;
}

export interface FilterVehicleProps {
    type: string[];
    capacity: number | null;
    priceRange: [number, number];
    brands?: string[];
    models?: string[];
    minRating?: number | null;
    features?: string[];
}

// Fonction utilitaire pour filtrer les véhicules (inchangée)
export const filterVehicles = (vehicles: CarProps[], filters: FilterVehicleProps): CarProps[] => {
    return vehicles.filter(vehicle => {
        if (filters.type.length > 0 && !filters.type.includes(vehicle.type || '')) {
            return false;
        }
        if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(vehicle.brand || '')) {
            return false;
        }
        if (filters.models && filters.models.length > 0 && !filters.models.includes(vehicle.model || '')) {
            return false;
        }
        if (filters.capacity && (vehicle.passenger || 0) < filters.capacity) {
            return false;
        }
        if (vehicle.pricePerDay < filters.priceRange[0] || vehicle.pricePerDay > filters.priceRange[1]) {
            return false;
        }
        if (filters.minRating && (vehicle.rating || 0) < filters.minRating) {
            return false;
        }
        if (filters.features && filters.features.length > 0) {
            const hasAllFeatures = filters.features.every(feature =>
                vehicle.fonctionnalities[feature as keyof typeof vehicle.fonctionnalities]
            );
            if (!hasAllFeatures) {
                return false;
            }
        }
        return true;
    });
};