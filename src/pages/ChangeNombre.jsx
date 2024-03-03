import React, { useState } from 'react';
import './Change.css';

export const Changenombre = () => {
  const [nombreActual, setNombreActual] = useState('UsuarioPrueba');
  const [nuevoNombre, setNuevoNombre] = useState('');

  const handleNuevoNombreChange = (event) => {
    setNuevoNombre(event.target.value);
  }

  const handleGuardarNuevoNombre = (event) => {
    event.preventDefault();
    
    console.log('Nombre actual:', nombreActual);
    console.log('Nuevo nombre:', nuevoNombre);
    
    setNuevoNombre('');
  }

  return (
    <div className='change'>
      <h1>Cambiar el nombre</h1>
      <div>
        <p className="actual">Nombre actual: UsuarioPrueba</p>
      </div>
      <form className='form' onSubmit={handleGuardarNuevoNombre}>
        <label className='nuevo' htmlFor="nuevoNombre">Nuevo nombre: </label>
        <input
          type="text"
          className='input'
          id="nuevoNombre"
          placeholder='Introduce el nuevo nombre'
          value={nuevoNombre}
          onChange={handleNuevoNombreChange}
        />
        <button type="submit" className='submit'>
          Actualizar nombre
        </button>
      </form>
    </div>
  )
}

export default Changenombre;