import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import './InicioSesion.css';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const URL_LOGIN = '/users/login';

const InicioSesion = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Obtener la función setAuth del contexto
  const { auth, setAuth } = useContext(AuthContext);
  
  // Inicio de sesión aceptado
  const [success, setSuccess] = useState(false);
  
  // Gestiona los mensajes de error
  const [errMsg, setErrMsg] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    // Verifica si auth tiene algo y establece success en true
    if (Object.keys(auth).length !== 0) {
      setSuccess(true);
    }
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const respuesta = await axios.post(URL_LOGIN, 
        JSON.stringify({username, password}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(respuesta?.data));

      // Reestablecer los campos del formulario
      const roles = respuesta?.data?.roles;
      setAuth({ username, password, roles });

      setUsername('');
      setPassword('');

    } catch (err) {
      if (!err.response) {
        setErrMsg ('No hay respuesta del servidor');
      } else if (err.response.status === 404) {
        setErrMsg ('Usuario no encontrado');
      } else if (err.response.status === 401) {
        setErrMsg ('Contraseña incorrecta');
      } else {
        setErrMsg ('Fallo en el inicio de sesion');
      }
    }
  };

  return (
    <>
      {success ? (
        <div className='login'>
          <div className="log-success">
            <span className='login-success'>¡Te has conectado correctamente!</span>
              <Link className='home-success' to='/'>
                <span>Comienza a escuchar.</span>
              </Link>
          </div>
        </div>
      ) : (
        <div className='login'>
          <form className='form' onSubmit={handleSubmit}>
            <div className='login-box'>
              <label className='form-label' htmlFor="username">Usuario: </label>
              <input
                className='input-box'
                type="text"
                id="username"
                placeholder='Usuario'
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className='login-box'>
              <label className='form-label' htmlFor="password">Contraseña: </label>
              <input
                className='input-box'
                type="password"
                id="password"
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className='submit-button' type="submit">Log In</button>
            {errMsg && <div className="sign-error-message"><p>{errMsg}</p></div>}
            <div className='link-to-signup'>
              <span className='span-signup'>¿No tienes cuenta?</span>
              <Link className='link-signup' to='/register'>
                <span className='span-signup'>Registrate aquí.</span>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default InicioSesion;