import { useScript } from "usehooks-ts";
import ThreeDModel from "../threed";
import Background from "../background";
import { Link } from "react-router-dom";

const Home = () => {
  return <div className="w-screen h-screen overflow-x-hidden touch-none">
    <Background/>
    <div id="mainContainer" className="h-full w-full fixed touch-none">
      <div className="w-[90%] md:w-[50rem] h-[30%] md:h-[40rem] touch-none">
        <ThreeDModel camZ={0.84} fixed={false} filePath="assets/JOVEN_LUCIANO_Junto2.glb"/>
      </div>
      <div className="section-buttons">
        <Link to="/videos" className="button">Videos</Link>
        <Link to="/paintings" className="button">Paintings</Link>
        <Link to="/illustrations" className="button">Illustrations</Link>
        <Link to="/sketchbooks" className="button">Sketchbooks</Link>
        <Link to="/info" className="button">Info</Link>
        <Link to="https://jovenluciano.bigcartel.com/" className="button">Shop</Link>
      </div>
    </div>
  </div>

};

export default Home;