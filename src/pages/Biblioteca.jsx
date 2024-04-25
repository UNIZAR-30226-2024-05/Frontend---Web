import React, { useState, useEffect } from 'react';
import './Biblioteca.css';
import axios from '../api/axios';
import ListaLibros from '../components/ListaLibros/ListaLibros';
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

    const URL_CONSULTA = '/audiolibros';

    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
      async function fetchLibros(){
          await axios.get(URL_CONSULTA, {withCredentials: true})
          .then(response=>{
              setLibros(response.data.audiolibros);
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
    <div className='biblioteca'>
      <div className='biblioteca-container'>
        {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaLibros className='list' generos={generos} libros={libros} />
          )}
      </div>
      <div className='biblioteca-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Biblioteca