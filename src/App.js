import logo from './logo.svg';
import './App.css';
import Header from './component/Layouts/Header';
import Footer from './component/Layouts/Footer';
import MenuLeft from './component/Layouts/MenuLeft';
import { useLocation } from 'react-router-dom';
import LeftAccount from './component/Layouts/LeftAccount';
import { CartProvider } from './component/Context/CartContext'
function App(props) {
  let params1 = useLocation();

  return (
    <CartProvider> 
    <div className="App">
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              {(params1.pathname.includes("/account") || params1.pathname.includes("/product")) ? <LeftAccount /> : <MenuLeft />}
            </div>
            <div className="col-sm-9">
              {props.children}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </CartProvider> 
  );
}

export default App;
