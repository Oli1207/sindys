import React, {useState, useEffect} from 'react';
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Loader  from '../components/Loader';
import  Message  from '../components/Message';
import FormContainer from '../components/FormContainer';
import  CheckoutSteps  from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {

    const dispatch =useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    

    const [paymentMethod, setPaymentMethod] = useState('')

    if(!shippingAddress.address){
        navigate('/expedition')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/confirmation_de_la_commande')
    }
  return (


    <FormContainer>
        <CheckoutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Choisissez votre méthode de paiement</Form.Label>
                    <Col>
                    <Form.Check
                    type='radio'
                    label='Paypal or Credit Cart'
                    id='paypal'
                    value='PayPal'
                    name='paymentMethod'
                    checked={paymentMethod == 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}>

                    </Form.Check>
                    
                          {/* Moov Payment Option */}
            <Form.Check
              type="radio"
              label="MTN"
              id="mtn"
              name="paymentMethod"
              value="MTN"
              checked={paymentMethod === 'MTN'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
                    {/* Orange Payment Option */}
            <Form.Check
              type="radio"
              label="Orange"
              id="orange"
              name="paymentMethod"
              value="Orange"
              checked={paymentMethod === 'Orange'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
                    {/* Binance Payment Option */}
            <Form.Check
              type="radio"
              label="Binance"
              id="binance"
              name="paymentMethod"
              value="Binance"
              checked={paymentMethod === 'Binance'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
                     {/* Moov Payment Option */}
            <Form.Check
              type="radio"
              label="Moov"
              id="moov"
              name="paymentMethod"
              value="Moov"
              checked={paymentMethod === 'Moov'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
                    </Col>
                </Form.Group>


            <Button type='submit' variant='primary'>Suivant</Button>
        </Form>

    </FormContainer>
  )
}

export default PaymentScreen