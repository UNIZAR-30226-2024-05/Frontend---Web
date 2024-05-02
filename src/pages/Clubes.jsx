import React, { useState, useEffect } from 'react';
import './Clubes.css';
import axios from '../api/axios';
import ListaClubes from '../components/ListaClubs/ListaClubes';
import Footer from '../components/Footer/Footer';

const Clubes = () => {
 
  /*
  const [colecciones, setColecciones] = useState([
    {id: 1, titulo: 'Favoritos', propietario: 4},
    {id: 2, titulo: 'Escuchalo más tarde', propietario: 4},
    {id: 3, titulo: 'Harry Potter', propietario: 4},
    {id: 4, titulo: 'Versos Perversos', propietario: 4},
    {id: 5, titulo: 'Otra coleccion más', propietario: 4}
  ]);
  */

  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true); /* Poner TRUE en que descomente consulta */

  
    useEffect( () => {
        const URL_CONSULTA = '/clubes'; /* Cambiar */

        async function fetchClubs(){
            await axios.get(URL_CONSULTA, {withCredentials: true})
            .then(response=>{
                setClubes(response.data.collections);
                setLoading(false);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
                setLoading(false);
            })
        }
        fetchClubs();
    }, []);


  return (
    <div className='clubes'>
      <div className='clubes-container'>
        <h1 className='title'>Mis Clubes</h1>
      {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaClubes className='lista' clubes={clubes} setClubes={setClubes} />
          )}
      </div>
      <div className='clubes-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Clubes