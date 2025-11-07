import type { Item } from "../../types/cart"

const Checkout = ({items, displayCheckout, onBookingTickets}: {items: Item[]; displayCheckout: boolean; 
    onBookingTickets: () => void
}) => {
    const total = items.map(item => item.ticket.price).reduce((a, c) => a + c, 0);
    const tax = +(total * 0.05).toFixed(2);

    return (
        <div style={{display: displayCheckout ? '' : 'none'}} className="checkoutContainer">
            <h1 className="commonFontColor">Order Summary</h1>
            <hr />
            <div className="commonFontColor subtotalText">Subtotal</div>
            <div className="commonFontColor subtotalValue">{total} &#8377;</div>
            <div className="commonFontColor taxText">Tax</div>
            <div className="commonFontColor taxValue">{tax} &#8377;</div>
            <h3 className="commonFontColor totalText">Total</h3>
            <h3 className="commonFontColor totalValue">{total + tax} &#8377;</h3>
            <div className="bookTicketsButtonContainer">
                <button onClick={onBookingTickets} className="cartButton">Book tickets</button>
            </div>
        </div>
    )
}

//{selectedSeats.map(seat => seat.price).reduce((a, c) => a + c, 0)} 
export default Checkout