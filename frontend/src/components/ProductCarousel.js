import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

import { listeProduits } from '../actions/produitAction'

function ProductCarousel() {
    const dispatch = useDispatch()
    const produitListe = useSelector(state => state.produitListe)
    const {error, loading, products} = produitListe


    useEffect(() =>{
        dispatch (listeProduits())
    },[dispatch])

 
  return ( loading ? <Loader/> 
  : error?  <Message variant='danger'>{error}</Message> :
  (
    <Carousel pause='hover' className='bg-secondary' >
        {products.map(product =>(
            <Carousel.Item key={product._id}>
                <Image src={product.image} alt={product.name} fluid/>
                <Carousel.Caption className='carousel.caption'>
                    <h4>{product.name} {product.price} XOF </h4>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
  )
    
  )
}

export default ProductCarousel