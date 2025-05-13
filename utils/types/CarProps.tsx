export interface CarProps {
    id: number;
    type?: string;                // Optional
    brand?: string;               // Optional
    model?: string;               // Optional
    year?: number;                  // Optional
    rating?: number;              // Optional
    passenger?: number;           // Optional
    description: string;       // Optional
    pricePerDay: number;         // Optional
    vin?: string;        
    documents?:{
        registration_certificate: string;
        technical_inspection: string;
        insurance: string;
        tax_sticker: string[];
    };
    fonctionnalities: {          // Optional
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

    engine: {                    // Optional
        type?: string;
        horsepower?: number;
        capacity?: number;
    };

    transmission?: string;        // Optional
    color?: string;               // Optional
    fuel_efficiency?: {           // Optional
        city?: string;
        highway?: string;
    };

    license_plate: string;       // Optional

    registration?: {              // Optional
        state?: string;
        expiry?: Date;
    };

    owner?: {                     // Optional
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
    };

    service_history: {           // Optional
        date?: Date;
        service_type?: string;
        mileage?: number;
        provider?: string;
    }[];

    insurance?: {                 // Optional
        provider?: string;
        policy_number?: string;
        expiry?: Date;
    };
    agency?:{
        id:number;
    }

    images: string[];            // Optional

    reviews: {                   // Optional
        id?: number;
        reviewer_name: string;
        reviewer_id?:number;
        comment: string;
        rating: number;
    }[];
    favorite? : boolean;
    available: boolean;
    onLike?: (id: number) => void;    // Optional
    onDislike?: (id: number) => void; // Optional
    onEdit?: (id: number) => void; // Optional
    onDelete?: (id: number) => void; // Optional
}

export interface FilterVehicleProps {
    type: string[];
    capacity: number | null;
    priceRange: [number, number];
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
