import React, { useState, useEffect, useContext } from 'react';
import './Club.css';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import Footer from '../components/Footer/Footer';
import MensajesClub from '../components/MensajesClub/MensajesClub';

const Club = () => {

    const location = useLocation();
    const id_club = new URLSearchParams(location.search).get('id');

    const [club, setClub] = useState([]);
    const [loading, setLoading] = useState(true);

    const { socket } = useContext(AuthContext);

    useEffect( () => {
        const URL_CLUB = `/club/datos/${id_club}`

      async function fetchLibros(){
          await axios.get(URL_CLUB, {withCredentials: true})
          .then(response=>{
              setClub(response.data.club);
              setLoading(false);
              console.log(response.data.club);
          }).catch(error=>{
              console.log(error);
              setLoading(false);
          })
      }
      fetchLibros();
    }, []);

    useEffect(() => {
      if (socket) {
          socket.on('message', (data) => {
              // Maneja el evento recibido
              console.log('Evento recibido:', data);
              if (data.club_id === club.id) {
                  setClub(prevClub => ({ ...prevClub, messages: [...prevClub.messages, data] }));
              }
          });
      }
  
      // Limpia la escucha del socket cuando el componente se desmonta
      return () => {
          if (socket) {
              socket.off('message');
          }
      };
  }, [club, socket]);


  return (
    <div className='club'>
      <div className='club-container'>
        <h1 className='title'>{club?.nombre}</h1>
      {loading ? (
          <div className='loading-container'>
            <p>Loading...</p>
          </div>
          ) : (
            <MensajesClub className='lista' club={club} setClub={setClub} />
          )}
      </div>
      <div className='club-footer'>
        <Footer className='footer' />
      </div>
    </div>
  );
}

export default Club