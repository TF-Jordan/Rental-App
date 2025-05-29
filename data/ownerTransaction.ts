// data/ownerTransactions.ts
import {OwnerTransaction} from "@/utils/types/OwnerTransaction";


export const OWNER_TRANSACTIONS: OwnerTransaction[] = [
    {
        id: 'txn1',
        date: '2025-05-28T14:30:00Z',
        amount: 80000,
        type: 'payment',
        status: 'completed',
        vehicle: {
            id: 'veh1',
            make: 'Tesla',
            model: 'Model 3',
            image: '@/assets/vehicles/tesla model 3.jpg',
        },
        driver: {
            id: 'drv1',
            name: 'Jean Dupont',
            avatar: 'https://example.com/avatars/drv1.jpg',
        },
        paymentMethod: {
            type: 'card',
            brand: 'Visa',
            last4: '1234',
        },
    },{
        id: 'txn2',
        date: '2025-05-27T14:30:00Z',
        amount: 60000,
        type: 'payment',
        status: 'completed',
        vehicle: {
            id: 'veh2',
            make: 'GMC',
            model: 'Arcadia',
            image: '@/assets/vehicles/GMC Arcadia.jpg',
        },
        driver: {
            id: 'drv2',
            name: 'Michel LeBlanc',
            avatar: 'https://example.com/avatars/drv1.jpg',
        },
        paymentMethod: {
            type: 'card',
            brand: 'MasterCard',
            last4: '12345',
        },
    },
    // Ajoutez d'autres transactions ici
];
