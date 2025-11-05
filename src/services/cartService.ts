import axios, { type AxiosRequestConfig } from "axios"

const baseUrl = "http://localhost:8080"

const getCart = () => {
    return axios.get(`${baseUrl}/cart`, { withCredentials: true }).then(response => response.data);
}

const addItemToCart = (ticket: string) => {
    const csrfToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    const requestConfig: AxiosRequestConfig = {
        params: { ticketId: ticket }, 
        withCredentials: true, 
        headers: {
            "X-XSRF-TOKEN": csrfToken,
        }
    }
    return axios.patch(`${baseUrl}/cart/add`, {}, requestConfig);
}

const addMultipleItemsToCart = async (tickets: string[]) => {
    const ticketsAddedToCart = new Array<string>();

    const cart = await getCart();
    if (cart.length + tickets.length > 10) {
        throw new Error("Cart shall exceed maximum capacity with these additions.")
    }

    for (let i = 0; i < tickets.length; i++) {
        const response = await addItemToCart(tickets[i])
        ticketsAddedToCart.push(response.data.ticket.id);
    }
    return ticketsAddedToCart;
}

export default {
    addMultipleItemsToCart
} 