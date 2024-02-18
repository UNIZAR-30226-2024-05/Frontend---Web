import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TopbarData = () => {
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
  };

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  return (
    <div className='topbar'>
      <ul className='menu-items'>
        {[
          { path: '/home', cName: 'menu-text', title: 'Home' },
          { path: '/mybooks', cName: 'menu-text', title: 'Mis libros' },
          { path: '/colections', cName: 'menu-text', title: 'Mis colecciones' },
          { path: '/friends', cName: 'menu-text', title: 'Amigos' },
          { path: '/clubs', cName: 'menu-text', title: 'Mis clubes de lectura' },

        ].map((item, index) => (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
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
                <Link to='/configuracion'>Configuración</Link>
              </div>
            )}
          </>
        ) : (
          <button onClick={handleInicioSesion} className='menu-text'>
            Iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
};

export default TopbarData;
