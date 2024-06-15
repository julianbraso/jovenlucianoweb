import './App.css';
import { useScript } from 'usehooks-ts';
import { Routes, Route } from "react-router-dom";
import "./css/style.css";
import Home from './pages/Home';
import Paintings from './pages/Paintings';
import Info from './pages/Info';
import Videos from './pages/Videos';
import Illustrations from './pages/Illustrations';
import Sketchbooks from './pages/Sketchbooks';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path='/paintings' element={<Paintings />} />
        <Route path='/info' element={<Info />} />
        <Route path='/videos' element={<Videos />} />
        <Route path='/illustrations' element={<Illustrations />} />
        <Route path='/sketchbooks' element={<Sketchbooks />} />
      </Routes>
    </div>
  );
}

export default App;
