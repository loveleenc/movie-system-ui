import type { ShowInformation } from "./show";
import type { TicketShow } from "./tickets";

export interface Item{
    id: number;
    ticket: TicketShow;
}

type ShowInformationWithoutId = Omit<ShowInformation, "id">;

export type DisplayedItem = {
    price: number;
    seatNumber: string;
    id: number;
}

export interface ItemsByMovie extends ShowInformationWithoutId{
    movie: string;
    items: DisplayedItem[]
}