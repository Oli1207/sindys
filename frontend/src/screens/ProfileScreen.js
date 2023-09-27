import React, {useState, useEffect} from 'react';
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import  Loader  from '../components/Loader';
import  Message  from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen() {



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
   const  navigate = useNavigate()



    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        if (!userInfo){
            navigate('/login')
        }
        else{
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'));
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword){
            setMessage('Veuillez entrer le même mot de passe')
        }else {
            dispatch(updateUserProfile({
                'id':user._id,
                'name' : name,
                'email' : email,
                'password' : password,
            }))
            setMessage('')
        }
        
    }
  return (
    <center>

      
        <h2> Profil</h2>
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
                
                    type='password'
                    placedholder='Confirmez le mot de passe'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Modifier
            </Button>
        </Form>

        </center>


  )
}

export default ProfileScreen