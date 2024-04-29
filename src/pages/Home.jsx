import React, { useState, useContext, useEffect } from 'react';
import Carrusel from '../components/Carrusel/Carrusel';
import './Home.css';
import logo from '../images/logo.png';
import Footer from '../components/Footer/Footer';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';


import foto1 from '../images/1.png';

const Home = () => {

  const navigate = useNavigate();
  const id_libro = 1;
  const [capitulos, setCapitulos] = useState([]);
  const [portada, setPortada] = useState();

  useEffect(() => {

    if (id_libro) {
        obtenerDatosLibro();
    }
    else {
        console.log('No se ha pasado ningún libro');
        navigate('/');
    }
  }, []); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez al montar el componente

  const obtenerDatosLibro = () => {
    const URL_AUDIOLIBRO = `/audiolibros/${id_libro}`;
    axios.get(URL_AUDIOLIBRO, {withCredentials: true})
    .then(response => {
        // Actualiza el estado de los libros con los datos de los audiolibros recibidos
        setCapitulos(response.data.capitulos);
        setPortada(response.data.audiolibro.img);
        console.log(response.data);
    })
    .catch(error => {
        // Maneja los errores si ocurrieron
        console.error('Hubo un error al obtener el audiolibro:', error);
    });
  };

  const handleCapituloClick = (capitulos, portada) => {
    navigate('/player', {state: {capitulos, portada}});
  };

  const URL_AUDIOLIBROS = '/audiolibros';

  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(URL_AUDIOLIBROS)
      .then(response => {
        // Actualiza el estado de los libros con los datos de los audiolibros recibidos
        setBooks(response.data.audiolibros);
        console.log(response.data.audiolibros);
      })
      .catch(error => {
        // Maneja los errores si ocurrieron
        console.error('Hubo un error al obtener los audiolibros:', error);
      });
  }, []); // La dependencia vacía [] asegura que este efecto se ejecute solo una vez al montar el componente

  
  const [carr1, setCarr1] = useState([]);
  const [carr2, setCarr2] = useState([]);
  const [carr3, setCarr3] = useState([]);
  const genero1 = 'Terror';
  const genero2 = 'Poesía';
  const genero3 = 'Romance';

  useEffect(() => {
    var car1 = books.filter((elemento) => {
      if (elemento.genero === genero1)
        {return elemento;}
    });
    setCarr1(car1);
    var car2 = books.filter((elemento) => {
      if (elemento.genero === genero2)
        {return elemento;}
    });
    setCarr2(car2);
    var car3 = books.filter((elemento) => {
      if (elemento.genero === genero3)
        {return elemento;}
    });
    setCarr3(car3);
  }, [books])

  // Variables para conocer el contexto (Usuario conectado o no)
  const { auth } = useContext(AuthContext);
  const { username } = auth;

  return (
    <div className='home'>
      {!username ? (
        <>{/* Cabecera si no está logueado */}
          <img className='foto-presentacion' src={logo} alt={'Foto presentación'}></img>
          <div className="texto-presentacion">
            <h2>¡Bienvenido a Narratives!</h2>
          </div>
        </>
      ) : (<> {/* Cabecera si está logueado */}
          <img className='foto-presentacion' src={foto1} alt={'Portada-ultimo-leido'} onClick={() => handleCapituloClick(capitulos, portada)}></img>
          <div className="texto-presentacion">
            <h2>Continua tu lectura</h2>
            <span>Pincha en la portada para continuar por donde lo dejaste.</span>
          </div>
        </>)}
      <Carrusel title={'Todos'} libros={books}/>
      <Carrusel title={genero1} libros={carr1}/>
      <Carrusel title={genero2} libros={carr2}/>
      <Carrusel title={genero3} libros={carr3}/>
      <Footer />
    </div>
  );
}

export default Home;