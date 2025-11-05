

const TicketStatusLegend = () => {
    return (
        <div className="ticketStatusLegend">
            <div className="statusLegend availableStatus" />
            <div className="statusText availableStatusText">AVAILABLE</div>
            <div className="statusLegend bookedStatus" />
            <div className="statusText bookedStatusText">BOOKED</div>
            <div className="statusLegend selectedStatus" />
            <div className="statusText selectedStatusText">SELECTED</div>
        </div>
    )
}

export default TicketStatusLegend