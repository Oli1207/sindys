import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({step1, step2, step3, step4}) {
  return (
    <Nav>
             <Nav.Item>
                {step1 ? (
             
             <Nav.Link><Link to='/connexion'> Connexion</Link></Nav.Link>
             

                ):(
                    <Nav.Link disabled> Connexion</Nav.Link>
                )}
             </Nav.Item>

             <Nav.Item>
                {step2 ? (
             
             <Nav.Link><Link to='/expedition'> Expédition</Link></Nav.Link>
             

                ):(
                    <Nav.Link disabled> Expédition</Nav.Link>
                )}
             </Nav.Item>

             <Nav.Item>
                {step3 ? (
             
             <Nav.Link><Link to='/paiement'> Paiement</Link></Nav.Link>
             

                ):(
                    <Nav.Link disabled> Paiement</Nav.Link>
                )}
             </Nav.Item>

             <Nav.Item>
                {step4 ? (
             
             <Nav.Link><Link to='/confirmation_de_la_commande'> Confirmation de la commande</Link></Nav.Link>
             

                ):(
                    <Nav.Link disabled> Confirmation de la commande</Nav.Link>
                )}
             </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps