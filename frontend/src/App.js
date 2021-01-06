import Header from './components/Header';
import Footer from './components/Footer'
import MenuFixe from './components/MenuFixe';
import HomeScreen from './screens/HomeScreen';
import BoutiqueScreen from './screens/BoutiqueScreen'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LegalScreen from './screens/LegalScreen';
import ConfidentialiteScreen from './screens/ConfidentialiteScreen';
import IntegrateurFacebook from './components/IntegrateurFacebook';
import PresentationScreen from './screens/PresentationScreen'
import BlogScreen from './screens/BlogScreen';
import CGVScreen from './screens/CGVScreen';
import ProductScreen from './screens/ProductScreen';


function App() {

  return (
    <Router>
      <MenuFixe/>
      <Header/>
      <Route exact path="/" component ={HomeScreen} />
      <Route exact path="/boutique" component ={BoutiqueScreen} />
      <Route exact path="/produit/:id" component ={ProductScreen} />
      <Route exact path="/presentation" component ={PresentationScreen} />
      <Route exact path="/blog" component ={BlogScreen} />
      <Route exact path='/mentionslegales' component={LegalScreen} /> 
      <Route exact path="/confidentialite" component={ConfidentialiteScreen} />
      <Route exact path="/cgv" component={CGVScreen} />
      <IntegrateurFacebook/>
      <Footer/>   
    </Router>
    
  )
}

export default App;
