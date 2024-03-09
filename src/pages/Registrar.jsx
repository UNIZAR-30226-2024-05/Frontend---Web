import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registrar.css';
import axios from '../api/axios';

const Registrar = () => {
  // Direccion necesaria para que axios conecte con backend.
  const URL_REGISTRAR = '/users/register';

  // Comprueba el correcto formato de los elementos.
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const nameRegex = /^[A-Za-z0-9]{4,}$/;
  const pwdRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  
  // Registro de usuario aceptado.
  const [success, setSuccess] = useState(false);

  // Gestiona los mensajes de error.
  const [errMsg, setErrMsg] = useState('');

  // ELEMENTOS FORMATO:
  // Campo del elemento | Booleano para validez | Mensaje de error
  const [mail, setMail] = useState('');
  const [validMail, setValidMail] = useState(false);
  const [mailError, setMailError] = useState('');

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameError, setNameError] = useState('');

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [repassword, setRePassword] = useState('');
  const [validRePwd, setValidRePwd] = useState(false);
  const [rePasswordError, setRePasswordError] = useState('');

  // Comprueba que esté correcto el mail introducido.
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

  // Comprueba que esté correcto el usuario introducido.
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

  // Comprueba que esté correcta la contraseña introducida.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Validaciones: longitud mínima de la contraseña
    // expresiones regulares para verificar requisitos de contraseña.
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

  // Comprueba que la contraseña introducida sea igual a la anterior.
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

  // Envía la información al backend y comprueba si hay algún error.
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Comprueba que el contenido de los elementos es correcto.
    const v1 = nameRegex.test(username);
    const v2 = emailRegex.test(mail);
    const v3 = pwdRegex.test(password);
    if (!v1 || !v2 || !v3){
      setErrMsg("Invalid Entry");
      return;
    }
    // Envía con axios un JSON con los elementos.
    try {
      const respuesta = await axios.post(URL_REGISTRAR, 
        JSON.stringify({username, mail, password}),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      // Ves lo enviado en consola.
      console.log(respuesta.data);
      console.log(JSON.stringify(respuesta));
      // Reestablecer los campos del formulario.
      setMail('');
      setUsername('');
      setPassword('');
      setRePassword('');
      setErrMsg('');
      // Ha sido correcto el registro, te envía al prompt de registro correcto.
      setSuccess(true);

    } catch (err) {
      if (!err.response) {
        setErrMsg ('No hay respuesta del servidor');
      } else if (err.response.status === 409) {
        // Intentar diferenciar nombre de usuario o mail
        setErrMsg ('Nombre de usuario o mail en uso');
      } else {
        setErrMsg ('Fallo en el registro');
      }
    }
  };

  return (
    <>
      {/* Prompt éxito en el registro */ }
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
        {/* Formulario de registro */ }
        <form className='form' onSubmit={handleSubmit}>
          <div className='signup-box'>
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
          <div className='signup-box'>
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
          <div className='signup-box'>
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
          <div className='signup-box'>
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
            Sign Up
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