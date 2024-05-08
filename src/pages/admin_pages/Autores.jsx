import React, { useState, useEffect } from 'react';
import './Autores.css';
import axios from '../../api/axios';
import ListaAutores from '../../components/ListaAutores/ListaAutores';
import Footer from '../../components/Footer/Footer';

const Autores = () => {
    const URL_CONSULTA = '/autores/lista';
    
    const [autores, setAutores] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        async function fetchAutores(){
            await axios.get(URL_CONSULTA, {withCredentials: true})
            .then(response=>{
                setAutores(response.data.autores);
                setLoading(false);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
                setLoading(false);
            })
        }
        fetchAutores();
    }, []);
    
    return (
        <div className='autores'>
        <div className='autores-container'>
            <h1 className='nombre'>Autores</h1>
            {loading ? (
            <div className='loading-container'>
                <p>Loading...</p>
            </div>
            ) : (
                <ListaAutores className='lista' autores={autores} />
            )}
        </div>
        <div className='autores-footer'>
            <Footer className='footer' />
        </div>
        </div>
    );
}

export default Autores;