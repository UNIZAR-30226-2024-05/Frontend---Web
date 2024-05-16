import React, { useContext, useEffect, useState } from 'react';
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import { TopbarAdminData, TopbarInData, TopbarOutData } from './TopbarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../images/logo.png';
import AuthContext from '../../context/AuthProvider';
import ErrorNoSesion from '../ErrorNoSesion/ErrorNoSesion';
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

import foto1 from '../../images/1.png';

function Navbar() {
    const URL_LOGOUT = '/users/logout';
    
    // Controla el despliegue de la sidebar
    const [sidebar, setSidebar] = useState(false);

    // Variables para conocer el contexto (Usuario conectado o no)
    const { auth, setAuth, socket, refreshFriends, setRefreshFriends } = useContext(AuthContext);
    const { username, img, role } = auth;

    const [ amigos, setAmigos ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const URL_CONSULTA = '/amistad/amigos';
    async function fetchAmigos(){
        await axios.get(URL_CONSULTA, { withCredentials: true })
        .then(response=>{
            setAmigos(response.data.amigos);
            setLoading(false);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
            setLoading(false);
            if (error.response && error.response.status === 401) { 
                console.log('No autorizado');
                return <ErrorNoSesion/>
            }
        })
    }

    useEffect(() => {
        fetchAmigos();
    }, [username]);

    useEffect(() => {
        if (refreshFriends){
            fetchAmigos();
            setRefreshFriends(false);
        }
    }, [refreshFriends]);

    useEffect(() => {
        if (socket) {
            const handlePeticionAccepted = (data) => {
                console.log('Evento recibido:', data);
                fetchAmigos();
            }

        socket.on('peticionAccepted', handlePeticionAccepted);
        // Limpia la escucha del socket cuando el componente se desmonta
        return () => {
            socket.off('peticionAccepted', handlePeticionAccepted);
        };
        }
    }, [socket]);


    //Poner la foto de perfil correcta
    const obtenerPerfil = () => {
        switch(img){
        case '0':
            return perro;
        case '1':
            return gato;
        case '2':
            return rana;
        case '3':
            return leon;
        case '4':
            return pollo;
        case '5':
            return vaca;
        case '6':
            return buho;
        case '7':
            return perezoso;
        case '8':
            return doraemon;
        case '9':
            return pikachu;
        }
    }
  
    const handleCerrarSesion = async (event) => {
        event.preventDefault();
    
        try {
            const respuesta = await axios.post(URL_LOGOUT, null, {withCredentials: true});
            console.log(JSON.stringify(respuesta?.data));
            // Si la solicitud de cierre de sesión fue exitosa, redirige al usuario a la página de inicio u otra página
            setAuth({});
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

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <div className='navbar'>
                    {username ? (
                        <>
                            {role === 'normal' ? (
                                <>
                                <Link to='/perfil' className='profile-picture'>
                                    <img className='fotoPerfil' src={obtenerPerfil()} alt="Profile"/>
                                </Link>
                                <div className='menu-bars'>
                                    <IoIcons.IoMdPeople onClick={showSidebar} />
                                </div>
                                <div className='menu-text'>
                                    <Link to='/' onClick={handleCerrarSesion} className='boton-cerrar-sesion'>Cerrar Sesión</Link>
                                </div>
                                </>
                            ) : role === 'admin' ? (
                                <div className='menu-text'>
                                    <Link to='/' onClick={handleCerrarSesion} className='boton-cerrar-sesion'>Cerrar Sesión</Link>
                                </div>
                            ) : null}
                        </>
                    ) : (null)
                    }

                    {/* ESTO ES TEMPORAL*/} 

                    <div className='menu'>
                        { username ? (
                            <>
                                {role === 'normal' ? (
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
                                ) : role === 'admin' ? (
                                    <ul className='menu-items'>
                                        {TopbarAdminData.map((item, index) => {
                                            return(
                                                <li key={index} className={item.cName}>
                                                    <Link to={item.path}>
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : null}
                            </>
                        ) : (
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
                            <div className='nav-text'>
                                <span>Bienvenido, {username}</span>
                            </div>
                        </div>
                        <div className='sidebar-list'> 
                            {loading ? (
                                <div className='loading-container'>
                                    <p>Loading...</p>
                                </div>
                                ) : (
                                    <ListaAmigosSidebar amigos={amigos} />
                                )}
                        </div>
                    </div>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
