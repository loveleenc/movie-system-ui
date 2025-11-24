import TheatreRow from "../components/Tickets/TheatreRow";
import { SeatType } from "./tickets";

export type Theatre = {
    name: string;
    location: string;
    id: number;

}

export type NewTheatre = {
    theatreRows: TheatreRow[],
    name: string;
    location: string;
};


export type TheatreRow = {
    seatType: SeatType;
    seatPrice: number;
    seatCount: number;
    rowLetter: string;
}