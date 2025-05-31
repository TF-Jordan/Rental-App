export type PaymentMethod = 'mtn' | 'orange' | 'card';

export interface PaymentConfig {
    apiKey: string;
    transactionUrl: string;
    userId: string;
    paymentMethods: {
        [key in PaymentMethod]?: {
            merchantId: string;
            enabled: boolean;
        };
    };
}

export interface Transaction {
    id: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod: PaymentMethod;
    date: string;
    customer: {
        name: string;
        email: string;
    };
    vehicleRental: {
        vehicleId: string;
        vehicleName: string;
        withDriver: boolean;
        startDate: string;
        endDate: string;
        driverName?: string;
    };
}
