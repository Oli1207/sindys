import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import Produit from '../components/Produit';
import ProduitCA from '../components/ProduitCA'
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel'
import { listeProduits } from '../actions/produitAction';
import  Paginate  from '../components/Paginate'
import "../i18n"
import { useTranslation } from 'react-i18next';



function HomeScreen() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const produitListe = useSelector(state => state.produitListe)
  const { error, loading, products, page, pages} = produitListe
  const [add, setAdd] = useState('')
  const {t} = useTranslation();


  let keyword = location.search
  console.log(keyword)
  useEffect(() => {
    dispatch(listeProduits(keyword))
  }, [dispatch, keyword])

  useEffect(() =>(
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude, longitude} = pos.coords
      console.log(latitude, longitude)
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch (url).then(res=>res.json()).then(data=>setAdd(data.address))

    })
  ))

console.log(add)
  return (
    <div>
      <center className='bg-info'>
      <span><p>Votre addresse de livraison actuelle: {add.city} { add.state}, {add.country}</p>
      <small>vous pourrez la modifier plus tard lors de votre commande</small></span>
      </center>
      {!keyword &&  <ProductCarousel/>}
     
        <h1>Récemment ajoutés</h1>
        {
          loading ? <Loader/>
          : error ? <Message variant='danger'> {error} </Message>
            :
            <div>
            <Row>
            {
              products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {!add.country_code || add.country_code === 'ci' ?(
                    <Produit product={product} />
                    ):(
                    add.country_code === 'ca' &&
                    <ProduitCA product={product} />)}
                  </Col> 
              ))
            }
            
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
        }
         
    </div>
  )
}

export default HomeScreen;