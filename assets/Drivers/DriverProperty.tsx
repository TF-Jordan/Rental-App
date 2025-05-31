export type StatusInfo = {
    color: string;
    text: string;
    bgColor: string;
};

export const getDriverStatusInfo = (status?: string): StatusInfo => {
    switch (status) {
        case "Active":
            return { color: '#10B981', text: 'Actif', bgColor: '#10B981' };
        case "Available":
            return { color: '#3B82F6', text: 'Disponible', bgColor: '#3B82F6' };
        case "Out_of_Service":
            return { color: '#EF4444', text: 'Hors service', bgColor: '#EF4444' };
        case "Emergency":
            return { color: '#F59E0B', text: 'Urgence', bgColor: '#F59E0B' };
        default:
            return { color: '#6B7280', text: 'Non défini', bgColor: '#6B7280' };
    }
};

export const DriverLocations=['Yaoundé', 'Douala', 'Bafoussam', 'Dschang'];