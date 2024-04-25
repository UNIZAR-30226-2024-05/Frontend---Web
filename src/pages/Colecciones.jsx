import React, { useState, useEffect } from 'react';
import './Colecciones.css';
import axios from '../api/axios';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';
import Footer from '../components/Footer/Footer';

import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';

const Colecciones = () => {
 /*
  const [colecciones, setColecciones] = useState([
    {portada: foto1, nombre: 'Favoritos'},
    {portada: foto2, nombre: 'Escuchalo más tarde'},
    {portada: foto3, nombre: 'Harry Potter'},
    {portada: foto4, nombre: 'Versos Perversos'},
    {portada: foto5, nombre: 'Otra coleccion más'}
  ]);
  */

  const [colecciones, setColecciones] = useState([]);
  const [loading, setLoading] = useState(true); /* Poner TRUE en que descomente consulta */

  
    useEffect( () => {
        const URL_CONSULTA = '/colecciones';

        async function fetchColecciones(){
            await axios.get(URL_CONSULTA, null, {withCredentials: true})
            .then(response=>{
                setColecciones(response.data.collections);
                setLoading(false);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
                setLoading(false);
            })
        }
        fetchColecciones();
    }, []);


  return (
    <div className='colecciones'>
      <div className='colecciones-container'>
      {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaColecciones className='lista' colecciones={colecciones} />
          )}
      </div>
      <div className='colecciones-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Colecciones