import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Fade from "react-reveal/Fade";

export default function HomeScreen() {
  const dispatch = useDispatch();
  //Use useSelector to get the state from the store
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <Fade bottom cascade>
    <div>
      {loading ? <LoadingBox></LoadingBox>
        :
        error ? <MessageBox variant="danger">{error}</MessageBox>
          :
          
          <div className="row center">

            {
              products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))
            }
          </div>
          
      }

    </div>
    </Fade>
  )
}