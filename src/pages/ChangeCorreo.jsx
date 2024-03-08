import React, { useState } from 'react';
import './Change.css';

export const Changecorreo = () => {
  const [correoActual, setCorreoActual] = useState('usuarioprueba@gmail.com');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

  const handleNuevoCorreoChange = (event) => {
    setNuevoCorreo(event.target.value);
  }

  const handleGuardarNuevoCorreo = (event) => {
    event.preventDefault();

    // Validar el nuevo correo
    if (!emailRegex.test(nuevoCorreo)) {
      setErrorCorreo('Por favor, introduce un correo electrónico válido.');
      return;
    }

    console.log('Correo actual:', correoActual);
    console.log('Nuevo correo:', nuevoCorreo);

    // Limpiar el estado del error
    setErrorCorreo('');

    // Resto del código aquí...

    setNuevoCorreo('');
  }

  return (
    <div className='change'>
      <div className='main-element'>
        <h1>Cambiar el correo</h1>
        <div>
          <p className="actual">Correo actual: usuarioprueba@gmail.com</p>
        </div>
        <form className='change-form' onSubmit={handleGuardarNuevoCorreo}>
          <label className='nuevo' htmlFor="nuevoCorreo">Nuevo correo: </label>
          <input
            type="text"
            className='input'
            id="nuevoCorreo"
            placeholder='mail@gmail.com'
            value={nuevoCorreo}
            onChange={handleNuevoCorreoChange}
          />
          <button type="submit" className='submit'>
            Actualizar correo
          </button>
          {errorCorreo && <p className='error'>{errorCorreo}</p>}
        </form>
      </div>
    </div>
  )
}

export default Changecorreo;
