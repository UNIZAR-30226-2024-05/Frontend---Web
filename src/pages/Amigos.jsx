import React, { useState, useEffect, useContext } from 'react';
import './Amigos.css';
import AuthContext from '../context/AuthProvider.jsx';
import ListaAmigos from '../components/ListaAmigos/ListaAmigos.jsx';
import ListaPeticiones from '../components/ListaPeticiones/ListaPeticiones.jsx';
import axios from '../api/axios';

const Amigos = () => {
    const URL_CONSULTA = '/amistad/lista';
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const [peticiones, setPeticiones] = useState([]);
    const [enviadas, setEnviadas] = useState([]);
    const [recibidas, setRecibidas] = useState([]);
    const [aceptadas, setAceptadas] = useState([]);
    const [rechazadas, setRechazadas] = useState([]);

    const { socket } = useContext(AuthContext);

    useEffect( () => {
      async function fetchUsuarios(){
          await axios.get(URL_CONSULTA, { withCredentials: true })
          .then(response=>{
              setUsuarios(response.data.users);
              setLoading(false);
              console.log(response.data);
          }).catch(error=>{
              console.log(error);
              setLoading(false);
          })
      }

      async function fetchPeticiones() {
        try {
            const response = await axios.get('/amistad/peticiones', { withCredentials: true });
            const data = response.data;
    
            setPeticiones(data.peticiones || []);
            setEnviadas(data.enviadas || []);
            setRecibidas(data.recibidas || []);
            setAceptadas(data.aceptadas || []);
            setRechazadas(data.rechazadas || []);

        } catch (error) {
            console.error("Error fetching peticiones:", error);
        }
    }
      fetchUsuarios();
      fetchPeticiones();
    }, []);

    // Socket event listeners
    useEffect(() => {
      if (socket) {
        const handlePeticionReceived = (data) => {
          console.log('Evento recibido:', data);
          console.log(data.user_id);
          setUsuarios((prevUsuarios) => {
              console.log('Usuarios antes de la actualización:', prevUsuarios);
              const updatedUsuarios = prevUsuarios.map((user) => {
                  if (user.id === data.user_id) {
                      return { ...user, estado: 2 };
                  }
                  return user;
              });
              console.log('Usuarios después de la actualización:', updatedUsuarios);
              return updatedUsuarios;
          });
      };

      const handlePeticionAccepted = (data) => {
          console.log('Evento recibido:', data);
          console.log(data.user_id);
          setUsuarios((prevUsuarios) => {
              console.log('Usuarios antes de la actualización:', prevUsuarios);
              const updatedUsuarios = prevUsuarios.map((user) => {  
                  if (user.id === data.user_id) {
                      return { ...user, estado: 0 };
                  }
                  return user;
              });
              console.log('Usuarios después de la actualización:', updatedUsuarios);
              return updatedUsuarios;
          });
      };

      const handlePeticionRejected = (data) => {
          console.log('Evento recibido:', data);
          console.log(data.user_id);
          setUsuarios((prevUsuarios) => {
              console.log('Usuarios antes de la actualización:', prevUsuarios);
              const updatedUsuarios = prevUsuarios.map((user) => {
                  if (user.id === data.user_id) {
                      return { ...user, estado: 1 };
                  }
                  return user;
              });
              console.log('Usuarios después de la actualización:', updatedUsuarios);
              return updatedUsuarios;
          });
      };

          socket.on('peticionReceived', handlePeticionReceived);
          socket.on('peticionAccepted', handlePeticionAccepted);
          socket.on('peticionRejected', handlePeticionRejected);

          // Limpia la escucha del socket cuando el componente se desmonta
          return () => {
              socket.off('peticionReceived', handlePeticionReceived);
              socket.off('peticionAccepted', handlePeticionAccepted);
              socket.off('peticionRejected', handlePeticionRejected);
          };
      }
  }, [socket]);

    const [tipos, setTipos] = useState([
        'recibidas',
        'enviadas',
        'aceptadas',
        'rechazadas'
    ]);


    return (
        <div className='amigos'>
            <div className='amigos-lista'>
              <div className='amigos-lista-container'>
              {loading ? (
                <div className='loading-container'>
                  <p>Loading...</p>
                </div>
                ) : (
                <>
                  <h1 className='amigos-titulo'>Tus amigos</h1>
                  <ListaAmigos className='lista' usuarios={usuarios} setUsuarios={setUsuarios}></ListaAmigos>
                </>)}
              </div>
            </div>
            <div className='amigos-peticiones'>
              <div className='amigos-lista-container'>
                <h1 className='amigos-titulo'>Historial de peticiones</h1>
                <ListaPeticiones className='lista' peticiones={peticiones} enviadas={enviadas} recibidas={recibidas} aceptadas={aceptadas} rechazadas={rechazadas}></ListaPeticiones>
              </div> 
            </div>
        </div>
    )
}

export default Amigos