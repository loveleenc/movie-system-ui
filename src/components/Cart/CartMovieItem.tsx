import type { ItemsByMovie } from "../../types/cart";
import CartSeat from "./CartSeat";


const CartMovieItem = ({ item, onRemovingItem }: {item: ItemsByMovie; onRemovingItem: (event: React.SyntheticEvent) => void;}) => {

    return (
        <div className="cartMovieItemContainer">
            <h2 className="movieDetailsCart commonFontColor">{item.movie}</h2>
            <div className="movieDetailsCart commonFontColor">{item.startTime} - {item.endTime}</div>
            <div className="movieDetailsCart commonFontColor">{item.date}</div>
            <div className="movieItemSeatsContainer">
                <div className="seatsTitle commonFontColor">Seats</div>
                {item.items.map((seat, index) => <CartSeat key={index} seat={seat} onRemovingItem={onRemovingItem}/>)}
            </div>
        </div>
    )
}

export default CartMovieItem;