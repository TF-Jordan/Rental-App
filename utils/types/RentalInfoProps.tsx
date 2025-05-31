import { ReactNode } from "react";
import { DateValue } from "react-aria-components";


export interface LocationProps {
    id: string;
    user: {
        id: number,
        name: string;
        phone: string;
        address: string;
        image: string;
    }
    vehicle:{
        id: number;
        image: string[];
        brand: string;
    },
    driver?: {
        id: number;
    }
    pick_up:{
        date:  Date;
        place: string;
    };
    drop_off:{
        date: Date;
        place: string;
    }
    payment_method: string;
    promo_formula:number;
    date: string;
    price: number;
    ride?: geofence;
    paidWithPoints?: boolean ;
    bonusPoints?: number ;
    status: "pending"|"completed"|"cancelled";
}


export interface rentalInfoProps {
    pick_up:{
        date: DateValue | string | ReactNode | Date;
        place: string;
    }
    drop_off:{
        date:  DateValue | string | ReactNode;
        place: string;
    }
    user:{
        id?:number;
        name: string;
        phone: string;
        address: string;
        city: string;
    }
    driver?:{
        id: number;
        name: string | undefined;
    }
    payment_method: string;
    promo_code: string;
}


interface geofence{
    geofence_id: number;
    event: string;
    points:{
        latitude: number;
        longitude: number;
        accuracy: number;
        timestamp: Date;
    }[];
}
