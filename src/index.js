import React from 'react';
import ReactDOM from 'react-dom/client'; // Import chính xác từ 'react-dom/client'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './component/Layouts/Home';
import Blog from './component/Blog/Blog'; // Di chuyển import Index lên trên phần render
import BlogDetail from './component/Blog/Blogdetail';
import Register from './component/member/Register';
import Login from './component/member/Login';
import Account from './component/member/Account';
import ListProduct from './component/product/ListProduct';
import AddProduct from './component/product/AddProduct';
import Bai1 from './component/Bai1';
import EditProduct from './component/product/EditProduct';
import Productdetail from './component/product/Productdetail';
import Cart from './component/cart/Cart';
import Test from './pages/HomePage/Test';
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import store from './store'; // Import store chính xác
import Index from './pages/HomePage/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Bao bọc ứng dụng với Provider */}
      <Router>
        <App>
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/detail/:id' element={<BlogDetail />} />




            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/account' element={<Account />} />




            <Route path='/product' element={<ListProduct />} />
            <Route path='/product/add' element={<AddProduct />} />
            <Route path='/product/edit/:id' element={<EditProduct />} />
            <Route path='/product-detail/:id' element={<Productdetail />} />
            <Route path='/product/cart' element={<Cart />} />



            <Route path='/test1' element={<Test />} />
            <Route path='/index' element={<Index />} />

            {/* <Route path='/test' element={<Bai1 />} /> */}
            {/* <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} /> */}
          </Routes>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
