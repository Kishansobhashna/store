import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/signUp';
import About from './Components/About';
import Main from './Components/Main';
import Men from './Components/Men';
import Women from './Components/Women';
import Contact from './Components/Contact'; 
import Cart from './Components/Cart';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OrderForm from './Components/OrderForm ';
import SliderComponent from './Components/SliderComponent';
import Profile from './Components/Profile';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const isLoggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"));

  return (
    
    <BrowserRouter>
    <GoogleOAuthProvider clientId="953760804679-fd6qm0cldps4hdh4itud8bg2aqrr60qb.apps.googleusercontent.com">
      <Routes>
          <Route path='/' element={<Header/>}/> 
          <Route path='/home' element={<Home/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/slider' element={<SliderComponent />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/men' element={<Men/>}/>
          <Route path='/women' element={<Women/>}/>
          <Route path='/contact' element={<Contact/>}/> 
          <Route path='/cart' element={<Cart />}/>
          <Route path="/orderer" element={<OrderForm />}/>
          <Route path='/footer' element={<Footer/>}/> 
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;