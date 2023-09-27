import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import  FormContainer  from './FormContainer'


function Coupon() {
  return (
    <FormContainer>
       <Form onSubmit={submitHandler}>
        <Form.Group controlId='coupon'>
                <Form.Label>Code de réduction</Form.Label>
                <Form.Control 
                required
                    type='text'
                    placedholder='Vous avez un bon de réduction? Saisissez le ici !'
                    
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

        </Form>

    </FormContainer>
  )
}

export default Coupon