import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import './Change.css';

export const Changecorreo = () => {
  const { auth, updateMail } = useContext(AuthContext);
  const { correo } = auth;

  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');

  const regexCorreo = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  const manejarCambioNuevoCorreo = (event) => {
    setNuevoCorreo(event.target.value);
  }

  const manejarGuardarNuevoCorreo = (event) => {
    event.preventDefault();

    // Validar el nuevo correo
    if (!regexCorreo.test(nuevoCorreo)) {
      setErrorCorreo('Por favor, introduce un correo electrónico válido. \n Ejemplo:  mail_EJEMPLO-1@gmail.com');
      return;
    }

    console.log('Correo actual:', correo);
    console.log('Nuevo correo:', nuevoCorreo);

    // Actualizar el correo electrónico
    updateMail(nuevoCorreo);

    // Limpiar el estado del error y del nuevo correo
    setErrorCorreo('');
    setNuevoCorreo('');
  }

  return (
    <div className='change'>
      <div className='main-element'>
        <h1>Cambiar el correo</h1>
        <div>
          <p className="actual">Correo actual: {correo}</p>
        </div>
        <form className='change-form' onSubmit={manejarGuardarNuevoCorreo}>
          <label className='nuevo' htmlFor="nuevoCorreo">Nuevo correo: </label>
          <input
            type="text"
            className='input'
            id="nuevoCorreo"
            placeholder='mail@gmail.com'
            value={nuevoCorreo}
            onChange={manejarCambioNuevoCorreo}
          />
          <button type="submit" className='submit'>
            Actualizar correo
          </button>
          {errorCorreo && <p className='error-message'>{errorCorreo}</p>}
        </form>
      </div>
    </div>
  )
}

export default Changecorreo;
