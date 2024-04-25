import React, { useState, useEffect } from 'react';
import './Amigos.css';
import ListaAmigos from '../components/ListaAmigos/ListaAmigos.jsx';
import ListaPeticiones from '../components/ListaPeticiones/ListaPeticiones.jsx';
import axios from '../api/axios';

const Amigos = () => {
    const URL_CONSULTA = '/amistad/lista';
    const [amigos, setAmigos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
      async function fetchAmigos(){
          await axios.get(URL_CONSULTA, { withCredentials: true })
          .then(response=>{
              setAmigos(response.data.amigos);
              setLoading(false);
              console.log(response.data);
          }).catch(error=>{
              console.log(error);
              setLoading(false);
          })
      }
      fetchAmigos();
    }, []);
    
    return (
        <div className='amigos'>
            <div className='amigos-lista'>
              <div className='amigos-lista-container'>
              {loading ? (
                <div className='loading-container'>
                  <p>Loading...</p>
                </div>
                ) : (
                <>
                  <h1 className='amigos-titulo'>Tus amigos</h1>
                  <ListaAmigos amigos={amigos} className='list'></ListaAmigos>
                </>)}
              </div>
            </div>
            <div className='amigos-peticiones'>
              <div className='amigos-lista-container'>
                <h1 className='amigos-titulo'>Peticiones</h1>
                <ListaPeticiones className='list' tipos={tipos} amigos={amigos}></ListaPeticiones>
              </div> 
            </div>
        </div>
    )
}

export default Amigos