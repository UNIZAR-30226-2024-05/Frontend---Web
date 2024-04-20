import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './InicioSesion.css';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import io from 'socket.io-client'; // Importa socket.io-client

const URL_LOGIN = '/users/login';

const InicioSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [socket, setSocket] = useState(null); // Estado para el socket

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      setSuccess(true);
    }
  }, [auth]);

  const connectToSocket = () => {
    // Establecer la conexión con el servidor de Socket.io
    const socket = io("https://server.narratives.es", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    setSocket(socket);
    console.log('Prueba');

    socket.on('peticionReceived', (data) => {
      // Actualiza la interfaz de usuario con la notificación recibida
      console.log(data);
    });

    // Escuchar eventos desde el servidor de Socket.io
    /*socket.on('message', (data) => {
      console.log('Mensaje recibido desde el servidor:', data);
    });*/
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
      console.log(username)
      console.log(respuesta); /* Solo desarrollo */
      const user_id = respuesta?.data?.user?.user_id;
      const img = respuesta?.data?.user?.img;
      const role = respuesta?.data?.user?.role;
      setAuth({ username, user_id, img, role });

      setUsername('');
      setPassword('');

      // Conexión al socket después del inicio de sesión exitoso
      connectToSocket();

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
