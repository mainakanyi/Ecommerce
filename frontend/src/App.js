import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import { useSelector } from 'react-redux';
//import { useSelector } from 'react-redux';

function App() {

  // A default value is needed Somewhere at top-level modules of store to ensure that default value is singleton and avoid useless re-renders
  // const EMPTY_CART = { cartItems: [] };
const cart = useSelector(state => state.cart);
const {cartItems} = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">RMK E-commerce</Link>
          </div>
          <div>
            <Link to="/cart">Cart
            {cartItems.length > 0 && (
                <span className="badge">{cartItems.length} </span>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        {/* Routers are always on the main section exact means only if you're on that path */}

        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
