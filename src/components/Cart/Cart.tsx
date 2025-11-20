import { useEffect, useRef, useState } from "react"
import Header from "../Common/Header"
import cartService from "../../services/cartService"
import type { DisplayedItem, Item, ItemsByMovie } from "../../types/cart"
import CartMovieItem from "./CartMovieItem"
import "../../styles/cart.css"
import Checkout from "./Checkout"
import ticketService from "../../services/ticketService"
import NotificationDialog from "../Common/NotificationDialog";
import { useNavigate } from "react-router-dom"

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
    const [displayCheckout, setDisplayCheckout] = useState<boolean>(false);
    const notificationDialogRef = useRef<HTMLDialogElement | null>(null);
    const [notificationCounter, setNotificationCounter] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        cartService.getCart()
            .then(data => setItems(data));
    }, []);

    useEffect(() => {
        if(message !== ""){
            notificationDialogRef.current?.showModal()
        }
    }, [notificationCounter]);

    const onRemovingItem = (event: React.SyntheticEvent) => {
        const id = (event.target as HTMLInputElement).id;
        cartService.removeItemFromCart(id)
            .then(_response => {
                const filteredItems = items.filter(item => item.id.toString() !== id)
                setItems(filteredItems);
                setDisplayCheckout(false);
            });
    }

    const onCheckout = () => {
        cartService.checkout()
            .then(_response => setDisplayCheckout(true))
            .catch(_error => {
                setMessage("Something went wrong during checkout. Selected tickets may no longer be available.")
            }
            )
            setNotificationCounter(notificationCounter + 1);
    }

    const onBookingTickets = () => {
        ticketService.bookTickets()
            .then(_response => {
                setItems([]);
                setDisplayCheckout(false);
                setMessage("Tickets have been booked successfully! Redirecting to home...")
                setTimeout(() => navigate("/"), 2000);
            })
            .catch(_error => {
                setMessage("Something went wrong while booking the tickets. Selected tickets may no longer be available.")
            })
            setNotificationCounter(notificationCounter + 1);
    }

    if (items.length == 0) {
        return (
            <>
                <Header />
                <NotificationDialog message={message} dialogRef={notificationDialogRef} />
                <div className="cartContainer">
                    <h1 className="commonFontColor">Cart</h1>
                    <div className="commonFontColor">Cart is empty!</div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="cartContainer">
                <h1 className="commonFontColor">Cart</h1>
                <hr />
                {parseCartData(items).map((item, index) => <CartMovieItem key={index} item={item} onRemovingItem={onRemovingItem} />)}
                <div className="cartButtonContainer">
                    <button className="cartButton" onClick={onCheckout} style={{ display: items.length !== 0 ? '' : 'none' }}>checkout</button>
                </div>
            </div>
            <Checkout items={items} displayCheckout={displayCheckout} onBookingTickets={onBookingTickets}/>
        </>
    )
}

export default Cart