import React from 'react';
import './Libro.css'; 
import foto1 from '../images/1.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Libro = () => {
    const titulo = 'Harry Potter y la Piedra Filosofal';
    const descripcion = 'Harry Potter se ha quedado huérfano y vive en casa de sus abominables tíos y el insoportable primo Dudley. Se siente muy triste y solo, hasta que un buen día recibe una carta que cambiará su vida para siempre. En ella le comunican que ha sido aceptado como alumno en el Colegio Hogwarts de Magia. A partir de ese momento, la suerte de Harry da un vuelco espectacular. En esa escuela tan especial aprenderá encantamientos, trucos fabulosos y tácticas de defensa contra las malas artes. Se convertirá en el campeón escolar de quidditch, una especie de fútbol aéreo que se juega montado sobre escobas, y hará un puñado de buenos amigos... aunque también algunos temibles enemigos. Pero, sobre todo, conocerá los secretos que le permitirán cumplir con su destino. Pues, aunque no lo parezca a primera vista, Harry no es un chico normal y corriente: ¡es un verdadero mago!';
    const puntuacion = 4.2;
    const estrellasLlenas = Math.floor(puntuacion);
    const estrellasMedias = puntuacion - estrellasLlenas >= 0.5 ? 1 : 0;
    const estrellasVacias = 5 - estrellasLlenas - estrellasMedias;
    const enlaceAmazon = 'https://www.amazon.es/Harry-Potter-Piedra-Filosofal-Rowling/dp/8478884459';
    const autor = 'J.K. Rowling';
    const genero = 'Fantasía';
    const portada = foto1;
    const capitulos = [
        {
            titulo: 'Capítulo 1: El niño que vivió',
            duracion: '1:30:00',
        },
        {
            titulo: 'Capítulo 2: El andén 9 y 3/4',
            duracion: '1:45:00',
        },
        {
            titulo: 'Capítulo 3: El sombrero seleccionador',
            duracion: '1:20:00',
        },
        {
            titulo: 'Capítulo 4: La piedra filosofal',
            duracion: '1:35:00',
        },
        {
            titulo: 'Capítulo 5: El espejo de Oesed',
            duracion: '1:40:00',
        },
        {
            titulo: 'Capítulo 6: Norberto el dragón',
            duracion: '1:25:00',
        },
        {
            titulo: 'Capítulo 7: El bosque prohibido',
            duracion: '1:50:00',
        },
        {
            titulo: 'Capítulo 8: El partido de quidditch',
            duracion: '1:30:00',
        },
        {
            titulo: 'Capítulo 9: La piedra filosofal',
            duracion: '1:45:00',
        },
    ]
  
    return (
        <div className='libro'>
            {/* Portada del libro a la izquierda */}
            <div className="portada">
                <img src={portada} alt="Portada del libro" />

                {/* Estrellas de puntuación */}
                <div className="puntuacion">
                    {[...Array(estrellasLlenas)].map((_, index) => (
                        <span key={index} className="star filled">&#9733;</span>
                    ))}
                    {estrellasMedias === 1 && <span className="star half">&#9733;</span>}
                    {[...Array(estrellasVacias)].map((_, index) => (
                        <span key={index} className="star empty">&#9733;</span>
                    ))}
                    ({puntuacion})
                </div>

                {/* Enlace a Amazon debajo de la portada */}
                <div className="enlace-amazon">
                    <a href={enlaceAmazon} className="linkCompra" target="_blank" rel="noopener noreferrer">Comprar en Amazon</a>
                </div>

                { /* Botón de "Reproducir" con icono de play */}
                <div className="reproducir">
                    <a href="/reproductor" className="linkReproducir">
                        <FontAwesomeIcon icon={faPlay} /> Escuchar audiolibro
                    </a>
                </div>

                { /* Botón de "Añadir a favoritos" */}
                <div className="añadir-favoritos">
                    <button className="btnFavoritos">
                        <FontAwesomeIcon icon={faPlus} /> Añadir a favoritos
                    </button>
                </div>
            </div>

            {/* Detalles del libro a la derecha */}
            <div className="detalles">
                {/* Título del libro */}
                <div className='titulo'>
                    <h1>{titulo}</h1>
                </div>
                
                {/* Descripción del libro */}
                <div className='descripcion'>
                    <p>{descripcion}</p>
                </div>
                
                {/* Autor del libro */}
                <div className="autor">
                    <p>Autor: {autor}</p>
                </div>

                {/* Género del libro */}
                <div className="genero">
                    <p>Género: {genero}</p>
                </div>

                <div className="capitulos">
                    <h2 className="tituloCap"> Capítulos</h2>
                    <div>
                        {capitulos.map((capitulo, index) => (
                            <li key={index}>
                                <span>{capitulo.titulo}</span>
                                <span>{capitulo.duracion}</span>
                            </li>
                        ))}
                    </div>
                </div>
                {/* Comentarios de los oyentes al final*/}
                <div className="comentarios">
                    <h2>Comentarios de los oyentes</h2>
                </div>
            </div>
            
        </div>  
    );
}

export default Libro;
