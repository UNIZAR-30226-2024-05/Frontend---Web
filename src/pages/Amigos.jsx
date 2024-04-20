import React, { useState } from 'react';
import './Amigos.css';
import ListaAmigos from '../components/ListaAmigos/ListaAmigos.jsx';
import ListaPeticiones from '../components/ListaPeticiones/ListaPeticiones.jsx';

const Amigos = () => {
    const [tipos, setTipos] = useState([
        'recibidas',
        'enviadas',
        'aceptadas',
        'rechazadas'
    ]);
    return (
        <div className='amigos'>
            <div className='amigos-lista'>
              <div className='amigos-lista-container'>
                <h1 className='amigos-titulo'>Tus amigos</h1>
                <ListaAmigos className='list'></ListaAmigos>
              </div>
            </div>
            <div className='amigos-peticiones'>
              <div className='amigos-lista-container'>
                <h1 className='amigos-titulo'>Peticiones</h1>
                <ListaPeticiones className='list' tipos={tipos}></ListaPeticiones>
              </div> 
            </div>
        </div>
    )
}

export default Amigos