import { useEffect, useState } from "react"
import Header from "../Header"
import cartService from "../../services/cartService"
import type { DisplayedItem, Item, ItemsByMovie } from "../../types/cart"
import CartMovieItem from "./CartMovieItem"
import "../../styles/cart.css"

const createDisplayedItem = (item: Item): DisplayedItem => {
    return {
        price: item.ticket.price,
        seatNumber: item.ticket.seat.seatNumber,
        id: item.id
    }
}

const createNewMovieByItemsObject = (item: Item): ItemsByMovie => {
    return {
        movie: item.ticket.show.movie.name,
        startTime: new Date(item.ticket.show.startTime).toLocaleTimeString("en-US", {
            timeStyle: "short",
        }),
        endTime: new Date(item.ticket.show.endTime).toLocaleTimeString("en-US", {
            timeStyle: "short",
        }),
        date: new Date(item.ticket.show.startTime).toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }),
        items: [createDisplayedItem(item)]
    }
}

const showExistsInList = (item: Item, movieItem: ItemsByMovie): boolean => {
    return item.ticket.show.movie.name === movieItem.movie &&
        (new Date(item.ticket.show.startTime).toLocaleTimeString("en-US", {
            timeStyle: "short",
        }) === movieItem.startTime);
}

const parseCartData = (items: Item[]): ItemsByMovie[] => {
    const itemsByMovie = new Array<ItemsByMovie>();

    items.forEach(item => {
        const movie = itemsByMovie.find(movieItem => showExistsInList(item, movieItem));
        const displayedItem = createDisplayedItem(item);
        if (movie !== undefined) {
            movie.items.push(displayedItem);
        }
        else {
            itemsByMovie.push(createNewMovieByItemsObject(item));
        }

    });

    return itemsByMovie;
}

const Cart = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        cartService.getCart()
            .then(data => setItems(data));
    }, []);

    const onRemovingItem = (event: React.SyntheticEvent) => {
        const id = (event.target as HTMLInputElement).id;
        cartService.removeItemFromCart(id)
            .then(_response => {
                const filteredItems = items.filter(item => item.id.toString() !== id)
                setItems(filteredItems);
            })
    }

    return (
        <>
            <Header />
            <div className="cartContainer">
                <h1 className="commonFontColor">Cart</h1>
                <hr />
                {parseCartData(items).map((item, index) => <CartMovieItem key={index} item={item} onRemovingItem={onRemovingItem} />)}
            </div>
        </>
    )
}

export default Cart