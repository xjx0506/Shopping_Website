import React, {useState, useEffect} from 'react'
import './Payment.css'
import {useStateValue} from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from './reducer';
import { db } from "./firebase"
import axios from './axios';

function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method : 'post',
                url : `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]) 
    //whenever the basket changes, getClientSecret will be execute to make the request, and setClientSecret will update the secret 

    console.log('the client secret is >>> ', clientSecret)
    console.log('❤', user)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {

            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket:basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            dispatch({
                type: 'EMPTY_BASKET',
            })
            
            history.replace('/orders')
        })
    }

    const handleChange = e =>{
        //listen for changes in the card element
        // and display any errors as the customer type their card details
        setDisabled(e.empty);
        setError(e.error? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>456 goodlane</p>
                        <p>Victoria BC</p>
                    </div>
                </div>
                
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(item=>(
                            <CheckoutProduct
                                id ={item.id}
                                title = {item.title}
                                image = {item.image}
                                price = {item.price}
                                rating = {item.rating}
                            /> 
                        ))}
                    </div>
                </div>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        {/* stripe stuff */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) =>(
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
