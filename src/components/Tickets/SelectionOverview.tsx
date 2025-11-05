import type { Seat } from "../../types/tickets";

const SelectionOverview = ({ selectedSeats, onAddingItemsToCart }: { selectedSeats: Seat[];
    onAddingItemsToCart: () => void
 }) => {

    return (
        <div className="selectionOverview">
            <div className="commonFontColor seatCount">{selectedSeats.length} seats</div>
            <div className="commonFontColor seatPrice">{selectedSeats.map(seat => seat.price).reduce((a, c) => a + c, 0)} &#8377;</div>
            <button onClick={onAddingItemsToCart} className="commonFontColor addToCartButton">Add to cart</button>
        </div>
    )
}

export default SelectionOverview;