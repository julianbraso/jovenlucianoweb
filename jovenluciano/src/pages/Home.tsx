import { useScript } from "usehooks-ts";
import ThreeDModel from "../threed";
import Background from "../background";
import { Link } from "react-router-dom";
import { Image } from "react-grid-gallery";

import "../css/style.css";

const Home = () => {
  return <div className="w-screen h-screen overflow-x-hidden touch-none">
    <Background/>
    <div id="mainContainer" className="h-full w-full flex flex-col fixed touch-none">
      <div className="w-[90%] md:w-[50rem] h-[30%] md:h-[30rem] touch-none">
        <ThreeDModel camZ={0.84} fixed={false} filePath="assets/JOVEN_LUCIANO_Junto2.glb"/>
      </div>
      <div className="section-buttons">
        <Link to="/videos" className="menubutton">Videos</Link>
        <Link to="/paintings" className="menubutton">Paintings</Link>
        <Link to="/illustrations" className="menubutton">Illustrations</Link>
        <Link to="/sketchbooks" className="menubutton">Sketchbooks</Link>
        <Link to="/info" className="menubutton">Info</Link>
        <Link to="https://jovenluciano.bigcartel.com/" className="menubutton">Shop</Link>
      </div>
    </div>
  </div>

};

export default Home;