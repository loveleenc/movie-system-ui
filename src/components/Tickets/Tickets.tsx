import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ticketService from "../../services/ticketService";
import "./../../styles/seats.css";
import Header from "../Common/Header";
import type { RowTypes, Seat } from "../../types/tickets";
import TheatreRow from "./TheatreRow";
import TicketStatusLegend from "./TicketStatusLegend";
import SelectionOverview from "./SelectionOverview";
import cartService from "../../services/cartService";
import NotificationDialog from "../Common/NotificationDialog";

const Tickets = () => {
  const showId = useParams<string>().id as string;
  const [rows, setRows] = useState<RowTypes | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const notificationDialogRef = useRef<HTMLDialogElement | null>(null);
  const [notification, setNotification] = useState<string>('');
  const [notificationCounter, setNotificationCounter] = useState<number>(0);



  useEffect(() => {
            if(notification !== ""){
                notificationDialogRef.current?.showModal();
            }
    }, [notificationCounter])


  useEffect(() => {
    ticketService.getTicketsForShow(showId).then((response) => {
      const seatRows = ticketService.getSeatRows(response.data);
      setRows(seatRows);
    });
  }, []);


  const getSelectedSeats = (ticketIds: string[]): Seat[] => {
    let seats = new Array();
    const theatreRows = Object.values(rows as RowTypes);
    for (let i = 0; i < theatreRows.length; i++) {
      const selectedSeats = theatreRows[i].filter(seat => ticketIds.includes(seat.id))
      seats = seats.concat(selectedSeats);
    }
    return seats;
  }

  const addOrRemoveSelectedSeat = (ticketId: string, previouslySelected: boolean) => {
    if (previouslySelected) {
      setSelectedTickets(selectedTickets.filter(ticket => ticket !== ticketId));
    }
    else {
      setSelectedTickets(selectedTickets.concat(ticketId));
    }

  }

  const onAddingItemsToCart = async () => {
    try {
      await cartService.addMultipleItemsToCart(selectedTickets);
    }
    catch (error) {
      setNotification("Unable to add item to the cart. Ticket may no longer be available, or cart may be full.")
      setNotificationCounter(notificationCounter + 1)
      //TODO: display cart capacity exceeded
    }
  }

  if (rows === null) {
    return (
      <>
        <Header />
        <h1>Book seats</h1>
        <div>
          {
            //Todo: show that tickets are not available at the moment.
          }
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <h1 className="commonFontColor">Book seats</h1>
      <div>
        <NotificationDialog message={notification} dialogRef={notificationDialogRef}/>
        <TicketStatusLegend />
        <div className="theatreContainer">
          <div className="rowIdContainer">
              {Object.keys(rows)
                .sort()
                .map((row) => (
                  <div className="rowId">{row}</div>
                ))}
          </div>
          <div className="seatRowsContainer">
            <div className="screenDesign">SCREEN</div>
            <div className="seatContainer">
              {Object.keys(rows)
                .sort()
                .map((row) => (
                  <>
                    <TheatreRow seats={rows[row]} addOrRemoveSelection={addOrRemoveSelectedSeat} />
                    <br />
                  </>
                ))}
            </div>
          </div>
        </div>
        <SelectionOverview selectedSeats={getSelectedSeats(selectedTickets)} onAddingItemsToCart={onAddingItemsToCart}/>

      </div>
    </>
  );
};

export default Tickets;
