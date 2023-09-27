import React, {useEffect} from "react";
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem } from 'react-bootstrap';
import  Message  from '../components/Message';
import  {addToCart, removeFromCart}  from '../actions/cartActions';



function CartScreen({ history}) {
    const {id} = useParams()
    const location = useLocation();
    const navigate = useNavigate();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() =>{
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty] 
    )

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))

    }

    const processusPaiement = (id) =>{
        navigate('/expedition')
    }

    return(
        <Row>
            <Col md={8}>
            <h1>Shopping cart</h1>
            {
                cartItems.length === 0 ? (
                    <Message variant='info'>
                        Votre panier est vide <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                <Col md={2}> 
                                <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                <Link to={`/produit/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    {item.price} XOF
                                </Col>
                            
                                <Col md={3}>
                                <Form.Control as="select"
                                    value={item.qty}
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) =>(
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>))
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                <Button type='button'
                                variant="light"
                                onClick={() => removeFromCartHandler(item.product) }>
                                    <i className="fas fa-trash"></i>
                                </Button>
                                </Col>
                                </Row>
                            </ListGroupItem>
                        ))}

                    </ListGroup>
                )
            }
            </Col>
            <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <h2>sous-total ({cartItems.reduce((acc, item) => acc+ item.qty, 0)}) tapis</h2>
                        {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} XOF
                    </ListGroupItem>
                </ListGroup>

                <ListGroupItem>
                <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length===0}
                onClick={processusPaiement}>
                    Procéder au paiement
                </Button>
                </ListGroupItem>
            </Card>
            </Col>
            
        </Row>
    )
}

export default CartScreen;