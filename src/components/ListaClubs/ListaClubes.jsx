import React, { useState, useContext, useEffect } from 'react';
import './ListaClubes.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import DropdownButtonClubes from './DropdownButtonClubes';

const ListaClubes = ({clubes, setClubes}) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;

    const [crearClub, setCrearClub] = useState(false);
    const showCrearClub = () => {
        setCrearClub(!crearClub)
        setErrMsg('');
    };
    
    const [listaClubes, setListaClubes] = useState(clubes);
    const [busqueda, setBusqueda] = useState('');

    const [nuevoClub, setNuevoClub] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    const [clubesFavoritos, setClubesFavoritos] = useState(listaClubes.filter(club => club.titulo === "Favoritos"));
    const [clubesEscucharMasTarde, setClubesEscucharMasTarde] = useState(listaClubes.filter(club => club.titulo === "Escuchar mas tarde"));

    // Filtrar las demás clubes
    const [otrosClubes, setOtrosClubes] = useState(listaClubes.filter(club => club.titulo !== "Favoritos" && club.titulo !== "Escuchar mas tarde"));

    useEffect(() => {
        setClubesFavoritos(listaClubes.filter(club => club.titulo === "Favoritos"));
        setClubesEscucharMasTarde(listaClubes.filter(club => club.titulo === "Escuchar mas tarde"));
        setOtrosClubes(listaClubes.filter(club => club.titulo !== "Favoritos" && club.titulo !== "Escuchar mas tarde"));
      }, [listaClubes]);
    
    useEffect(() => {
        setListaClubes(clubes);
      }, [clubes]);

    const opciones_col_propia = [
        'Eliminar club'
    ];

    const opciones_col_ajena = [
        'Dejar de seguir club'
    ];

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    }

    const handleChangeNuevoClub = (event) => {
        setNuevoClub(event.target.value);
    } 

    const URL_CLUB = '/clubes';     /* ATENTO */

    async function fetchClubes(){
        await axios.get(URL_CLUB, {withCredentials: true})
        .then(response=>{
            setClubes(response.data.clubs);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
            setLoading(false);
        })
    }

    const handleClickSubmitClub = async () => {

        const URL_CONSULTA = '/clubes/create'; /* ATENTO */

        if(nuevoClub.length > 4 && nuevoClub.length < 30 ){
            try {
                const respuesta = await axios.post(URL_CONSULTA, 
                JSON.stringify({title: nuevoClub}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                console.log(respuesta); /* Solo desarrollo */
                setNuevoClub('');
                setCrearClub(false);
                setErrMsg('');
                fetchClubes();
            } catch (err) {
                if (!err.response) {
                    setErrMsg('No hay respuesta del servidor');
                } else if (err.response.status === 400) {
                    setErrMsg('Error: Titulo existente'); 
                } else if (err.response.status === 500){
                    setErrMsg('Server error');
                } else {
                    setErrMsg('Error');
                }
            }
        }
        else {
            setErrMsg('El club debe tener entre 5 y 30 caracteres');
        }
    }

    const filtrar = (terminoBusqueda) => {
        var resultado = clubes.filter((elemento) => {
            if (elemento.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()))
            {return elemento;}
        });
        setListaClubes(resultado);
    }

    const handleClubClick = (id_club) => {
        navigate('/club', {state: {id_club}})
    }

    {/* En que se pueda, cambiar todo lo de clubes por una consulta al servidor. */}

    return (
    <div className='contenedor-lista'>
        <div className='buscador-container'>
            <button className='crear-club-btn' onClick={showCrearClub}>
                Crear nuevo club
            </button>
            <input className='buscador'
                placeholder='Búsqueda por nombre del club'
                value={busqueda}
                onChange={handleChangeBusqueda}
            />
        </div>

        {crearClub ? (
            <div className='crear-club-container'>
                <input className='nombre-nuevo-club'
                placeholder='Cómo quiere llamar a su nuevo club'
                value={nuevoClub}
                onChange={handleChangeNuevoClub}/>

                <button className='submit-club-button' onClick={handleClickSubmitClub}> Enter </button>
                
            </div>
        ) : null}
        {errMsg && <div className="sign-error-message"><p>{errMsg}</p></div>}

        <div className='lista'>
            {clubesFavoritos.map((club, i) => (
                <div key={i} className='club'>
                    <div className='contenido-club'>
                        <div className='nombre' onClick={() => handleClubClick(club.id)}>
                            <h1>{club.titulo}</h1>
                        </div>
                    </div>
                </div>
            ))}
            {clubesEscucharMasTarde.map((club, i) => (
                <div key={i} className='club'>
                    <div className='contenido-club'>
                        <div className='nombre' onClick={() => handleClubClick(club.id)}>
                            <h1>{club.titulo}</h1>
                        </div>
                    </div>
                </div>
            ))}
            {otrosClubes.map((club, i) => (
                <div key={i} className='club'>
                    <div className='contenido-club'>
                        <div className='nombre' onClick={() => handleClubClick(club.id)}>
                            <h1>{club.titulo}</h1>
                        </div>
                    </div>
                    {user_id === club.propietario ? 
                        <div className='boton-container'>
                            <DropdownButtonClubes 
                            className='boton-opciones' 
                            options={opciones_col_propia} 
                            club_Id={club.id}
                            setClubes={setClubes}/>
                        </div> : 
                        <div className='boton-container'>
                            <DropdownButtonClubes
                            className='boton-opciones'
                            options={opciones_col_ajena}
                            club_Id={club.id} 
                            setClubes={setClubes}/>
                        </div>
                    }
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default ListaClubes;