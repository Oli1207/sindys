import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Loader  from '../components/Loader';
import  Message  from '../components/Message';
import { createOrder, getOrderDetails } from '../actions/orderActions'
import  CheckoutSteps  from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { listeCoupons } from '../actions/couponActions'


function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const [couponCode, setCouponCode] = useState('')
    const _coupon_code = 'BEAUTAPIS';
  
    
    //const couponListe = useSelector(state => state.couponListe)
    //const {coupon_code, errorC, successC } = orderCreate
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success } = orderCreate
  
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 1500 : 10).toFixed(2)
    cart.taxPrice = Number((0.18) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const [discountedTotal, setDiscountedTotal] = useState(cart.totalPrice);

    if(!cart.paymentMethod) {
        navigate('/paiement')
    }

    const handleAddCoupon = (e) =>{
        e.preventDefault()
        if (couponCode === _coupon_code) {
            // Calculate the discount (20% of cart.totalPrice)
            const discount = (0.20 * cart.totalPrice).toFixed(2);

            // Apply the discount to the total price
            const newDiscountedTotal = (cart.totalPrice - discount).toFixed(2);

            // Update the state with the discounted total
            setDiscountedTotal(newDiscountedTotal);

            // Handle any additional actions for a valid coupon code here
            console.log(`Coupon code is valid. Discount applied: ${discount} XOF`);
        } else {
            // Handle an invalid coupon code here
            setDiscountedTotal(cart.totalPrice);
        }
    }

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            itemsPrice:cart.itemsPrice,
            paymentMethod:cart.paymentMethod,
            shippingPrice:parseFloat(cart.shippingPrice),
            taxPrice:parseFloat(cart.taxPrice),
            totalPrice:parseFloat(discountedTotal),
            
            
    }))}

    useEffect(() => {
        if(success) {
       
            navigate(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
            
            
        }

    
    }, [dispatch, order, success])
    


    console.log(error)
  
   
    

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Expedition</h2>
                <p>
                    <strong>Expedition: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}
                    {'  '}
                    {cart.shippingAddress.postalCode},
                    {'   '}
                    {cart.shippingAddress.country}
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Méthode de paiement</h2>
                <p>
                    <strong>Méthode: </strong>
                    {cart.paymentMethod}
                
                </p>
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Tapis de la commande</h2>
                
                    
                    {cart.cartItems.length === 0 ? <Message variant='info'>
                        Votre panier est vide
                    </Message> : (
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>

                                        <Col>
                                        <Link to={`/produit/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.qty} x {item.price} XOF = {(item.qty * item.price).toFixed(2)} XOF
                                        </Col>
                                    </Row>

                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                
                
            </ListGroup.Item>


            
            </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Détails de la commande</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tapis:
                                    </Col>
                                    <Col>
                                        {cart.itemsPrice} XOF
                                    </Col>
                                </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Prix de livraison:</Col>
                                <Col>{cart.shippingPrice} XOF</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Taxe:</Col>
                                <Col>{cart.taxPrice} XOF</Col>
                            </Row>
                        </ListGroup.Item>
                            
                        <ListGroup.Item> 
                        <Form onSubmit={handleAddCoupon}>
        <Form.Group controlId='coupon'>
                <Form.Label>Code de réduction</Form.Label>
                <Form.Control 
                required
                    type='text'
                    placedholder='Vous avez un bon de réduction? Saisissez le ici !'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                >
                </Form.Control>
                <Button type='submit' variant='primary'>
                                Appliquer le coupon
                </Button>
            </Form.Group>

        </Form>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>{couponCode === _coupon_code ? discountedTotal : cart.totalPrice} XOF</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error.message}</Message>}
                              </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}
                                
                            >
                                Confirmez la commande
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen