import './App.css';
import { useScript } from 'usehooks-ts';
import { Routes, Route } from "react-router-dom";
import "./static/css/style.css";
import Home from './pages/Home';
import Paintings from './pages/Paintings';
import Info from './pages/Info';
import Videos from './pages/Videos';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path='/paintings' element={<Paintings />} />
        <Route path='/info' element={<Info />} />
        <Route path='/videos' element={<Videos />} />
      </Routes>
    </div>
  );
}

export default App;
