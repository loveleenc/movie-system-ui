import type { Seat as SeatType } from "../../types/tickets";
import Seat from "./Seat";

const TheatreRow = ({ seats, addOrRemoveSelection }: { seats: SeatType[]; 
  addOrRemoveSelection: (ticketId:string, previouslySelected:boolean) => void
 }) => {

  return (
    <>
      {seats.map((seat) => (
        <>
        <Seat ticketId={seat.id} status={seat.status} addOrRemoveSelection={addOrRemoveSelection}/>
        </>
      ))}
    </>
  );
};

export default TheatreRow;
