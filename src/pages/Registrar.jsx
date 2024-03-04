import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registrar.css';
import axios from '../api/axios';

const Registrar = () => {
  const URL_REGISTRAR = '/register';

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const nameRegex = /^[A-Za-z0-9]{4,}$/;
  const pwdRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [mail, setMail] = useState('');
  const [validMail, setValidMail] = useState(false);


  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [repassword, setRePassword] = useState('');
  const [validRePwd, setValidRePwd] = useState(false);

  const [mailError, setMailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');

  const handleMailChange = (event) => {
    setMail(event.target.value);
    const isValidMail = emailRegex.test(event.target.value);
    if (!isValidMail) {
      setMailError('Ejemplo:  mail_EJEMPLO-1@gmail.com');
      setValidMail(false);
    } else {
      setMailError('');
      setValidMail(true);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    const isValidName = nameRegex.test(event.target.value);
    if (!isValidName) {
      setNameError('El nombre debe tener al menos 4 caracteres.');
      setValidName(false);
    } else {
      setNameError('');
      setValidName(true);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Aquí puedes realizar la validación de la contraseña
    // Por ejemplo, longitud mínima de la contraseña
    // expresiones regulares para verificar requisitos de contraseña
    const hasNumber = /\d/.test(event.target.value);
    const hasUpperCases = /[A-Z]/.test(event.target.value);
    const hasLowerCases = /[a-z]/.test(event.target.value);
    if (event.target.value.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      setValidPwd(false);
    } else if (!hasNumber) {
      setPasswordError('La contraseña debe tener al menos un número.');
      setValidPwd(false);
    } else if (!hasUpperCases) {
      setPasswordError('La contraseña debe tener al menos una mayúscula.');
      setValidPwd(false);
    } else if (!hasLowerCases) {
      setPasswordError('La contraseña debe tener al menos una minúscula.');
      setValidPwd(false);
    } else {
      setPasswordError('');
      setValidPwd(true);
    }
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);

    if (event.target.value !== password) {
      setRePasswordError('Ambas contraseñas deben ser iguales.');
      setValidRePwd(false);
    } else {
      setRePasswordError('');
      setValidRePwd(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica de autenticación, como enviar los datos al servidor, etc.
    const v1 = emailRegex.test(mail);
    const v2 = nameRegex.test(username);
    const v3 = pwdRegex.test(password);
    if (!v1 || !v2 || !v3){
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const respuesta = await axios.post(URL_REGISTRAR, 
        JSON.stringify({mail, username, password}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(respuesta.data);
      console.log(respuesta.accessToken);
      console.log(JSON.stringify(respuesta));
      setSuccess(true);
      // Reestablecer los campos del formulario
      setMail('');
      setUsername('');
      setPassword('');
      setRePassword('');
      setErrMsg('');

    } catch (err) {
      if (!err?.respuesta) {
        setErrMsg ('No hay respuesta del servidor');
      } else if (!err.response?.status === 409) {
        setErrMsg ('Nombre de usuario en uso');
      } else {
        setErrMsg ('Fallo en el registro');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className='register'>
          <div className="reg-success">
            <span className='signup-success'>¡Te has registrado correctamente!</span>
              <Link className='link-success' to='/login'>
                <span>Inicia sesión aquí.</span>
              </Link>
          </div>
        </div>
      ) : (
      <div className='register'>
        <form className='form' onSubmit={handleSubmit}>
          <div classname='signup-box'>
            <label className='form-label' htmlFor="username">Usuario: </label>
            <input
              className='input-box'
              type="text"
              id="username"
              placeholder='Usuario'
              autoComplete='off'
              value={username}
              onChange={handleUsernameChange}
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div classname='signup-box'>
            <label className='form-label' htmlFor="password">Contraseña: </label>
            <input
              className='input-box'
              type="password"
              id="password"
              placeholder='Password'
              autoComplete='off'
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
              autoComplete='off'
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
              autoComplete='off'
              value={mail}
              onChange={handleMailChange}
            />
            {mailError && <p className="error-message">{mailError}</p>}
          </div>
          <button className='submit-button' type="submit" 
            disabled={!validMail || !validName || !validPwd || !validRePwd ? true : false}>
            Sign In
          </button>
            {errMsg && <div className="sign-error-message"><p>{errMsg}</p></div>}
          <div className='link-to-login'>
            <span className='span-login'>¿Ya tienes cuenta?</span>
            <Link className='link-login' to='/login'>
              <span className='span-login'>Inicia sesión aquí.</span>
            </Link>
          </div>
        </form>
      </div>
    )}
    </>
  );
}

export default Registrar;