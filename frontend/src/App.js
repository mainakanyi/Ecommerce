import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
//import { useSelector } from 'react-redux';

function App() {

  // A default value is needed Somewhere at top-level modules of store to ensure that default value is singleton and avoid useless re-renders
  // const EMPTY_CART = { cartItems: [] };
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
//console.log("user "+JSON.stringify(userInfo));
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
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
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        {/* Routers are always on the main section exact means only if you're on that path */}

        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
