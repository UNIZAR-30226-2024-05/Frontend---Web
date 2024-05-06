import React, { useState, useContext, useEffect } from 'react';
import './ListaClubes.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';
import DropdownButtonClubes from './DropdownButtonClubes';

const ListaClubes = ({clubes, setClubes, otrosClubes, setOtrosClubes, libros}) => {

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    const { user_id } = auth;

    const [crearClub, setCrearClub] = useState(false);
    const showCrearClub = () => {
        setCrearClub(!crearClub)
        setErrMsg('');
    };
    
    const [listaClubes, setListaClubes] = useState(clubes);
    const [listaOtrosClubes, setListaOtrosClubes] = useState(otrosClubes);
    const [busqueda, setBusqueda] = useState('');

    const [nuevoClub, setNuevoClub] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [libroSeleccionado, setLibroSeleccionado] = useState('');
    
    const [tusClubes, setTusClubes] = useState(listaClubes.filter(club => club.propietario === user_id));
    const [clubesSeguidos, setClubesSeguidos] = useState(listaClubes.filter(club => club.propietario !== user_id));

    useEffect(() => {
        setTusClubes(listaClubes.filter(club => club.propietario === user_id));
        setClubesSeguidos(listaClubes.filter(club => club.propietario !== user_id));
      }, [listaClubes]);

    useEffect(() => {
        setListaOtrosClubes(listaOtrosClubes);
      }, [listaOtrosClubes]);
    
    useEffect(() => {
        setListaClubes(clubes);
      }, [clubes]);

    const opcion_mis_clubs = 'Eliminar club';

    const opcion_otros_clubs = 'Unirse al club';

    const opcion_club_seguido= 'Dejar el club';

    const handleChangeBusqueda = (event) => {
        setBusqueda(event.target.value);
        filtrar(event.target.value);
    }

    const handleChangeNuevoClub = (event) => {
        setNuevoClub(event.target.value);
    }

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    } 

    const handleLibroChange = (event) => {
        setLibroSeleccionado(event.target.value);
    };

    const URL_CLUBES = '/club/lista';     /* ATENTO */

    async function fetchClubes(){
        await axios.get(URL_CLUBES, {withCredentials: true})
        .then(response=>{
            setClubes(response.data.listaClubes);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const URL_OTROS_CLUBES = '/club/all';     /* ATENTO */

    async function fetchOtrosClubes(){
        await axios.get(URL_OTROS_CLUBES, {withCredentials: true})
        .then(response=>{
            setOtrosClubes(response.data.listaClubes);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const handleClickSubmitClub = async () => {

        const URL_CONSULTA = '/clubes/create'; /* ATENTO */

        if(nuevoClub.length > 4 && nuevoClub.length < 30 ){
            try {
                const respuesta = await axios.post(URL_CONSULTA, 
                JSON.stringify({nombre: nuevoClub, audiolibroID, descripcion}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                );
                console.log(respuesta); /* Solo desarrollo */
                setNuevoClub('');
                setCrearClub(false);
                setErrMsg('');
                /*          IGUAL SERÍA BUENO QUE TE LLEVE DIRECTAMENTE A SU PÁGINA         */
                fetchClubes();
            } catch (err) {
                if (!err.response) {
                    setErrMsg('No hay respuesta del servidor');
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
            <>
                <div className='crear-club-container'>
                    <h4>Nombre del club:</h4>
                    <input className='nombre-nuevo-club'
                    placeholder='Cómo quiere llamar a su nuevo club'
                    value={nuevoClub}
                    onChange={handleChangeNuevoClub}/>
                </div>
                <div className='crear-club-container'>
                    <h4>Libro:</h4>
                    <select className="selector-libros" onChange={handleLibroChange} value={libroSeleccionado}>
                        <option value="">Sin libro</option>
                        {libros.map((libro) => (
                                <option key={libro.titulo} value={libro.titulo}>{libro.titulo}</option>
                        ))}
                        {/* Agrega más opciones de géneros según sea necesario */}
                    </select>
                </div>
                <div className='crear-club-container'>
                    <h4>Descripción del club:</h4>
                    <textarea className='descripcion-nuevo-club'
                    placeholder='Una breve descripción del club (opcional)'
                    value={descripcion}
                    onChange={handleChangeDescripcion}/>
                </div>
                <button className='submit-club-button' onClick={handleClickSubmitClub}> Crear club </button>
            </>
        ) : null}
        {errMsg && <div className="sign-error-message"><p>{errMsg}</p></div>}

        <div className='lista'>
            <h2>Tus clubes</h2>
            {tusClubes.map((club, i) => (
                <div key={i} className='club'>
                    <div className='contenido-club'>
                        <div className='nombre' onClick={() => handleClubClick(club.id)}>
                            <h1>{club.titulo}</h1>
                        </div>
                    </div>
                    <div className='boton-container'>
                        <DropdownButtonClubes 
                            className='boton-opciones' 
                            opcion={opcion_mis_clubs} 
                            club={club}
                            clubes={clubes}
                            setClubes={setClubes}
                            otrosClubes={otrosClubes}
                            setOtrosClubes={setOtrosClubes} />
                    </div>
                </div>
            ))}
            <h2>Clubes seguidos</h2>
            {clubesSeguidos.map((club, i) => (
                <div key={i} className='club'>
                    <div className='contenido-club'>
                        <div className='nombre' onClick={() => handleClubClick(club.id)}>
                            <h1>{club.titulo}</h1>
                        </div>
                    </div>
                    <div className='boton-container'>
                        <DropdownButtonClubes 
                            className='boton-opciones' 
                            opcion={opcion_club_seguido} 
                            club={club}
                            clubes={clubes}
                            setClubes={setClubes}
                            otrosClubes={otrosClubes}
                            setOtrosClubes={setOtrosClubes} />
                    </div>
                </div>
            ))}
            <h2>Otros clubes</h2>
            {listaOtrosClubes.map((club, i) => (
                <div key={i} className='club'>
                    <div className='contenido-club'>
                        <div className='nombre' onClick={() => handleClubClick(club.id)}>
                            <h1>{club.titulo}</h1>
                        </div>
                    </div> 
                    <div className='boton-container'>
                        <DropdownButtonClubes 
                            className='boton-opciones' 
                            opcion={opcion_otros_clubs} 
                            club={club}
                            clubes={clubes}
                            setClubes={setClubes}
                            otrosClubes={otrosClubes}
                            setOtrosClubes={setOtrosClubes}/>
                    </div>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default ListaClubes;