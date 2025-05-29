// types/ownerTransaction.ts
export type OwnerTransaction = {
    id: string;
    date: string;
    amount: number;
    type: 'payment' | 'refund' | 'deposit' | 'withdrawal';
    status: 'completed' | 'pending' | 'failed';
    vehicle: {
        id: string;
        make: string;
        model: string;
        image: string;
    };
    driver?: {
        id: string;
        name: string;
        avatar: string;
    };
    paymentMethod?: {
        type: 'paypal' | 'card';
        brand?: string;
        last4?: string;
    };
};
