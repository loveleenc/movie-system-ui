import type { DisplayedItem } from "../../types/cart"



const CartSeat = ({ seat, onRemovingItem }: { seat: DisplayedItem; onRemovingItem: (event: React.SyntheticEvent) => void; }) => {
    return (<>
        <div className="commonFontColor cartItemSeatNumber">{seat.seatNumber}</div>
        <div className="commonFontColor cartItemSeatPrice">{seat.price} &#8377;</div>
        <button id={seat.id.toString()} onClick={onRemovingItem}>Remove</button>
        <br />
    </>)
}

export default CartSeat;