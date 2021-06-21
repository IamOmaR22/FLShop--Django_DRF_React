import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { orderCreateReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
})

// cartItems is the key from cartActions local storage.
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []

// userInfo is the key from userActions local storage.
const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null  // If can't find a user then the value is null.

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}  // {} means empty object


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store