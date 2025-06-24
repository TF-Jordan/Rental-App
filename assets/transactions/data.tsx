import { Transaction } from '@/utils/types/payment'; // adapte le chemin à ton projet
import transactions from './transaction.json'

export function parseTransactions(data: any[]): Transaction[] {
    return data.map((item) => ({
        id: item.id,
        amount: Number(item.amount),
        status: item.status,
        paymentMethod: item.paymentMethod,
        date: item.date,
        customer: {
            name: item.customer.name,
            email: item.customer.email
        },
        vehicleRental: {
            vehicleId: item.vehicleRental.vehicleId,
            vehicleName: item.vehicleRental.vehicleName,
            withDriver: Boolean(item.vehicleRental.withDriver),
            startDate: item.vehicleRental.startDate,
            endDate: item.vehicleRental.endDate,
            driverName: item.vehicleRental.driverName // facultatif
        }
    }));
}
 export let transactionsData=parseTransactions(transactions);