import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './InicioSesion.css';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const URL_LOGIN = '/login';

const InicioSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { setAuth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username, password, roles, accessToken });
      setUsername('');
      setPassword('');
      setSuccess(true);

    } catch (err) {
      if (!err?.respuesta) {
        setErrMsg ('No hay respuesta del servidor');
      } else if (!err.response?.status === 401) {
        setErrMsg ('Usuario no encontrado');
      } else if (!err.response?.status === 404) {
        setErrMsg ('Contraseña incorrecta');
      } else {
        setErrMsg ('Fallo en el inicio de sesion');
      }
      errRef.current.focus();
    }
    
    // Aquí puedes implementar la lógica de autenticación, como enviar los datos al servidor, etc.
    
    // También puedes restablecer los campos del formulario después de enviarlos
    setUsername('');
    setPassword('');
    setSuccess(true);
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