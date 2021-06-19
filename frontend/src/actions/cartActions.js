import axios from "axios"

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // Local storage. When we refresh our page, it should be in local storage of browser application.
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))  // Key, value pair. cart from the store.js file.

}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))  // Update the local storage when remove an item.

}