import { useEffect, useRef, useState } from "react";
import { SeatStatus, type TicketShow } from "../../types/tickets";
import ticketService from "../../services/ticketService";
import "../../styles/userTickets.css"
import timeHelper from "../../utils/common";
import NotificationDialog from "../Common/NotificationDialog";

const UserTicket = ({ticket, onTicketCancellation}: {ticket: TicketShow; onTicketCancellation?: (ticketId:string) => void}) => {
    return (
        <div className="userTicketContainer commonFontColor">
            <div className="userTicketStatusText">Status</div>
            <div className="ticketStatusBox">
                <div>{ticket.status.toLocaleUpperCase()}</div>
            </div>
            <hr className="ticketHorizontalLine"/>
            <div className="ticketPrice">{ticket.price} &#8377;</div>
            <div className="userTicketSeatText">Seat</div>
            <div className="userTicketSeat">{ticket.seat.seatNumber}</div>
            <div className="movieName">{ticket.show.movie.name}</div>
            <div className="movieLanguage">{ticket.show.language}</div>
            <div className="movieDateAndTime">{timeHelper.getDate(ticket.show.startTime.toString())}, {timeHelper.getTimeInHHMM(ticket.show.startTime.toString())} - {timeHelper.getTimeInHHMM(ticket.show.endTime.toString())}</div>
            <div className="theatreName">{ticket.show.theatre.name}</div>
            <div className="theatreLocation">{ticket.show.theatre.location}</div>
            {onTicketCancellation !== undefined ? <button onClick={() => (onTicketCancellation as (ticketId:string) => void)(ticket.id) } className="cancelBookingButton">Cancel booking</button> : ''}
        </div>
    )
}


const UserTickets = () => {
    const [pastTickets, setPastTickets] = useState<TicketShow[]>([]);
    const [upcomingTickets, setUpcomingTickets] = useState<TicketShow[]>([]);
    const [displayPastTickets, setDisplayPastTickets] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>('');
    const notificationDialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        ticketService.getTicketsForUser()
            .then(response => {
                const tickets = response.data;
                setUpcomingTickets(tickets.filter(ticket => ticket.status === SeatStatus.BOOKED));
                setPastTickets(tickets.filter(ticket => ticket.status !== SeatStatus.BOOKED));
            });
    }, []);

    const onTicketCancellation = (ticketId:string) => {
        ticketService.cancelBooking(ticketId)
            .then(_response => {
                setUpcomingTickets(upcomingTickets.filter(ticket => ticket.id !== ticketId));
                notificationDialogRef.current?.showModal();
                setNotification("Booked ticket cancelled successfully")
            })
            .catch(_error =>{
                notificationDialogRef.current?.showModal();
                setNotification("Unable to cancel booking.")
            });

    }

    return (

        <div className="profileItemViewContainer">
        <NotificationDialog message={notification} dialogRef={notificationDialogRef}/>
            <div style={{'textAlign': 'center'}}>
                <button onClick={() => setDisplayPastTickets(true)} className="ticketTypeText">Past</button>
                <button onClick={() => setDisplayPastTickets(false)} className="ticketTypeText">Upcoming</button>
            </div>
            
            <div style={{display: displayPastTickets ? '' : 'none'}}>
                {pastTickets.map(ticket => <UserTicket ticket={ticket}/>)}
            </div>
            <div style={{display: displayPastTickets ? 'none' : ''}}>
                {upcomingTickets.map(ticket => <UserTicket ticket={ticket} onTicketCancellation={onTicketCancellation}/>)}
            </div>
        </div>
    )
}


export default UserTickets;