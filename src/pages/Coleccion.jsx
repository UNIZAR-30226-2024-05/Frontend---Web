import React, { useState, useEffect } from 'react';
import './Coleccion.css';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';
import Footer from '../components/Footer/Footer';
import ListaColeccion from '../components/ListaColeccion/ListaColeccion';

const Coleccion = () => {

    const location = useLocation();
    const id_coleccion = location.state?.id_coleccion;

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
          })
      }
      fetchLibros();
  }, []);



  return (
    <div className='coleccion'>
      <div className='coleccion-container'>
      {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaColeccion className='lista' coleccion={coleccion}/>
          )}
      </div>
      <div className='coleccion-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Coleccion