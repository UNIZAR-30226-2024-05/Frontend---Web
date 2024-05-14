import React, { useState, useEffect } from 'react';
import './Colecciones.css';
import axios from '../api/axios';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';
import Footer from '../components/Footer/Footer';
import ErrorNoSesion from '../components/ErrorNoSesion/ErrorNoSesion';

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
                if (error.response && error.response.status === 401) { 
                  console.log('No autorizado');
                  return <ErrorNoSesion/>
                }
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