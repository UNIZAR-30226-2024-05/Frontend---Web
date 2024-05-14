import React, { useState, useEffect } from 'react';
import './Coleccion.css';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';
import Footer from '../components/Footer/Footer';
import ListaColeccion from '../components/ListaColeccion/ListaColeccion';
import ErrorNoSesion from '../components/ErrorNoSesion/ErrorNoSesion';

const Coleccion = () => {

    const location = useLocation();
    const id_coleccion = new URLSearchParams(location.search).get('id');

    const [coleccion, setColeccion] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const URL_COLECCION = `/colecciones/${id_coleccion}`

      async function fetchLibros(){
          await axios.get(URL_COLECCION, {withCredentials: true})
          .then(response=>{
              setColeccion(response.data);
              setLoading(false);
              console.log(response.data);
          }).catch(error=>{
              console.log(error);
              setLoading(false);
              if (error.response && error.response.status === 401) { 
                console.log('No autorizado');
                return <ErrorNoSesion/>
              }
          })
      }
      fetchLibros();
  }, []);



  return (
    <div className='coleccion'>
      <div className='coleccion-container'>
        <h1 className='title'>{coleccion?.coleccion?.titulo}</h1>
      {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaColeccion className='lista' coleccion={coleccion} setColeccion={setColeccion} />
          )}
      </div>
      <div className='coleccion-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Coleccion