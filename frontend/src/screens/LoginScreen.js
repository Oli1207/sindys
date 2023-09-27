import React, {useState, useEffect} from 'react';
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Loader  from '../components/Loader';
import  Message  from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

function LoginScreen(location, history) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
  return (
    <FormContainer>
        <h1>Se Connecter</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email'
                    placedholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control 
                    type='password'
                    placedholder='Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Se connecter
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Nouveau Client ? <Link to={'/register'}>Register</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default LoginScreen