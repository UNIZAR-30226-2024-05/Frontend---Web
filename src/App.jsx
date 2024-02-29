import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Biblioteca from './pages/Biblioteca';
import Amigos from './pages/Amigos';
import Mensajes from './pages/Mensajes';
import Soporte from './pages/Soporte';
import InicioSesion from './pages/InicioSesion';
import RedesSociales from './pages/RedesSociales';
import SobreNosotros from './pages/SobreNosotros'; 
import Registrar from './pages/Registrar';
import Clubs from './pages/Clubs';
import Colecciones from './pages/Colecciones';
import Perfil from './pages/Perfil';
import Configuracion from './pages/Configuracion';

function App() {
  return (
    <>
    <Router>
     <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/biblioteca' Component={Biblioteca}/>
      <Route path='/amigos' Component={Amigos}/>
      <Route path='/mensajes' Component={Mensajes}/>
      <Route path='/soporte' Component={Soporte}/>
      <Route path='/login' Component={InicioSesion}/>
      <Route path='/socials' Component={RedesSociales}/>
      <Route path='/aboutus' Component={SobreNosotros}/>
      <Route path='/register' Component={Registrar}/>
      <Route path='/clubs' Component={Clubs}/>
      <Route path='/colecciones' Component={Colecciones}/>
      <Route path='/perfil' Component={Perfil}/>
      <Route path='/config' Component={Configuracion}/>
     </Routes>
     <Navbar />
    </Router>
    </>
  );
}

export default App
