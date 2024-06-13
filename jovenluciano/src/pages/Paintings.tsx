import { useScript } from "usehooks-ts";
import { Gallery } from "react-grid-gallery";
import { images as IMAGES } from "../images";
import { useState } from "react";
import "../static/css/style.css";
import { Link } from "react-router-dom";
import ThreeDModel from "../threed";
import Background from "../background";
import { ThumbnailImageProps } from "react-grid-gallery";
import footer from "../footer_logo.png"
import * as THREE from 'three';
import { ReactComponent as InstagramIcon } from '../static/assets/instagram.svg';
import SelectedComponent from "../components/SelectedComponent";

const Paintings = () => {
  const [images, setImages] = useState(IMAGES);
  const [selectedImage, setSelectedImage] = useState<ThumbnailImageProps | null>(null);

  const ImageComponent = (props: ThumbnailImageProps) => {
    const { src, alt, style, title } = props.imageProps;
    return <img alt={alt} src={src} title={title || ""} style={style} onClick={() => setSelectedImage(props)} />;
  };
  //useScript("background.js");
  //useScript("logo_only.js", {removeOnUnmount:true});
  return <div className="w-screen h-screen overflow-x-hidden overscroll-none">
    <Background />
    <div id="mainContainer" className="w-full h-full flex">
      <div className="w-full h-full absolute flex flex-col items-center">
        <div className="h-20 w-full flex items-center pl-[5%]">
          <Link to="/" className="h-16 w-[270px]">
            <ThreeDModel lightPos={new THREE.Vector3(0, 5, 3)} fov={1} camZ={0.24} fixed={true} filePath="assets/Jovenapaisado.glb" /></Link>
        </div>
        <div id="" className="w-[90%] pb-20">
        {!selectedImage ? <Gallery images={images}
            thumbnailImageComponent={ImageComponent}
            enableImageSelection={false} /> :
            <SelectedComponent image={selectedImage} backCallback={() => setSelectedImage(null)} />}
        </div>
        <div className="text-white h-fit w-full flex items-center justify-center bg-[#7700ff]">
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

export default Paintings;