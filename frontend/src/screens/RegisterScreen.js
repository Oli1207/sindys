import React, {useState, useEffect} from 'react';
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Loader  from '../components/Loader';
import  Message  from '../components/Message';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

function RegisterScreen({ history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo){
            navigate(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword){
            setMessage('Veuillez entrer le même mot de passe')
        }else {
            dispatch(register(name, email, password))
        }
        
    }
  return (
    <FormContainer>
         <h1>Fan de décoration ? Enregistrez-vous sans plus tarder!</h1>
         {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
                <Form.Label>Nom</Form.Label>
                <Form.Control 
                required
                    type='name'
                    placedholder='nom'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                required
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
                required
                    type='password'
                    placedholder='Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirmez le mot de passe</Form.Label>
                <Form.Control 
                required
                    type='password'
                    placedholder='Confirmez le mot de passe'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                S'enregister !
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Vous avez déjà un compte?<Link to={redirect ? `connexion?redirect=${redirect}` : '/connexion'}>Se connecter</Link>
            </Col>
        </Row>
         </FormContainer>
  )
}

export default RegisterScreen