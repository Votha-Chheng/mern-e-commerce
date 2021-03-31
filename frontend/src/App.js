import Header from './components/Header';
import Footer from './components/Footer'
import MenuFixe from './components/MenuFixe';
import HomeScreen from './screens/HomeScreen';
import BoutiqueScreen from './screens/BoutiqueScreen'
import {Switch, Route, useLocation} from 'react-router-dom';
import LegalScreen from './screens/LegalScreen';
import ConfidentialiteScreen from './screens/ConfidentialiteScreen';
import IntegrateurFacebook from './components/IntegrateurFacebook';
import PresentationScreen from './screens/PresentationScreen'
import BlogScreen from './screens/BlogScreen';
import CGVScreen from './screens/CGVScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import ScrollToTop from './components/ScrollToTop';
import {AnimatePresence} from 'framer-motion'
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PointRelaisScreen from './screens/PointRelaisScreen';
import ValidationScreen from './screens/Validation';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import BilletScreen from './screens/BilletScreen';
import ContactScreen from './screens/ContactScreen';
import OrderPaidScreen from './screens/OrderPaidScreen';



function App() {

  const location = useLocation()

  return (
    <>   
      <MenuFixe/>
      <Header/> 
      <ScrollToTop/>  
        <AnimatePresence exitBeforeEnter>          
        <Switch location={location} key={location.pathname}>        
          <Route exact path="/" component ={HomeScreen} />
          <Route exact path="/produits" component ={BoutiqueScreen} />
          <Route exact path="/produit/:id" component ={ProductScreen} />
          <Route exact path="/panier/:id?" component ={CartScreen} />
          <Route exact path='/adresse' component = {ShippingScreen} />
          <Route exact path='/choixpointrelais' component = {PointRelaisScreen} />
          <Route exact path='/paiement' component = {PaymentScreen} />
          <Route exact path='/contact' component = {ContactScreen} />
          <Route exact path='/commande/' component={OrderScreen} />
          <Route exact path='/commande/:id' component={OrderPaidScreen} />
          <Route exact path="/presentation" component ={PresentationScreen} />
          <Route exact path="/blog" component ={BlogScreen} />
          <Route exact path='/mentionslegales' component={LegalScreen} /> 
          <Route exact path="/confidentialite" component={ConfidentialiteScreen} />
          <Route exact path="/cgv" component={CGVScreen} />
          <Route exact path="/profil" component={ProfileScreen}/>
          <Route exact path="/blog/:idBillet" component={BilletScreen}/>
          <Route exact path='/validationemail/:query?' component={ValidationScreen}/>
        </Switch>  
      </AnimatePresence>  
      <IntegrateurFacebook/>  
      <Footer/> 
    </>
  )
}

// const Wrapper = styled.div`

// `

export default App;
