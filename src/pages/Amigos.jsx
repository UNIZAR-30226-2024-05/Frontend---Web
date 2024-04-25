import React, { useState } from 'react';
import './Amigos.css';
import ListaAmigos from '../components/ListaAmigos/ListaAmigos.jsx';
import ListaPeticiones from '../components/ListaPeticiones/ListaPeticiones.jsx';

const Amigos = () => {
    const URL_CONSULTA = '/amistad/amigos';
    const [amigos, setAmigos] = useState([]);

    /*const listaAmigosFicticia = [
            { username: 'Juan' },
            { username: 'María' },
            { username: 'Pedro' },
            { username: 'Ana' },
            { username: 'Carlos' }
        ];*/

    useEffect( () => {
      async function fetchAmigos(){
          await axios.get(URL_CONSULTA, { withCredentials: true })
          .then(response=>{
              setAmigos(response.data.amigos);
              setListaAmigos(response.data.amigos);
              setListaShow(response.data.amigos);
              console.log(response.data);
          }).catch(error=>{
              console.log(error);
          })
      }
      fetchAmigos();
      /*setAmigos(listaAmigosFicticia);
      setListaAmigos(listaAmigosFicticia);
      setListaShow(listaAmigosFicticia);*/
    }, []);


    const [tipos, setTipos] = useState([
        'recibidas',
        'enviadas',
        'aceptadas',
        'rechazadas'
    ]);


    return (
        <div className='amigos'>
            <div className='amigos-lista'>
              <div className='amigos-lista-container'>
                <h1 className='amigos-titulo'>Tus amigos</h1>
                <ListaAmigos className='list'></ListaAmigos>
              </div>
            </div>
            <div className='amigos-peticiones'>
              <div className='amigos-lista-container'>
                <h1 className='amigos-titulo'>Peticiones</h1>
                <ListaPeticiones className='list' tipos={tipos} amigos={amigos}></ListaPeticiones>
              </div> 
            </div>
        </div>
    )
}

export default Amigos