import React, {useEffect} from 'react';
import '../style.css';
import arrow from '../Assets/flecha-izquierda.png';
import playButton from '../Assets/play-button.svg';
import stopButton from '../Assets/stop-button.svg';
import restartButton from '../Assets/restart-button.svg';
import recording from '../Assets/recording.gif';
import { Link } from 'react-router-dom';

function Grabacion() {
    useEffect(() => {
      const videoPreview = document.getElementById('preview');
      const startButton = document.getElementById('start');
      const stopButton = document.getElementById('stop');
      const restartButton = document.getElementById('restart');
      const timer = document.getElementById('timer');
      const div = document.getElementById('contador');
  
      let mediaRecorder;
      let recordedChunks = [];
      let timeElapsed = 0;
  
      startButton.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => {
            videoPreview.srcObject = stream;
            videoPreview.play();
            videoPreview.muted=true
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            startButton.disabled = true;
            startButton.style.display='none';
            stopButton.disabled = false;
            stopButton.style.display='block';
            div.style.visibility='visible';
            recordedChunks = [];
            timeElapsed = 0;
            timer.textContent = '0:00';
            mediaRecorder.addEventListener('dataavailable', event => {
              recordedChunks.push(event.data);
            });
            
            mediaRecorder.addEventListener('stop', () => {
              const blob = new Blob(recordedChunks, { type: 'video/mp4' });
              const url = URL.createObjectURL(blob);
              const videoDownloadLink = document.createElement('a');
              videoDownloadLink.href = url;
              videoDownloadLink.download = 'question.mp4';
              document.body.appendChild(videoDownloadLink);
              videoDownloadLink.click();
              videoDownloadLink.remove();
              startButton.disabled = false;
              stopButton.disabled = true;
              recordedChunks = [];
              videoPreview.srcObject = null;
              stopButton.style.display = 'none';
              restartButton.style.display = 'block';
              mediaRecorder = null;
              clearInterval(timerInterval);
              
            });
            const timerInterval = setInterval(() => {
              timeElapsed += 1;
              const minutes = Math.floor(timeElapsed / 60);
              const seconds = timeElapsed % 60;
              timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
      
            setTimeout(() => {
              mediaRecorder.stop();
            }, 120000); // 2 minutos
          })
          .catch(error => console.error(error));
      });
      
      stopButton.addEventListener('click', () => {
        mediaRecorder.stop();
      });
      
      restartButton.addEventListener('click',()=>{
        startButton.disabled = false;
        stopButton.disabled = true
        restartButton.style.display = 'none';
        startButton.style.display='block';
        timer.textContent = '0:00';
      });
      
    }, []);


  return (
    <>
      <Link to="/" ><img src={arrow} alt="return_index" id="flecha" /></Link>
      <Link to="/" className='volver'>Volver</Link>
      <div className="grabacion">
        <video id="preview" width="320" height="240"></video>
        <button id="start" style={{ backgroundColor: 'transparent' }}><img src={playButton} alt="" /></button>
        <button id="stop" disabled style={{ backgroundColor: 'transparent', display: 'none' }}><img src={stopButton} alt="" /></button>
        <button id="restart" style={{ backgroundColor: 'transparent', display: 'none' }}><img src={restartButton} alt="" /></button>
        <p className="contador" style={{ visibility: 'hidden' }} id="contador"><span id="timer">0:00</span> / 2:00 <img src={recording} alt="" /></p>
        <div>
          <p>Cual fue tu video juego favorito <br /> durante tu infancia?</p> 
        </div>
      </div>
      <div className="nav-buttons">
        <Link to="/grabacion3" >Atrás</Link>
        <Link to="/" style={{ marginLeft: '590px' }}>Siguiente</Link>
      </div>
    </>
  );
}

export default Grabacion;