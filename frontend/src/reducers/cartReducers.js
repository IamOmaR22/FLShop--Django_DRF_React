import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,

    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

} from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
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

            case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)  // action.payload is the id of the product.
                }

            case CART_SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress:  action.payload  // payload is going to be the form data.
                }
            
                case CART_SAVE_PAYMENT_METHOD:
                return {
                    ...state,
                    paymentMethod:  action.payload
                }
    
        default:
            return state
    }
}
