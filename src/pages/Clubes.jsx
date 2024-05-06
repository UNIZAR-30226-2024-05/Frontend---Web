import React, { useState, useEffect } from 'react';
import './Clubes.css';
import axios from '../api/axios';
import ListaClubes from '../components/ListaClubs/ListaClubes';
import Footer from '../components/Footer/Footer';

const Clubes = () => {
 

  const [libros, setLibros] = useState([
    {titulo: 'primero'},
    {titulo: 'segundo'}
  ]);

  const [clubes, setClubes] = useState([
    {id: 1, titulo: 'Mi club', propietario: 4, seguido: true},
    {id: 2, titulo: 'Club Harry Potter', propietario: 5, seguido: true},
    {id: 3, titulo: 'Club de la trucha', propietario: 5, seguido: true}
  ]);

  const [otrosClubes, setOtrosClubes] = useState([
    {id: 4, titulo: 'Faltadas', propietario: 5, seguido: false},
    {id: 5, titulo: 'Otro club más', propietario: 5, seguido: false}
  ])


  //const [clubes, setClubes] = useState([]);
  //const [otrosClubes, setOtrosClubes] = useState([]);
  const [loading, setLoading] = useState(true); /* Poner TRUE en que descomente consulta */
  const [loading2, setLoading2] = useState(true); /* Poner TRUE en que descomente consulta */

  useEffect( () => {
    const URL_LIBROS = '/audiolibros';
    async function fetchLibros(){
        await axios.get(URL_LIBROS, {withCredentials: true})
        .then(response=>{
            setLibros(response.data.audiolibros);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    fetchLibros();
  }, []);

    useEffect( () => {
        const URL_CLUBES = '/club/lista'; /* Cambiar */
        const URL_OTROS_CLUBES = '/club/all'; /* Cambiar */

        async function fetchClubes(){
            await axios.get(URL_CLUBES, {withCredentials: true})
            .then(response=>{
                setClubes(response.data.listaClubes);
                setLoading(false);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
                setLoading(false);
            })
        }

        async function fetchOtrosClubes(){
          await axios.get(URL_OTROS_CLUBES, {withCredentials: true})
          .then(response=>{
              setOtrosClubes(response.data.listaClubes);
              setLoading2(false);
              console.log(response.data);
          }).catch(error=>{
              console.log(error);
              setLoading2(false);
          })
      }
        fetchClubes();
        fetchOtrosClubes();
    }, []);


  return (
    <div className='clubes'>
      <div className='clubes-container'>
        <h1 className='title'>Mis Clubes</h1>
      {(loading && loading2) ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <ListaClubes className='lista'
            clubes={clubes} 
            setClubes={setClubes}
            otrosClubes={otrosClubes}
            setOtrosClubes={setOtrosClubes}
            libros={libros} />
          )}
      </div>
      <div className='clubes-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Clubes