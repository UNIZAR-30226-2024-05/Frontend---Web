import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarData } from './components/SidebarData';
import Home from './pages/Home';
import Biblioteca from './pages/Biblioteca';
import Tienda from './pages/Tienda';
import Amigos from './pages/Amigos';
import Mensajes from './pages/Mensajes';
import Configuracion from './pages/Configuracion';
import InicioSesion from './pages/InicioSesion';
import RedesSociales from './pages/RedesSociales';
import SobreNosotros from './pages/SobreNosotros'; 
import Registrar from './pages/Registrar';

function App() {
  return (
    <>
    <Router>
     <Navbar />
     <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/biblioteca' Component={Biblioteca}/>
      <Route path='/tienda' Component={Tienda}/>
      <Route path='/amigos' Component={Amigos}/>
      <Route path='/mensajes' Component={Mensajes}/>
      <Route path='/config' Component={Configuracion}/>
      <Route path='/login' Component={InicioSesion}/>
      <Route path='/socials' Component={RedesSociales}/>
      <Route path='/aboutus' Component={SobreNosotros}/>
      <Route path='/register' Component={Registrar}/>
     </Routes>
    </Router>
    </>
  );
}

export default App
