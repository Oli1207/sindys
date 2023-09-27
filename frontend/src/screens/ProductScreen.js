import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, Button, ListGroup, Card, Form } from 'react-bootstrap';
import Evaluation from '../components/Evaluation';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listeProduitsDetails, createProductReview } from '../actions/produitAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/produitConstant'
import "../i18n"
import { useTranslation } from 'react-i18next';



function ProductScreen({ history }) {
    const { id } = useParams();
    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const {t} = useTranslation()
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const produitDetails = useSelector(state => state.produitDetails)
    const {loading, error, product} = produitDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview, 
        error: errorProductReview,
        success: successProductReview
    } = productReviewCreate
    


    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch(({ type: PRODUCT_CREATE_REVIEW_RESET}))
        }

    dispatch(listeProduitsDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
    navigate(`/panier/${id}?quantite=${qty}`, {state: {qty}})
   }

   const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            id, {
                rating,
                comment
            }
        ))
   }
   const cart = useSelector(state => state.cart)
   const  { cartItems } = cart
  return (
    <div>
    <Link to='/' className='btn btn-light my-3' >
            Précédent
        </Link>
        { loading ?
        <Loader/>
        : error
            ? <Message variant='danger'>{error}</Message>
        :(
            <div>
            <Row>
            <Col md={6}>
                <Image src={product.image}  alt={product.name} fluid/>
            </Col>


            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        motif: {product.motif}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Evaluation value={product.rating} text={`${product.numReviews} évaluations`} color={'#f8e825'} />
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price: {product.price} XOF
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Matière: {product.matiere}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Taille: {product.taille} m
                    </ListGroup.Item>


                </ListGroup>
                
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Prix:</Col>
                                <Col><strong>{product.price} XOF</strong></Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Statut:</Col>
                                <Col>
                                    {product.countInStock >0 ? 'Disponible' : 'Bientôt disponible'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Quantité</Col>
                                    <Col xs='auto' className='my-1'>
                                    <Form.Control as="select"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}>
                                        {
                                            [...Array(product.countInStock).keys()].map((x) =>(
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>))
                                        }
                                    </Form.Control>
                                    
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ) }

                        <ListGroup.Item>
                            <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock ==0}  type="button">Ajouter au panier</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <h4>Evaluations</h4>
                {product.reviews.length === 0 && <Message variant='info'>Pas d'évaluation</Message>}
                <ListGroup>
                    {product.reviews.map((review) =>(
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Evaluation value={review.rating} color='#f8e825'/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>

                        </ListGroup.Item>
                       
                    ))}

                        <ListGroup.Item>
                            <h4>Evaluer ce tapis</h4>
                            {loadingProductReview && <Loader/>}
                            {successProductReview && <Message variant='success'> Merci pour votre retour ! </Message>}
                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                    <Form.Label>Evaluation</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >

                                            <option value=''>Notez le tapis...</option>
                                            <option value='1'>1 - Tapis de mauvaise qualité</option>
                                            <option value='2'>2 - Tapis de mauvaise qualité mais beauté satisfaisante</option>
                                            <option value='3'>3 - Tapis recommandable</option>
                                            <option value='4'>4 - Tapis de bonne qualité</option>
                                            <option value='5'>5 - Tapis de bonne qualité et motif bien réalisé</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Commentaire</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            raw='5'
                                            value={comment}
                                            placeholder='ce tapis est parfait...'
                                            onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button
                                    disabled={loadingProductReview}
                                    type='submit'
                                    variant='primary'>
                                        Ajouter un commentaire
                                    </Button>
                                </Form>
                            ): (
                                <Message variant='info'><Link to='/connexion' >Veuillez vous connectez pour évaluer ce tapis</Link></Message>
                            )}
                        </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </div>
        )

        }
       

        </div>
  )
}

export default ProductScreen