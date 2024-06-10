import './App.css';
import { useScript } from 'usehooks-ts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./static/css/style.css";
import Home from './pages/Home';
import Paintings from './pages/Paintings';

function App() {
  useScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
  useScript("https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js");

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/paintings' element={<Paintings />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
