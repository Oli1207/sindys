import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  
  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <div>
      <header >
        <Navbar bg="dark" variant="dark" expand="lg" className="bg-body-tertiary" collapseOnSelect>
          <Container>
            <Navbar.Brand><Link to="/">Sindy's Rug</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
              <Nav className="ml-auto" style={{ marginLeft: 'auto' }}>
                <Nav.Item ><Link to="/panier"><i className='fas fa-shopping-cart'></i> Panier  </Link></Nav.Item>
                {userInfo ? (
                  <NavDropdown className='bg-dark'  title={userInfo.name} id='username'>
                    <NavDropdown.Item><Link to='/profile'>Profile</Link></NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>Déconnexion</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link><Link to="/connexion"><i className='fas fa-user'></i> Se Connecter</Link></Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
