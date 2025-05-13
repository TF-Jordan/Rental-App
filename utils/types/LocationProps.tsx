import { GeofenceProps } from "./GeofenceProps";

export interface LocationProps {
    id: number;
    pick_up:{
        date: Date;
        place: string;
    }
    drop_off:{
        date:  Date;
        place: string;
    }
    user:{
        id?:number;
        name: string;
        phone: string;
        address: string;
        city: string;
    }
    vehicle:{
        id: number;
        brand: string;
        model: string;
        year: number;
        image: string[];
    },
    driver?:{
        id: number;
        name: string | undefined;
    }

    payment_method: string;
    promo_formula:number;
    date: string;
    price: string;
    ride: GeofenceProps;
    paidWithPoints: true;
    bonusPoints: 50;
    status: "pending"|"completed"|"validated";
}
