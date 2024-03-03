import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'
import { TopbarInData, TopbarOutData } from './TopbarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../images/logo.png';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);

    const [usuarioLogueado, setUsuarioLogueado] = useState(null);
    const [mostrarMenu, setMostrarMenu] = useState(false);
    
    const handleInicioSesion = () => {
        // Simulando la lógica de inicio de sesión
        const nombreUsuario = 'UsuarioEjemplo';
        setUsuarioLogueado(nombreUsuario);
    };
  
    const handleCerrarSesion = () => {
        // Simulando la lógica de cierre de sesión
        setUsuarioLogueado(null);
        setMostrarMenu(false); // Cerrar el menú desplegable al cerrar sesión
        window.location.href = "/login";
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
        {usuarioLogueado ? (
          <>
            <button onClick={toggleMenu} className='usuario-logueado'>
              Bienvenido, {usuarioLogueado}!
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
        ) : (
          <button onClick={handleInicioSesion} className='menu-items' id='signoutButton'>
            Iniciar sesión
          </button>
        )}
        </div>
                

                <div className='menu'>
                    { usuarioLogueado ? (
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