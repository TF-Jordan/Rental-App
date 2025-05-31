// Fonction pour déterminer le statut de l'agence
export const AgencyStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const openHour = parseInt(agency.openingTime.split(':')[0]);
    const closeHour = parseInt(agency.closingTime.split(':')[0]);

    const isOpen = currentHour >= openHour && currentHour < closeHour;

    return {
        text: isOpen ? 'Ouvert' : 'Fermé',
        bgColor: isOpen ? '#10B981' : '#EF4444',
        color: '#FFFFFF'
    };
};