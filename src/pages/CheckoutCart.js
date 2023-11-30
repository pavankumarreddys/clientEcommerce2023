import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { Layout } from '../components/Layout/Layout';
import axios from 'axios';
import toast from "react-hot-toast";

const CheckoutCart = () => {
  var token = localStorage.getItem("userToken");
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const prevesLocation = localStorage.getItem('currentLocation') || '/';

  // Get Braintree client token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error('Error fetching client token:', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handlePayment = async () => {
    let cart = {
      description:"pavan trail",
      price:10
    }
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Go back - Page not found">
      <div className="pnf">
        <div>
          {clientToken ? (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: 'vault',
                  },
                }}
                onInstance={(dropInInstance) => setInstance(dropInInstance)}
              />
              <button className="btn btn-success" onClick={handlePayment}>
                Buy
              </button>
            </>
          ) : (
            <div>
              <h1>Loading...</h1>
            </div>
          )}
        </div>

        <Link to={`http://localhost:3000${prevesLocation}`} className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default CheckoutCart;
