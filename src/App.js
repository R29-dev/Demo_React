import logo from './logo.svg';
import './App.css';
import Header from './component/Layouts/Header';
import Footer from './component/Layouts/Footer';
import MenuLeft from './component/Layouts/MenuLeft';
function App(props) {
return (
  <div className="App">

      
   
    <Header />
    <section>
		<div class="container">
			<div class="row">
      <div class="col-sm-3">
         <MenuLeft/>
      </div>
      <div class="col-sm-9">
        {props.children}
        </div>
        
      
  

      </div>
      </div>
      </section>
       
    <Footer />
   
  </div>
);

}
export default App;
