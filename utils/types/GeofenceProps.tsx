export interface GeofenceProps {
    geofence_id: number;
    event: string;
    points:{
        latitude: number;
        longitude: number;
        accuracy: number;
        timestamp: Date;
    }[];
}
