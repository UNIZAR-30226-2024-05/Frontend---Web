import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import './Change.css';

export const Changenombre = () => {
  const { auth, updateUsername } = useContext(AuthContext);
  const { username } = auth;

  //const [nombreActual, setNombreActual] = useState('UsuarioPrueba');
  const [nuevoNombre, setNuevoNombre] = useState('');

  const handleNuevoNombreChange = (event) => {
    setNuevoNombre(event.target.value);
  }

  const handleGuardarNuevoNombre = (event) => {
    event.preventDefault();
    
    console.log('Nombre actual:', username);
    console.log('Nuevo nombre:', nuevoNombre);

    updateUsername(nuevoNombre);
    
    setNuevoNombre('');
  }

  return (
    <div className='change'>
      <div className='main-element'>
        <h1>Cambiar el nombre</h1>
        <div>
          <p className="actual">Nombre actual: {username}</p>
        </div>
        <form className='change-form' onSubmit={handleGuardarNuevoNombre}>
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
    </div>
  )
}

export default Changenombre;
