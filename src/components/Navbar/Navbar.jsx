import React, { useContext, useEffect, useState } from 'react';
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData'
import { TopbarInData, TopbarOutData } from './TopbarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../images/logo.png';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import ListaAmigosSidebar from '../ListaAmigosSidebar/ListaAmigosSidebar';
import vaca from '../../images/fotos-perfil/vaca.jpg';
import perro from "../../images/fotos-perfil/perro.jpg"
import gato from "../../images/fotos-perfil/gato.jpg"
import rana from "../../images/fotos-perfil/rana.jpg"
import leon from "../../images/fotos-perfil/leon.jpg"
import pollo from "../../images/fotos-perfil/pollo.jpg"
import buho from "../../images/fotos-perfil/buho.jpg"
import perezoso from "../../images/fotos-perfil/perezoso.jpg"
import doraemon from "../../images/fotos-perfil/doraemon.jpg"
import pikachu from "../../images/fotos-perfil/pikachu.jpg"

function Navbar() {
    const URL_PERFIL = 'users/profile';
    
    const [perfil, setPerfil] = useState([]);

    useEffect(() => {
        axios.get(URL_PERFIL, {withCredentials: true})
        .then(response => {
        setPerfil(response.data);
        console.log(response.data);
        }).catch(err => {
        console.log(err)
        });
    }, [])

    const obtenerPerfil = () => {
        switch(perfil.img){
        case '0':
            return perro
            break;
        case '1':
            return gato
            break;
        case '2':
            return rana
            break;
        case '3':
            return leon;
            break;
        case '4':
            return pollo
            break;
        case '5':
            return vaca
            break;
        case '6':
            return buho
            break;
        case '7':
            return perezoso
            break;
        case '8':
            return doraemon
            break;
        case '9':
            return pikachu
            break;
        }
    }
  
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
      window.location.href = '/login'; // Redirige a la página de inicio de sesión
        

    } catch (err) {
      if (!err.response) {
        console.log('No hay respuesta del servidor');
      } else if (err.response.status === 401) {
        console.log('No hay sesión iniciada');
      } else {
        console.log('Fallo en el logout');
      }
      setAuth({});
    }
    };
  
    const toggleMenu = () => setMostrarMenu(!mostrarMenu);

    const showSidebar = () => setSidebar(!sidebar);

    return (
    <>
        <IconContext.Provider value={{color:    '#fff'}}>
            <div className='navbar'>
                {username ? (
                <>
                    <Link to='/perfil' className='profile-picture'>
                        <img className='fotoPerfil' src={obtenerPerfil()}/>
                    </Link>
                    <div className='menu-bars'>
                        <IoIcons.IoMdPeople onClick={showSidebar} />
                    </div>
                    <div className='menu-text'>
                        <Link to='/' onClick={handleCerrarSesion} className='boton-cerrar-sesion'>Cerrar Sesión</Link>
                    </div>
                </>) : (null)
                }

                {/* ESTO ES TEMPORAL*/} 

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
                <div className='nav-menu-items'>
                    <div className="navbar-toggle">
                        <div className='menu-bars' onClick={showSidebar}>
                        <AiIcons.AiOutlineClose />
                        </div>
                    </div>
                    <div className='sidebar-list'> <ListaAmigosSidebar /> </div>
                </div>
            </nav>
        </IconContext.Provider>
    </>
    );
}

export default Navbar;