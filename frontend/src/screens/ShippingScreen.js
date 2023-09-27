import React, {useState, useEffect} from 'react';
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Loader  from '../components/Loader';
import  Message  from '../components/Message';
import FormContainer from '../components/FormContainer';
import  CheckoutSteps  from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'


function ShippingScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [add, setAdd] = useState('')

    useEffect(() =>(
        navigator.geolocation.getCurrentPosition(pos=>{
          const {latitude, longitude} = pos.coords
          console.log(latitude, longitude)
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          fetch (url).then(res=>res.json()).then(data=>setAdd(data.address))
    
        })
      ))

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        navigate('/paiement')
    }

  
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 step4/>
        
        <h1>Expedition</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
                <Form.Label>Adresse de livraison</Form.Label>
                <Form.Control 
                required
                    type='text'
                    placedholder='Votre adresse'
                    value={address ? address : `${add.city},${ add.state },${add.country}`}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='ville'>
                <Form.Label>Ville</Form.Label>
                <Form.Control 
                required
                    type='text'
                    placedholder='Votre ville'
                    value={city? city:add.state}
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Code Postal</Form.Label>
                <Form.Control 
                required
                    type='text'
                    placedholder='Votre code postal'
                    value={postalCode? postalCode: ''}
                    onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Pays</Form.Label>
                <Form.Control 
                required
                    type='text'
                    placedholder='Votre pays'
                    value={country ? country: add.country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>


<Button type='submit' variant='primary'>
    Suivant
</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen