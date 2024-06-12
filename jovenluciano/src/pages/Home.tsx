import { useScript } from "usehooks-ts";
import ThreeDModel from "../threed";
import Background from "../background";
import { Link } from "react-router-dom";

const Home = () => {
  return <div className="w-screen h-screen overflow-x-hidden">
    <Background/>
    <div id="mainContainer">
      <div className="w-screen h-screen">
        <ThreeDModel fixed={false} filePath="assets/JOVEN_LUCIANO_Junto2.glb"/>
      </div>
      <div className="section-buttons">
        <Link to="/videos" className="button">Videos</Link>
        <Link to="/paintings" className="button">Paintings</Link>
        <Link to="/illustrations" className="button">Illustrations</Link>
        <Link to="{{ url_for('sketchbooks') }}" className="button">Sketchbooks</Link>
        <Link to="/info" className="button">Info</Link>
        <Link to="{{ url_for('shop') }}" className="button">Shop</Link>
      </div>
    </div>
  </div>

};

export default Home;