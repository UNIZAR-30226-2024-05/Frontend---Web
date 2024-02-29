import React from 'react';
import Carrusel from '../components/Carrusel';
import './Home.css';

const Home = () => {
  
  return (
    <div className='home'>

        <Carrusel title={'Los más vendidos'}/>
        <Carrusel title={'Tus recomendaciones'}/>
        <Carrusel title={'Saga Harry Potter'}/>

    </div>
  );
}


export default Home;