import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaAutores.css';

const ListaAutores = ({autores}) => {
    
        const [listaAutores, setListaAutores] = useState(autores);
        const [listaShow, setListaShow] = useState(autores);
        const [busqueda, setBusqueda] = useState('');
    
        const handleChangeBusqueda = event => {
            setBusqueda(event.target.value);
            filtrar(event.target.value);
        } 
    
        const filtrar = (terminoBusqueda) => {
            var resultado = listaAutores.filter((elemento) => {
                if (elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
                {return elemento;}
            });
            setListaShow(resultado);
        }
    
        const navigate = useNavigate();
    
        const handleAutorClick = (id_autor) => {
            navigate('/autor', {state: {id_autor}})
        }
    
        return (
            <div className="lista-autores">
                <div className="busqueda">
                    <input type="text" placeholder="Buscar autor" value={busqueda} onChange={handleChangeBusqueda}/>
                </div>
                <div className="lista">
                    {listaShow.map((autor) => (
                        <div key={autor.id_autor} className="autor" onClick={() => handleAutorClick(autor.id_autor)}>
                            <img src={autor.imagen} alt={autor.nombre}/>
                            <p>{autor.nombre}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

export default ListaAutores;