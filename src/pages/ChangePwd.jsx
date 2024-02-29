import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Changepwd = () => {
    const nav = useNavigate();

  return (
    <div className='changepwd'>
        <h1>Cambiar la contraseña</h1>
    </div>
  )
}

export default Changepwd