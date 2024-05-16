import React, { useState, useContext, useEffect } from 'react';
import Carrusel from '../components/Carrusel/Carrusel';
import CarruselSE from '../components/Carrusel/CarruselSE';
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
  const [carr4, setCarr4] = useState([]);
  /*const genero1 = 'Terror';
  const genero2 = 'Poesía';
  const genero3 = 'Romance';
  const genero4 = 'Romance';*/

  useEffect(() => {
    const generosRandom = elegirGenerosAleatorios();

    var car1 = books.filter((elemento) => {
      if (elemento.genero === generosRandom[0])
        {return elemento;}
    });
    setCarr1(car1);
    var car2 = books.filter((elemento) => {
      if (elemento.genero === generosRandom[1])
        {return elemento;}
    });
    setCarr2(car2);
    var car3 = books.filter((elemento) => {
      if (elemento.genero === generosRandom[2])
        {return elemento;}
    });
    setCarr3(car3);
    var car4 = books.filter((elemento) => {
      if (elemento.genero === generosRandom[3])
        {return elemento;}
    });
    setCarr4(car4);
  }, [books])

  // Variables para conocer el contexto (Usuario conectado o no)
  const { auth } = useContext(AuthContext);
  const { username } = auth;
  const { role } = auth;

  const [ultimoLibro, setUltimoLibro] = useState('');
  const [seguirEscuchando, setSeguirEscuchando] = useState([]);


  useEffect(() => {
    if (username) {
      axios.get('/home', { withCredentials: true })
        .then(response => {
          setUltimoLibro(response.data?.ultimo);
          setSeguirEscuchando(response.data?.seguir_escuchando);
          console.log(response.data);
          console.log(response.data?.seguir_escuchando);
          console.log(response.data?.ultimo);
        })
        .catch(error => {
          console.error('Hubo un error al obtener los datos del usuario:', error);
        });
    }
}, []);

const handleCapituloClick = () => {
  navigate(`/libro?id=${ultimoLibro.id_audiolibro}`);
};

const generos = [
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
  'Aventuras'
];

const elegirGenerosAleatorios = () => {
  const generosAleatorios = [];
  const copiaGeneros = [...generos]; // Creamos una copia de la lista de géneros

  // Elegimos 4 géneros aleatorios
  for (let i = 0; i < 4; i++) {
      const indiceAleatorio = Math.floor(Math.random() * copiaGeneros.length);
      generosAleatorios.push(copiaGeneros.splice(indiceAleatorio, 1)[0]); // Eliminamos el género elegido para que no se repita
  }

  return generosAleatorios;
};

  return (
    <div className='home'>
      {!username ? (
        <> {/* Cabecera si no está logueado */}
          <img className='foto-presentacion' src={logo} alt={'Foto presentación'}></img>
          <div className="texto-presentacion">
            <h2>¡Bienvenido a Narratives!</h2>
          </div>
        </>
      ) : (
        <> {/* Cabecera si está logueado */}
          {role === 'normal' ? (
            <>
            {!ultimoLibro?.id_audiolibro ? <> {/* Cabecera si no está logueado */}
              <img className='foto-presentacion' src={logo} alt={'Foto presentación'}></img>
              <div className="texto-presentacion">
                <h2>¡Bienvenido a Narratives!</h2>
              </div>
              </> : <>
              <img className='foto-presentacion' src={ultimoLibro.img} alt={'Portada-ultimo-leido'} onClick={() => handleCapituloClick()}></img>
              <div className="texto-presentacion">
                <h2>Continua tu lectura</h2>
                <span>Pincha en la portada para continuar por donde lo dejaste.</span>
              </div>
              </>}
            </>
          ) : role === 'admin' ? (
            <>
              <img className='foto-presentacion' src={logo} alt={'Foto presentación'}></img>
              <div className="texto-presentacion">
                <h2>¡Bienvenido, administrador!</h2>
              </div>
            </>
          ) : null}
        </>
      )}
      {seguirEscuchando.length === 0 ? null :
        <CarruselSE title={'Seguir Escuchando'} libros={seguirEscuchando}/>
      }
      <Carrusel title={genero1} libros={carr1}/>
      <Carrusel title={genero2} libros={carr2}/>
      <Carrusel title={genero3} libros={carr3}/>
      <Carrusel title={genero4} libros={carr4}/>
      <Footer />
    </div>
  );
}

export default Home;