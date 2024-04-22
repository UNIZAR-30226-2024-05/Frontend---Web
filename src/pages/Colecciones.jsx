import React, { useState } from 'react';
import './Colecciones.css';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';
import Footer from '../components/Footer/Footer';

import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';

const Colecciones = () => {

  const [colecciones, setColecciones] = useState([
    {portada: foto1, nombre: 'Favoritos'},
    {portada: foto2, nombre: 'Escuchalo más tarde'},
    {portada: foto3, nombre: 'Harry Potter'},
    {portada: foto4, nombre: 'Versos Perversos'},
    {portada: foto5, nombre: 'Otra coleccion más'}
  ]);

  return (
    <div className='colecciones'>
      <div className='colecciones-container'>
        <ListaColecciones className='list' colecciones={colecciones}></ListaColecciones>
      </div>
      <div className='colecciones-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Colecciones