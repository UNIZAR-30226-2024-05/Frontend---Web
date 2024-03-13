import React, { useContext, useEffect, useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'
import { TopbarInData, TopbarOutData } from './TopbarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../images/logo.png';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';

function Navbar() {
    const URL_LOGOUT = '/users/logout';
    
    // Controla el despliegue de la sidebar
    const [sidebar, setSidebar] = useState(false);

    // Variables para conocer el contexto (Usuario conectado o no)
    const { auth , setAuth } = useContext(AuthContext);
    const { username } = auth;
    
    // Controla el despliegue del menú del usuario
    const [mostrarMenu, setMostrarMenu] = useState(false);
  
    const handleCerrarSesion = async (event) => {
        event.preventDefault();
    
    try {
      const respuesta = await axios.post(URL_LOGOUT,null,{withCredentials: true});
      console.log(JSON.stringify(respuesta?.data));

      // Si la solicitud de cierre de sesión fue exitosa, redirige al usuario a la página de inicio u otra página
      setAuth({});
      setMostrarMenu(false);
      window.location.href = '/login'; // Redirige a la página de inicio
        

    } catch (err) {
      if (!err.response) {
        console.log('No hay respuesta del servidor');
      } else if (err.response.status === 401) {
        console.log('No hay sesión iniciada');
      } else {
        console.log('Fallo en el logout');
      }
    }
    };
  
    const toggleMenu = () => setMostrarMenu(!mostrarMenu);

    const showSidebar = () => setSidebar(!sidebar);

    return (
    <>
        <IconContext.Provider value={{color:    '#fff'}}>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                

                {/* ESTO ES TEMPORAL*/} 

                <div className='menu-text'>
        {username ? (
          <>
            <button onClick={toggleMenu} className='usuario-logueado'>
              Bienvenido, {username}!
            </button>
            {mostrarMenu && (
              <div className='menu-desplegable'>
                {/* Contenido del menú desplegable */}
                <Link to='/perfil'>Perfil</Link>
                <Link to='/config'>Configuración</Link>
                <button onClick={handleCerrarSesion} className='menu-items'>Cerrar Sesión</button>
              </div>
            )}
          </>
        ) : ( null
        )}
        </div>
                

                <div className='menu'>
                    { username ? (
                        <>
                            <ul className='menu-items'>
                                {TopbarInData.map((item, index) => {
                                    return(
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : (
                        <>
                            <ul className='menu-items'>
                                {TopbarOutData.map((item, index) => {
                                    return(
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
                <Link to='/' className='menu-bars right-elements'>
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to='#' className='menu-bars'>
                        <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
    </>
    );
}

export default Navbar;