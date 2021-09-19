// A store has two things (Initial State and a reducer - returns a new state)
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';



export const initialState = {
        cart: {
        cartItems: localStorage.getItem('cartItems') !== 'undefined'
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
};
// const reducer = (state, action) => {
//     return { products: data.products };
// }
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

//Adding store to dev tools on the browser
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Now create a store with the two items
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
    );
export default store;