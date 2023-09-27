import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, redirect, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

function OrderScreen() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [paymentNumber, setPaymentNumber] = useState('');
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    ).toFixed(2);
  }

  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId)) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const handleOrder = () => {
    console.log('MTN');
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Expedition</h2>
              <p>
                <strong>Nom: </strong> {order.user.name}
              </p>
              <p>
                <strong>Expedition: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {'  '}
                {order.shippingAddress.postalCode}, {'   '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Livré le {order.deliveredAt}</Message>
              ) : (
                <Message variant="warning">Commande non livrée</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Méthode de paiement</h2>
              <p>
                <strong>Méthode: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Payé le {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Commande non payée</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Tapis de la commande</h2>

              {order.orderItems.length === 0 ? (
                <Message variant="info">Vous n'avez pas de commande</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
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
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Détails de la commande</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tapis:</Col>
                  <Col>{order.itemsPrice} XOF</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Prix de livraison:</Col>
                  <Col>{order.shippingPrice} XOF</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Taxe:</Col>
                  <Col>{order.taxPrice} XOF</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{order.totalPrice} XOF</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay ? (
                    <Loader />
                  ) : (
                    <div>
                      {order.paymentMethod === 'MTN' && (
                        <div>
                          {/* Option de paiement MTN MoMo */}
                          <p>Choisissez MTN MoMo comme option de paiement :</p>
                          {/* Ajoutez ici le code pour intégrer MTN MoMo */}
                        </div>
                      )}

                      {order.paymentMethod === 'PayPal' && (
                        <PayPalScriptProvider
                          options={{
                            'client-id': 'ARg3HLxhLlYy3_Pk0VPy09SdlnhG6sMZ0ZpD0x5Oe1DTn_iw-t02scCOPNNf6GQmT0Rs57e6eQSQpqbU',
                          }}
                        >
                          <PayPalButtons
                            style={{ layout: 'horizontal' }}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: order.totalPrice,
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order.capture().then(function (details) {
                                successPaymentHandler(details);
                              });
                            }}
                          />
                        </PayPalScriptProvider>
                      )}

                      {order.paymentMethod === 'Orange' && (
                        <div>
                          {/* Option de paiement Orange Money */}
                          <p>Choisissez Orange Money comme option de paiement :</p>
                          {/* Ajoutez ici le code pour intégrer Orange Money */}
                        </div>
                      )}

                      {order.paymentMethod === 'Moov' && (
                        <div>
                          {/* Option de paiement Moov Money */}
                          <p>Choisissez Moov Money comme option de paiement :</p>
                          {/* Ajoutez ici le code pour intégrer Moov Money */}
                        </div>
                      )}
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
