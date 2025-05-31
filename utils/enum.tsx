/* Represents the states of a process.
 * Used to track the current status of a workflow / operation.
*/
export enum ProcessState {
    PENDING = 'Pending',
    CONFIRMED = 'Confirmed',
    CANCELED = 'Canceled',
}

export enum ProcessColor {
    PRIMARY = 'bg-primary-blue',
    SECONDARY = 'bg-secondary-blue',
    DANGER = 'bg-red-text',
    SUCCESS = 'bg-green-text',
    OUTPRIMARY = 'outlined bg-primary-blue',
}

export enum LocationFilterEnum {
    PICKUP = 'Pick-Up',
    DROPOFF = 'Drop-Off'
}