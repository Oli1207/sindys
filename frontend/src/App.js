import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen  from './screens/LoginScreen'
import  RegisterScreen from './screens/RegisterScreen'
import  ProfileScreen from './screens/ProfileScreen'
import  ShippingScreen  from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen';
import  PlaceOrderScreen  from './screens/PlaceOrderScreen'
import  OrderScreen  from './screens/OrderScreen'

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-5'>
        <Container>
        <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/connexion' element={<LoginScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/produit/:id' element={<ProductScreen />} />
            <Route path='/order/:orderId' element={<OrderScreen />} />
            <Route path='/panier/:id?' element={<CartScreen />} />
            <Route path='/expedition' element={<ShippingScreen />} />
            <Route path='/paiement' element={<PaymentScreen />} />
            <Route path='/confirmation_de_la_commande' element={<PlaceOrderScreen />} />
          </Routes>
 
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
