export type VehicleStatusInfo = {
    color: string;
    text: string;
    bgColor: string;
};

export const CarStatusInfo = (available?: boolean): VehicleStatusInfo => {
    if (available) {
        return { color: '#10B981', text: 'Disponible', bgColor: '#10B981' };
    } else {
        return { color: '#EF4444', text: 'Indisponible', bgColor: '#EF4444' };
    }
};