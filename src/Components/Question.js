import React from "react";
import { Link } from 'react-router-dom';
import '../style.css';
import playButton from '../Assets/play-button.svg';

function Question({ questionNumber }) {
  const href = `/grabacion${questionNumber}`;

  return (
    <div>
      <Link to={href}><img src={playButton} alt="" /></Link>
      <button onClick={() => window.location.href = href}>Cual fue tu video juego favorito durante tu infancia?</button>
    </div>
  );
}

export default Question;
