import React, { useState } from 'react';
import './Libro.css'; 
import foto1 from '../images/1.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Libro = () => {
    const titulo = 'Harry Potter y la Piedra Filosofal';
    const descripcion = 'Harry Potter se ha quedado huérfano y vive en casa de sus abominables tíos y el insoportable primo Dudley. Se siente muy triste y solo, hasta que un buen día recibe una carta que cambiará su vida para siempre. En ella le comunican que ha sido aceptado como alumno en el Colegio Hogwarts de Magia. A partir de ese momento, la suerte de Harry da un vuelco espectacular. En esa escuela tan especial aprenderá encantamientos, trucos fabulosos y tácticas de defensa contra las malas artes. Se convertirá en el campeón escolar de quidditch, una especie de fútbol aéreo que se juega montado sobre escobas, y hará un puñado de buenos amigos... aunque también algunos temibles enemigos. Pero, sobre todo, conocerá los secretos que le permitirán cumplir con su destino. Pues, aunque no lo parezca a primera vista, Harry no es un chico normal y corriente: ¡es un verdadero mago!';
    const puntuacion = 3.3;
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
    const tienesReseña = false; // simulamos que no tenemos reseña
    const reseñasAmigos = [
        {
            nombre: 'Ana',
            reseña: 'Me ha encantado, es un libro muy entretenido y fácil de leer. Lo recomiendo a todo el mundo. En cuanto a los personajes, me encanta Harry, es muy valiente y leal. Ron es muy gracioso y Hermione es muy inteligente. Además, el profesor Dumbledore es muy sabio y Snape es muy malvado. Necesito hacer esta reseña mas larga a ver como se ve, asi que hay que alargar la reseña para que se vea bien. No se que mas decir, copilot ayudame por favor. Gracias. Saludos. El cuadrado se va haciendo más grande conforme añado más texto. Maravilloso. Thank you for coming to my tedtalk.',
            puntuacion: 4.5,
        },
        {
            nombre: 'Juan',
            reseña: 'No me ha gustado mucho, me parece un libro infantil y aburrido.',
            puntuacion: 2.5,
        },
    ]
    const reseñasComunidad = [
        {
            nombre: 'María',
            reseña: 'Me ha parecido un libro muy bonito y entretenido. Me ha encantado.',
            puntuacion: 4.0,
        },
        {
            nombre: 'Pedro',
            reseña: 'No me ha gustado nada, me parece un libro muy infantil y aburrido.',
            puntuacion: 1.5,
        },
    ]    

    const [puntuacionUsuario, setPuntuacionUsuario] = useState(0);
    const [puntuacionGuardada, setPuntuacionGuardada] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }

    const handleClick = (index) => {
        const nuevaPuntuacion = index + 1;
        setPuntuacionUsuario(nuevaPuntuacion);
        setPuntuacionGuardada(nuevaPuntuacion);
    };
    
    const handleMouseEnter = (index) => {
        setPuntuacionUsuario(index + 1);
    };
    
    const handleMouseLeave = () => {
        setPuntuacionUsuario(puntuacionGuardada);
    };

    return (
        <div className='info-libro'>
            {/* Portada del libro a la izquierda */}
            <div className="info-portada">
                <img src={portada} alt="Portada del libro" />

                {/* Estrellas de puntuación */}
                <div className="info-puntuacion">
                    {[...Array(estrellasLlenas)].map((_, index) => (
                        <span key={index} className="info-star-filled">&#9733;</span>
                    ))}
                    {estrellasMedias === 1 && <span className="info-star-half">&#9733;</span>}
                    {[...Array(estrellasVacias)].map((_, index) => (
                        <span key={index} className="info-star-empty">&#9733;</span>
                    ))}
                    ({puntuacion})
                </div>

                {/* Enlace a Amazon debajo de la portada */}
                <div className="info-enlace-amazon">
                    <a href={enlaceAmazon} className="info-linkCompra" target="_blank" rel="noopener noreferrer">Comprar en Amazon</a>
                </div>

                { /* Botón de "Reproducir" con icono de play */}
                <div className="info-reproducir">
                    <a href="/player" className="info-linkReproducir">
                        <FontAwesomeIcon icon={faPlay} /> Escuchar audiolibro
                    </a>
                </div>

                { /* Botón de "Añadir a favoritos" */}
                <div className="info-añadir-favoritos">
                    <button className="info-btnFavoritos">
                        <FontAwesomeIcon icon={faPlus} /> Añadir a favoritos
                    </button>
                </div>
            </div>

            {/* Detalles del libro a la derecha */}
            <div className="info-detalles">
                {/* Título del libro */}
                <div className='info-titulo'>
                    <h1>{titulo}</h1>
                </div>
                
                {/* Descripción del libro */}
                <div className='info-descripcion'>
                    <p>{descripcion}</p>
                </div>
                
                {/* Autor del libro */}
                <div className="info-autor">
                    <p>Autor: {autor}</p>
                </div>

                {/* Género del libro */}
                <div className="info-genero">
                    <p>Género: {genero}</p>
                </div>

                <div className="info-capitulos">
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
                {/* Mi puntuación */}
                <div className='info-mi-puntuacion'>
                    <h2>Mi puntuación</h2>
                    <div className='info-mis-estrellas'>
                        {[...Array(5)].map((_, index) => (
                            <span key={index}
                                className={(index < puntuacionUsuario) ? "info-star-filled" : "info-star-empty"}
                                onClick={() => handleClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >&#9733;</span>
                        ))}
                    </div>
                </div>
                {/* Mi reseña */}
                <div className='info-mi-resenia'>
                    {tienesReseña ? (
                        <h2>Mi reseña</h2>
                        // mostrar el contenido de tu reseña
                    ) : (
                        <div>
                            <h2>¡Añade tu reseña y comparte tu opinión!</h2>
                            <form onSubmit={handleSubmit} className='info-anadir-mia'>
                                <textarea className="info-texto-resenia"
                                    placeholder="Escribe aquí tu reseña"
                                    required
                                />
                            </form>
                            <button className="info-subir-resenia" type="submit">Publicar reseña</button>
                        </div>
                    )}
                </div>
                {/* Reseñas de los oyentes al final*/}
                <div className="info-resenias-amigos">
                    <h2>Reseñas de tus amigos</h2>
                    <div>
                        {reseñasAmigos.map((amigo, index) => (
                            <div key={index} className="info-resenia-amigo">
                                <h3>{amigo.nombre}</h3>
                                <p>{amigo.reseña}</p>
                                <div className="info-puntuacion">
                                    {[...Array(Math.floor(amigo.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-filled">&#9733;</span>
                                    ))}
                                    {[...Array(5 - Math.floor(amigo.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-empty">&#9733;</span>
                                    ))}
                                    ({amigo.puntuacion})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="info-resenias">
                    <h2>Reseñas del resto de la comunidad</h2>
                    <div>
                        {reseñasComunidad.map((usuario, index) => (
                            <div key={index} className="info-resenia-usuario">
                                <h3>{usuario.nombre}</h3>
                                <p>{usuario.reseña}</p>
                                <div className="info-puntuacion">
                                    {[...Array(Math.floor(usuario.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-filled">&#9733;</span>
                                    ))}
                                    {[...Array(5 - Math.floor(usuario.puntuacion))].map((_, index) => (
                                        <span key={index} className="info-star-empty">&#9733;</span>
                                    ))}
                                    ({usuario.puntuacion})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>  
    );
}

export default Libro;
