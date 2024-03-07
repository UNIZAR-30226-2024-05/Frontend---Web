import React, { useState } from 'react';
import './Change.css';

export const Changecorreo = () => {
  const [correoActual, setCorreoActual] = useState('usuarioprueba@gmail.com');
  const [nuevoCorreo, setNuevoCorreo] = useState('');

  const handleNuevoCorreoChange = (event) => {
    setNuevoCorreo(event.target.value);
  }

  const handleGuardarNuevoCorreo = (event) => {
    event.preventDefault();
    
    console.log('Correo actual:', correoActual);
    console.log('Nuevo correo:', nuevoCorreo);
    
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
            placeholder='Introduce el nuevo correo'
            value={nuevoCorreo}
            onChange={handleNuevoCorreoChange}
          />
          <button type="submit" className='submit'>
            Actualizar correo
          </button>
        </form>
      </div>
    </div>
  )
}

export default Changecorreo;
