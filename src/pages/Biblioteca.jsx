import React, { useState, useEffect } from 'react';
import './Biblioteca.css';
import axios from '../api/axios';
import ListaBiblioteca from '../components/ListaBiblioteca/ListaBiblioteca';
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
              if (error.response && error.response.status === 401) { 
                console.log('No autorizado');
                return <ErrorNoSesion/>
              }
          })
      }
      fetchLibros();
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
            <ListaBiblioteca className='lista' generos={generos} libros={libros} />
          )}
      </div>
      <div className='biblioteca-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Biblioteca