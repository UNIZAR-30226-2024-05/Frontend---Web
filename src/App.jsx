import React, { useContext} from 'react';
import ProtectedRoute from './context/ProtectedRoute';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Changecorreo from './pages/ChangeCorreo';
import Changefoto from './pages/ChangeFoto';
import Changenombre from './pages/ChangeNombre';
import Changepwd from './pages/ChangePwd';
import Reproductor from './pages/Reproductor';
import NotFound from './pages/NotFound';
import Libro from './pages/Libro';

function App() {

  return (
    <>
    <Router>
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/biblioteca' element={<Biblioteca />}/>
      <Route path='/amigos' element={<ProtectedRoute element={Amigos} />}/>
      <Route path='/mensajes' element={<ProtectedRoute element={Mensajes} />}/>
      <Route path='/soporte' element={<Soporte />}/>
      <Route path='/login' element={<InicioSesion />}/>
      <Route path='/socials' element={<RedesSociales />}/>
      <Route path='/aboutus' element={<SobreNosotros />}/>
      <Route path='/register' element={<Registrar />}/>
      <Route path='/clubs' element={<ProtectedRoute element={Clubs} />}/>
      <Route path='/colecciones' element={<ProtectedRoute element={Colecciones} />}/>
      <Route path='/perfil' element={<ProtectedRoute element={Perfil} />}/>
      <Route path='/config' element={<ProtectedRoute element={Configuracion} />}/>
      <Route path='/changepwd' element={<ProtectedRoute element={Changepwd} />}/>
      <Route path='/changecorreo' element={<ProtectedRoute element={Changecorreo} />}/>
      <Route path='/changefoto' element={<ProtectedRoute element={Changefoto} />}/>
      <Route path='/changenombre' element={<ProtectedRoute element={Changenombre} />}/>
      <Route path='/player' element={<ProtectedRoute element={Reproductor} />}/>
      <Route path='*' element={<NotFound />}/>
      <Route path='/libro' element={<Libro />}/>
     </Routes>
     <Navbar />
    </Router>
    </>
  );
}

export default App
