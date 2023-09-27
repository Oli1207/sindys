import React from 'react';
import {Card} from 'react-bootstrap';
import Evaluation from './Evaluation';
import {Link} from 'react-router-dom';


function Produit({ product }) {
  return (
    <Card  style={{ width: '18rem', height: '500px', marginRight: '20px'}}  className='my-3 p-3 rounded'>
        <Link to={`/produit/${product._id}`}>
        <Card.Img src={product.image} style={{ maxHeight: '300px', maxWidth:'400px' }} />
        </Link>
        <Card.Body>
            <Link to={`/produit/${product._id}`} >
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <div className='my-3'>
                
                    <Evaluation value={product.rating} text={`${product.numReviews} evaluations`} color={'#f8e825'}/>
                </div>
                
            </Card.Text>

            <Card.Text as="div">
                {product.price} XOF
            </Card.Text>
        </Card.Body>

    </Card>
  )
}

export default Produit