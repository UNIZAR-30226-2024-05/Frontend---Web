import React, { useState, useEffect } from 'react';
import './Biblioteca.css';
import axios from '../api/axios';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';
import Footer from '../components/Footer/Footer';

const Biblioteca = () => {
  const [generos, setGeneros] = useState([
    'Misterio',
    'Fantasía',
    'Romance',
    'Terror',
    'Ciencia ficción',
    'Historico',
    'Infantil',
    'Mitología',
    'Humor',
    'Autoayuda',
    'Poesía',
    'Aventuras']);

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
    <div className='biblioteca'>
      <div className='biblioteca-container'>
        <h1 className='title'>Biblioteca</h1>
        {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaColecciones className='lista' colecciones={colecciones} setColecciones={setColecciones} />
          )}
      </div>
      <div className='biblioteca-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Biblioteca