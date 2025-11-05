export enum SeatStatus {
    AVAILABLE = 'available',
    BOOKED = 'booked',
}

export enum SeatType {
    GOLD = 'Gold',
    SILVER = 'Silver',
    BRONZE = 'Bronze'
}

type SeatData = {
    seatNumber: string;
    type:SeatType;
}

export type Ticket = {
    status: SeatStatus;
    id: string;
    price: number;
    seat: SeatData;
}

export type Seat = {
    status: SeatStatus;
    price: number;
    id: string;
    type: SeatType;
    number: number;
}

export interface RowAndSeatNumber {
  row: string;
  number: number;
}

export interface RowTypes {
  [key: string]: Seat[];
}