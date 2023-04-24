import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Grabacion1 from './Components/Grabacion1';
import Grabacion2 from './Components/Grabacion2';
import Grabacion3 from './Components/Grabacion3';
import Grabacion4 from './Components/Grabacion4';
import Question from './Components/Question';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <h1>Video Cuestionario</h1>
            <div className="questions" id="bloque">
              <Question questionNumber={1} />
              <Question questionNumber={2} />
              <Question questionNumber={3} />
              <Question questionNumber={4} />
            </div>
          </>
        } />
        <Route path="/grabacion1" element={<Grabacion1 />} />
        <Route path="/grabacion2" element={<Grabacion2 />} />
        <Route path="/grabacion3" element={<Grabacion3 />} />
        <Route path="/grabacion4" element={<Grabacion4 />} />
      </Routes>
    </Router>
  );
}

export default App;
