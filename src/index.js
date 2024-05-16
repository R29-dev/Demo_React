import React from 'react';
import ReactDOM from 'react-dom'; // Chỉ import từ 'react-dom' mà không cần sử dụng 'react-dom/client'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './component/Layouts/Home';
import Blog from './component/Blog/Blog'; // Di chuyển import Index lên trên phần render
import BlogDetail from './component/Blog/Blogdetail';
import Register from './component/member/Register';
import Login from './component/member/Login';

// import Register from './component/member/Register';
// import Login from './component/member/Login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/blog/detail/:id' element={<BlogDetail />} />


          
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>

          
          {/* <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/> */}
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

