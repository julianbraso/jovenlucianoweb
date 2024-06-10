import { useScript } from "usehooks-ts";
import ThreeDModel from "../threed";
import Background from "../background";
import { Link } from "react-router-dom";

const Home = () => {
  //useScript("background.js");

  return <div className="w-screen h-screen overflow-x-hidden">
    <Background/>
    <div id="mainContainer">
      <div className="w-screen h-screen">
        <ThreeDModel fixed={false} filePath="assets/JOVEN_LUCIANO_Junto2.glb"/>
      </div>
      <div className="section-buttons">
        <a href="{{ url_for('videos') }}" className="button">Videos</a>
        <Link to="/paintings" className="button">Paintings</Link>
        <a href="{{ url_for('illustrations') }}" className="button">Illustrations</a>
        <a href="{{ url_for('sketchbooks') }}" className="button">Sketchbooks</a>
        <a href="{{ url_for('info') }}" className="button">Info</a>
        <a href="{{ url_for('shop') }}" className="button">Shop</a>
      </div>
    </div>
  </div>

};

export default Home;