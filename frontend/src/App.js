import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/product/:id?' component={CartScreen} />  {/* Here ? is an optional parameter */}
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
