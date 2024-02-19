import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InicioSesion.css';

const InicioSesion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica de autenticación, como enviar los datos al servidor, etc.
    console.log('Username:', username);
    console.log('Password:', password);
    // También puedes restablecer los campos del formulario después de enviarlos
    setUsername('');
    setPassword('');
  };

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <div classname='login-box'>
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
        <div classname='login-box'>
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
        <div>
        <span className='span-signup'>¿No tienes cuenta?</span>
          <Link className='link-signup' to='/register'>
            <span className='span-signup'>Registrate aquí.</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default InicioSesion;