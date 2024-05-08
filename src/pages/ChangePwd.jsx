import { useNavigate } from 'react-router-dom'
import React, { useState, useContext} from 'react';
import './Change.css';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

export const ChangePwd = () => {
  const nav = useNavigate();
  const [pwdActual, setPwdActual] = useState('UsuarioPrueba');
  const [nuevoPwd, setNuevoPwd] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const [validRePwd, setValidRePwd] = useState(false);
  const { auth , setAuth } = useContext(AuthContext);

  const URL_PASSWD = '/users/change_pass'

  const handleNuevoPwdChange = (event) => {
    setNuevoPwd(event.target.value);
    

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

  const handleRePwdChange = (event) => {
    setRePassword(event.target.value);

    if (event.target.value !== nuevoPwd) {
      setRePasswordError('Ambas contraseñas deben ser iguales.');
      setValidRePwd(false);
    } else {
      setRePasswordError('');
      setValidRePwd(true);
    }
  };

  const handleGuardarNuevoPwd = (event) => {
    event.preventDefault();
    
    if (validPwd && validRePwd) {
      console.log('Nueva contraseña:', nuevoPwd);
      setNuevoPwd('');
      setRePassword('');
      nav('/perfil');
    }
  };

  const handleClick = async (param) => {
    //if(param == true){
      try{
        const respuesta = await axios.post(URL_PASSWD, 
          JSON.stringify({param}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(param);
      } catch (err) {
        if (!err.response) {
          console.log('No hay respuesta del servidor');
        } else if (err.response.status === 500) {
          console.log('Server Error');
        } else {
          console.log('Fallo en el cambio de foto');
        }
      }
    //}
  }

  return (
    <div className='change'>
      <div className='main-element'>
        <h1>Cambiar la contraseña</h1>
        <form className='change-form' onSubmit={handleGuardarNuevoPwd}>
          <label className='nuevo' htmlFor="nuevoPwd">Nueva contraseña: </label>
          <input
            type="password"
            className='input'
            id="nuevoPwd"
            placeholder='Introduce la nueva contraseña'
            value={nuevoPwd}
            onChange={handleNuevoPwdChange}
          />
          {passwordError && <p className='error'>{passwordError}</p>}
          
          <label className='nuevo' htmlFor="nuevoRePwd">De nuevo: </label>
          <input
            type="password"
            className='input'
            id="nuevoRePwd"
            placeholder='Introdúcela otra vez'
            value={rePassword}
            onChange={handleRePwdChange}>
          </input>
          {rePasswordError && <p className="error-message">{rePasswordError}</p>}
          <button type="submit" className='submit' onClick={() => handleClick(nuevoPwd)}>
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePwd;