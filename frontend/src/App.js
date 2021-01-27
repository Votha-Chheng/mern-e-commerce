import Header from './components/Header';
import Footer from './components/Footer'
import MenuFixe from './components/MenuFixe';
import HomeScreen from './screens/HomeScreen';
import BoutiqueScreen from './screens/BoutiqueScreen'
import {Switch, Route, useLocation, withRouter} from 'react-router-dom';
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
import Validation from './screens/Validation';
import LoaderSpin from './components/LoaderSpin';


function App() {

  const location = useLocation()

  return (
    <> 
      
      <MenuFixe/>
      <Header/> 
        <AnimatePresence exitBeforeEnter>
        <ScrollToTop/>              
        <Switch location={location} key={location.pathname}>        
          <Route exact path="/" component ={HomeScreen} />
          <Route exact path="/produits" component ={BoutiqueScreen} />
          <Route exact path="/produit/:id" component ={ProductScreen} />
          <Route exact path="/panier/:id?" component ={withRouter (CartScreen)} />
          <Route exact path="/presentation" component ={PresentationScreen} />
          <Route exact path="/blog" component ={BlogScreen} />
          <Route exact path='/mentionslegales' component={LegalScreen} /> 
          <Route exact path="/confidentialite" component={ConfidentialiteScreen} />
          <Route exact path="/cgv" component={CGVScreen} />
          <Route exact path="/profil" component={ProfileScreen}/>
          <Route exact path='/validationemail/:userId/:secretCode' component={Validation}/>
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
