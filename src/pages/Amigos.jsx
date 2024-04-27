import React, { useState, useEffect } from 'react';
import './Amigos.css';
import ListaAmigos from '../components/ListaAmigos/ListaAmigos.jsx';
import ListaPeticiones from '../components/ListaPeticiones/ListaPeticiones.jsx';
import axios from '../api/axios';

const Amigos = () => {
    const URL_CONSULTA = '/amistad/lista';
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const [peticiones, setPeticiones] = useState([]);
    const [enviadas, setEnviadas] = useState([]);
    const [recibidas, setRecibidas] = useState([]);
    const [aceptadas, setAceptadas] = useState([]);
    const [rechazadas, setRechazadas] = useState([]);

    useEffect( () => {
      async function fetchUsuarios(){
          await axios.get(URL_CONSULTA, { withCredentials: true })
          .then(response=>{
              setUsuarios(response.data.users);
              setLoading(false);
              console.log(response.data);
          }).catch(error=>{
              console.log(error);
              setLoading(false);
          })
      }

      async function fetchPeticiones() {
        await axios.get('/amistad/peticiones', { withCredentials: true })
        .then(response => {
            setPeticiones(response.data.peticiones);
            console.log(response.data);
    
            if (response.data.peticiones) {
                if (response.data.peticiones.enviadas) {
                    setEnviadas(response.data.peticiones.enviadas);
                }
                if (response.data.peticiones.recibidas) {
                    setRecibidas(response.data.peticiones.recibidas);
                }
                if (response.data.peticiones.aceptadas) {
                    setAceptadas(response.data.peticiones.aceptadas);
                }
                if (response.data.peticiones.rechazadas) {
                    setRechazadas(response.data.peticiones.rechazadas);
                }
            }
        })
      }
      fetchUsuarios();
      fetchPeticiones();
    }, []);


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
              {loading ? (
                <div className='loading-container'>
                  <p>Loading...</p>
                </div>
                ) : (
                <>
                  <h1 className='amigos-titulo'>Tus amigos</h1>
                  <ListaAmigos usuarios={usuarios} className='list'></ListaAmigos>
                </>)}
              </div>
            </div>
            <div className='amigos-peticiones'>
              <div className='amigos-lista-container'>
                <h1 className='amigos-titulo'>Historial de peticiones</h1>
                <ListaPeticiones className='list' peticiones={peticiones} enviadas={enviadas} recibidas={recibidas} aceptadas={aceptadas} rechazadas={rechazadas}></ListaPeticiones>
              </div> 
            </div>
        </div>
    )
}

export default Amigos