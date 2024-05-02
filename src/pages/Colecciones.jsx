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
    {id: 1, titulo: 'Favoritos', propietario: 4},
    {id: 2, titulo: 'Escuchalo más tarde', propietario: 4},
    {id: 3, titulo: 'Harry Potter', propietario: 4},
    {id: 4, titulo: 'Versos Perversos', propietario: 4},
    {id: 5, titulo: 'Otra coleccion más', propietario: 4}
  ]);
  */

  const [colecciones, setColecciones] = useState([]);
  const [loading, setLoading] = useState(true); /* Poner TRUE en que descomente consulta */

  
    useEffect( () => {
        const URL_CONSULTA = '/colecciones';

        async function fetchColecciones(){
            await axios.get(URL_CONSULTA, {withCredentials: true})
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
        <h1 className='title'>Mis Colecciones</h1>
      {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaColecciones className='lista' colecciones={colecciones} setColecciones={setColecciones} />
          )}
      </div>
      <div className='colecciones-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Colecciones