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
import { ReactComponent as InstagramIcon } from '../static/assets/instagram.svg';

const ImageComponent = (props: ThumbnailImageProps) => {
  const { src, alt, style, title } = props.imageProps;
  return <img alt={alt} src={src} title={title || ""} style={style} onClick={() => alert(props.item.caption)} />;
};



const Paintings = () => {
  const [images, setImages] = useState(IMAGES);
  //useScript("background.js");
  //useScript("logo_only.js", {removeOnUnmount:true});
  return <div className="w-screen h-screen overflow-x-hidden">
    <Background />
    <div id="mainContainer" className="w-full h-fit flex justify-center">
      <div className="h-16 w-full flex items-center pl-[4%]">
        <Link to="/" className="h-16 w-60">
          <ThreeDModel camZ={0.30} fixed={true} filePath="assets/Jovenapaisado.glb" /></Link>
      </div>
      <div className="w-[90%] h-fit pb-20">
        <Gallery images={images}
          thumbnailImageComponent={ImageComponent}
          enableImageSelection={false}
        />
      </div>
      <div className="text-white h-12 w-full flex items-center justify-center bg-purple-500">
        <div className="w-[90%] flex items-center justify-between">
          <img className="h-8" src={footer}></img>
          <div className="w-5 h-5 mt-auto mb-auto pb-4 text-white pr-1">
            <a href="https://instagram.com/jovenluciano"><InstagramIcon /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Paintings;