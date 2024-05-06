import React, { useState, useEffect, useRef } from 'react';
import { MdMoreVert } from 'react-icons/md'; // Importa el ícono de tres puntos
import './DropdownButtonClubes.css';
import axios from '../../api/axios';

const DropdownButtonClubes = ({ opcion, club, clubes, setClubes, otrosClubes, setOtrosClubes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const deleteClub = async () => {

    const URL_BORRAR = '/club/delete'
    try {
        const respuesta = await axios.post(URL_BORRAR, 
          JSON.stringify({id: club.id}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(respuesta); /* Solo desarrollo */
        setClubes(clubes.filter(c => c.id !== club.id));
        console.log(clubes);
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

  const leaveClub = async () => {

    const URL_SALIR = '/club/left'
    try {
        const respuesta = await axios.post(URL_SALIR, 
          JSON.stringify({id: club.id}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(respuesta); /* Solo desarrollo */
        setClubes(clubes.filter(c => c.id !== club.id));
        setOtrosClubes(otrosClubes => [...otrosClubes, club]);
        console.log(clubes);
        console.log(otrosClubes);
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

  const joinClub = async () => {

    const URL_UNIRSE = '/club/join'
    try {
        const respuesta = await axios.post(URL_UNIRSE, 
          JSON.stringify({id: club.id}),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        console.log(respuesta); /* Solo desarrollo */
        setClubes(clubes => [...clubes, club]);
        setOtrosClubes(otrosClubes.filter(c => c.id !== club.id));
        console.log(clubes);
        console.log(otrosClubes);
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
        case 'Eliminar club':
            deleteClub();
            break;
        case 'Dejar el club':
            leaveClub();
            break;
        case 'Unirse al club':
            joinClub();
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
                <button onClick={() => handleOptionClick(opcion)}>{opcion}</button>
            </div>
        )}
    </div>
  );
};

export default DropdownButtonClubes;