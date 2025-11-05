import axios from "axios";
import type {
  Ticket,
  RowAndSeatNumber,
  RowTypes,
  Seat,
} from "../types/tickets";

const baseUrl: string = "http://localhost:8080";

const getTicketsForShow = (showId: string) => {
  return axios.get(`${baseUrl}/tickets?showId=${showId}`, {
    withCredentials: true,
  });
};

const getRowAndSeatNumber = (seatNumber: string): RowAndSeatNumber => {
  const seatNumberPattern = /\d+/;
  const match = seatNumberPattern.exec("A12");
  if (match !== null) {
    return {
      number: Number(seatNumber.substring(match.index)),
      row: seatNumber.substring(0, match.index),
    };
  }
  throw new Error("Received seat number does not contain number of the seat");
};

const getSeatRows = (tickets: Ticket[]): RowTypes => {
  const rows: RowTypes = {};
  for (let i = 0; i < tickets.length; i++) {
    const ticket: Ticket = tickets[i];
    const rowAndSeatNumber = getRowAndSeatNumber(ticket.seat.seatNumber);
    const seat: Seat = {
      status: ticket.status,
      price: ticket.price,
      id: ticket.id,
      type: ticket.seat.type,
      number: rowAndSeatNumber.number,
    };

    if (
      Object.keys(rows).find((row: string) => row === rowAndSeatNumber.row) !==
      undefined
    ) {
      rows[rowAndSeatNumber.row].push(seat);
    } else {
      rows[rowAndSeatNumber.row] = new Array();
    }
  }
  Object.values(rows).forEach((seatRow) => seatRow.sort((a, b) => a.number - b.number));
  return rows;
};

export default {
  getTicketsForShow,
  getSeatRows,
};
