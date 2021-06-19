import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload  // payload will be the product.
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                return {
                    ...state,  // spread operator for current state.
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)   // Actual cart items.
                }
            }
            else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
    
        default:
            return state
    }
}
