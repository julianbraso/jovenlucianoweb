import { useState } from "react";
import "../static/css/style.css";
import Background from "../background";
import ThreeDModel from "../threed";
import { Link } from "react-router-dom"
import * as THREE from 'three';
 
const Info = () => {
  return <div className="w-screen h-screen overflow-hidden overscroll-none">
    <Background />
    <div id="mainContainer" className="w-full h-full flex">
      <div className="w-full h-full absolute flex flex-col items-center">
        <div className="h-20 w-full flex items-center pl-[5%]">
          <Link to="/" className="h-16 w-[270px]">
            <ThreeDModel lightPos={new THREE.Vector3(0, 5, 3)} fov={1} camZ={0.24} fixed={true} filePath="assets/Jovenapaisado.glb" /></Link>
        </div>
        <div className={"w-[90%] pt-3 pb-20 flex items-center md:items-start justify-center flex-col md:flex-row h-fit gap-5 md:gap-10"}>
          <div className="h-fit w-[80%] md:w-fit flex flex-col gap-5">
            <img src="aboutme.jpg" className="max-h-[45rem] max-w-[35rem] w-full" ></img>
          </div>
          <div className="text-[#00ff00] text-start h-fit w-[80%] md:w-[30%] flex flex-col gap-5">
            <h1 className="font-light text-lg">Hello! I’m Joven Luciano, a technical artist, painter, and creative director. With a passion for exploring the intersection of art and technology, I have dedicated my career to research and innovation. My work delves into how artistic expression can be enhanced and transformed through technological advancements, creating immersive and groundbreaking experiences.
              Inspired by my lifelong love for movies and video games, I have had the privilege of working on several AAA movies and shows. My passion lies in breaking the boundaries of traditional 3D and storytelling, constantly pushing the limits of what is possible. Whether I’m painting a canvas, developing digital art, or directing creative projects, I aim to inspire others through my unique vision and innovative approach.</h1>
            <h2 className="text-lg font-bold">Contact</h2>
            <a href="mailto:contact@jovenluciano.com" className="font-light text-lg">contact@jovenluciano.com</a>
          </div>
        </div>
        <div className="text-white h-full w-full flex items-center justify-center bg-[#7700ff]">
          <div className="w-[90%] h-14 flex items-center justify-between">
            {/* <img className="h-8" src={footer}></img> */}
            <a className="text-[#00ff00] hover:text-green-300 w-fit" href="mailto:contact@jovenluciano.com">contact@jovenluciano.com</a>
            <div className="w-fit text-[#00ff00] hover:text-green-300 pr-1">
              <a href="https://instagram.com/jovenluciano">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Info;