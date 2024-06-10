import { useScript } from "usehooks-ts";
import { Gallery } from "react-grid-gallery";
import { images as IMAGES } from "../images";
import { useState } from "react";
import "../static/css/style.css";
import { Link } from "react-router-dom";
import ThreeDModel from "../threed";
import Background from "../background";
import { ThumbnailImageProps } from "react-grid-gallery";
import { ReactComponent as InstagramIcon } from '../static/assets/instagram.svg';

const ImageComponent = (props: ThumbnailImageProps) => {
  const { src, alt, style, title } = props.imageProps;
  return <img alt={alt} src={src} title={title || ""} style={style} onClick={()=>alert(props.item.caption)} />;
};



const Paintings = () => {
  const [images, setImages] = useState(IMAGES);
  //useScript("background.js");
  //useScript("logo_only.js", {removeOnUnmount:true});
  return <div className="w-screen h-screen overflow-x-hidden">
    <Background/>
    <div id="mainContainer" className="w-full h-fit flex justify-center">
      <div className="h-32 w-full flex items-center pl-5 mb-16">
        <Link to="/" className="h-28 w-28"><ThreeDModel fixed={true}/></Link>
      </div>
      <div className="w-[70%] h-fit">
        <Gallery images={images} 
        thumbnailImageComponent={ImageComponent}
        enableImageSelection={false}
        />
      </div>
      <div className="text-white h-20 flex items-end">
        <p className="pb-3">Joven Luciano 2024 Copyright</p>
        <div className="w-5 h-5 mb-4 text-white ml-20">
          <a href="https://instagram.com/jovenluciano"><InstagramIcon/></a>
          </div>
        
      </div>
    </div>
  </div>
};

export default Paintings;