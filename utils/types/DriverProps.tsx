import {Scheduling} from "@/utils/types/ReservationProps";

export interface DriverProps{
    id: number;
    photo: string;
    first_name: string;
    last_name: string;
    age: number;
    license_number: string;
    license_type: string;
    address: string;
    phone: string;
    email: string;
    location?: string;
    documents?:{
        id_card:string;
        driver_licence:string;
    };
    vehicle_assigned?: {
        id: number;
        brand: string;
        model: string;
        year: number;
    }[];
    rating: number;
    insurance_provider?: string;
    insurance_policy?: string;
    profile_picture?: string; // Optional
    isSelected?: boolean | undefined;
    available: boolean;
    created_at: Date;
    status?: "Active" | "Available" | "Out_of_Service" | "Emergency";
    status_updated_at?: Date;
    status_updated_by?: string;
    scheduling?: Scheduling;
}

export interface FilterDriverProps {
    ratingRange: [number, number];
    ageRange: [number, number];
    location?: string; // Optional
}

export interface DriverListProps {
    drivers: DriverProps[];
    filters: FilterDriverProps;
}

export interface DriverCardProps extends DriverProps {
    onSelect: (driver: DriverProps | null) => void;
    isSelected: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}