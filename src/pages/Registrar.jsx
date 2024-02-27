import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registrar.css';

const Registrar = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');

  const handleMailChange = (event) => {
    setMail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Aquí puedes realizar la validación de la contraseña
    // Por ejemplo, longitud mínima de la contraseña
    if (event.target.value.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);

    if (event.target.value !== password) {
      setRePasswordError('Ambas contraseñas deben ser iguales');
    } else {
      setRePasswordError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica de autenticación, como enviar los datos al servidor, etc.
    console.log('Mail:', mail);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('RePassword:', repassword);
    // También puedes restablecer los campos del formulario después de enviarlos
    setMail('');
    setUsername('');
    setPassword('');
    setRePassword('');
  };

  return (
    <div className='register'>
      <form className='form' onSubmit={handleSubmit}>
        <div classname='signup-box'>
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
        <div classname='signup-box'>
          <label className='form-label' htmlFor="password">Contraseña: </label>
          <input
            className='input-box'
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <div classname='signup-box'>
          <label className='form-label' htmlFor="password">Repita la contraseña: </label>
          <input
            className='input-box'
            type="password"
            id="repassword"
            placeholder='Password'
            value={repassword}
            onChange={handleRePasswordChange}
          />
          {rePasswordError && <p className="error-message">{rePasswordError}</p>}
        </div>
        <div classname='signup-box'>
          <label className='form-label' htmlFor="mail">Correo electrónico: </label>
          <input
            className='input-box'
            type="text"
            id="mail"
            placeholder='mail@gmail.com'
            value={mail}
            onChange={handleMailChange}
          />
        </div>
        <button className='submit-button' type="submit">Log In</button>
        <div>
          <span className='span-signup'>¿Ya tienes cuenta?</span>
          <Link className='link-login' to='/login'>
            <span className='span-login'>Inicia sesión aquí.</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Registrar;