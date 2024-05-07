import React, { useState, useEffect, useRef } from 'react';
import { MdMoreVert } from 'react-icons/md'; // Importa el ícono de tres puntos
import './DropdownButtonColeccionesAmigo.css';
import axios from '../../api/axios';

const DropdownButtonColeccionesAmigo = ({ options, collectionId, setColecciones }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const eliminarColeccionConsulta = async () => {

    const URL_COLECCION = '/colecciones';
        async function fetchColecciones(){
            await axios.get(URL_COLECCION, {withCredentials: true})
            .then(response=>{
                setColecciones(response.data.collections);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }

    const URL_CONSULTA = '/colecciones/remove'
    try {
        const respuesta = await axios.post(URL_CONSULTA, 
          JSON.stringify({collectionId}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(respuesta); /* Solo desarrollo */
        fetchColecciones();
        setIsOpen(false);
    } catch (err) {
        if (!err.response) {
            console.log('No hay respuesta del servidor');
        } else if (err.response.status === 500){
            console.log('Server error');
        } else {
            console.log('Error');
        }
    }
  }

  const handleOptionClick = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    // Aquí puedes agregar la lógica para manejar la opción seleccionada
    // Por ejemplo, cerrar el menú desplegable, ejecutar una función, etc.
    switch (option) {
      case 'Eliminar coleccion':
          eliminarColeccionConsulta();
          break;
      case 'Dejar de seguir coleccion':
          eliminarColeccionConsulta();
          break;
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
    }
};

useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
        <button className="dropdown-button" onClick={handleToggleDropdown}>
            <MdMoreVert /> {/* Icono de tres puntos */}
        </button>
        {isOpen && (
            <div className="dropdown-menu">
                {options.map((option, index) => (
                    <div key={index}>
                        <button onClick={() => handleOptionClick(option)}>{option}</button>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default DropdownButtonColeccionesAmigo;