import React, { useState } from 'react';
import './PerfilAmigo.css';
import fotoPerfil from '../images/foto1.jpg';

import foto1 from '../images/1.png';
import foto2 from '../images/2.jpg';
import foto3 from '../images/3.jpg';
import foto4 from '../images/4.jpg';
import foto5 from '../images/5.jpg';
import ListaColecciones from '../components/ListaColecciones/ListaColecciones';

const PerfilAmigo = () => {
    const usuario = {
        nombre: 'Juan',
        foto: fotoPerfil,
    };
    const esAmigo = true;
    const [colecciones, setColecciones] = useState([
        {portada: foto1, nombre: 'Favoritos'},
        {portada: foto2, nombre: 'Escuchalo más tarde'},
        {portada: foto3, nombre: 'Harry Potter'},
        {portada: foto4, nombre: 'Versos Perversos'},
        {portada: foto5, nombre: 'Otra coleccion más'}
    ]);

    const [solicitudEnviada, setSolicitudEnviada] = useState(false);

    const enviarSolicitud = () => {
        setSolicitudEnviada(prevState => !prevState);
        console.log('Solicitud enviada');
    }

    return (
        <div className="amigo-perfil-usuario">
            <div className="amigo-foto-perfil">
                <img src={usuario.foto} alt="Foto de perfil" />
            </div>
            <div className="amigo-info-usuario">
                <h2>{usuario.nombre}</h2>
                {esAmigo ? (
                    <button className="amigo-somos-amigos">Somos amigos</button>
                ) : (
                    <button className='amigo-boton-solicitud' onClick={enviarSolicitud}>
                        {solicitudEnviada ? 'Cancelar solicitud' : 'Añadir amigo'}
                    </button>
                )}
                {esAmigo && (
                    <div className="amigo-colecciones-libros">
                        <ListaColecciones className='list' colecciones={colecciones}></ListaColecciones>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PerfilAmigo
