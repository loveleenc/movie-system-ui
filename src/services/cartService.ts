import axios, { type AxiosRequestConfig } from "axios"
import type { Item } from "../types/cart";
import config from "../utils/config";

const baseUrl = config.BASE_URL;

const getCart = ():Promise<Item[]> => {
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

const removeItemFromCart = (itemId: string) => {
    const csrfToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    const requestConfig: AxiosRequestConfig = {
        params: { itemId: itemId }, 
        withCredentials: true, 
        headers: {
            "X-XSRF-TOKEN": csrfToken,
        }
    }
    return axios.patch(`${baseUrl}/cart/remove`, {}, requestConfig);
}

const checkout = () => {
    const csrfToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    const requestConfig: AxiosRequestConfig = {
        withCredentials: true, 
        headers: {
            "X-XSRF-TOKEN": csrfToken,
        }
    }
    return axios.post(`${baseUrl}/cart/checkout`, {}, requestConfig);
}

export default {
    addMultipleItemsToCart,
    getCart,
    removeItemFromCart,
    checkout
} 