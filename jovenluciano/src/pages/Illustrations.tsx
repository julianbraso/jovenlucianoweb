import { useScript } from "usehooks-ts";
import { Gallery } from "react-grid-gallery";
import { images as IMAGES } from "../images";
import { useEffect, useState } from "react";
import "../css/style.css";
import { Link } from "react-router-dom";
import ThreeDModel from "../threed";
import Background from "../background";
import { ThumbnailImageProps } from "react-grid-gallery";
import footer from "../footer_logo.png"
import * as THREE from 'three';
import { ReactComponent as InstagramIcon } from '../static/assets/instagram.svg';
import SelectedComponent from "../components/SelectedComponent";
import { getFileFromSpace, get_FetchFile } from "../utils/spacesUtils";
import { Image } from "react-grid-gallery";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Illustrations = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<ThumbnailImageProps | null>(null);

  const dataURL = "https://jovenlucianoweb.nyc3.digitaloceanspaces.com/images/illustrations/illustrations.json";

  useEffect(() => {
    const response = get_FetchFile(dataURL);
    response.then((r) => {
      if (r) setImages(r);
    })
  }, [])

  const ImageComponent = (props: ThumbnailImageProps) => {
    const { src, alt, style, title } = props.imageProps;
    return <img alt={alt} src={src} title={title || ""} style={style} onClick={() => setSelectedImage(props)} />;
  };
  //useScript("background.js");
  //useScript("logo_only.js", {removeOnUnmount:true});
  window.scrollTo({ top: 0, behavior: "smooth" })

  return <div className="w-screen h-screen overflow-hidden overscroll-none">
    <Background />
    <div id="mainContainer" className="w-full absolute h-full">
      <Header showBackBtn={selectedImage != null} backCallback={()=>setSelectedImage(null)}/>
      <div id="body" className="[overflow-anchor:none]">
        <div id="" className="w-[90%] pb-20 flex-grow">
          {!selectedImage ? <Gallery images={images}
            thumbnailImageComponent={ImageComponent}
            enableImageSelection={false} /> :
            <SelectedComponent data={selectedImage} backCallback={() => setSelectedImage(null)} />}
          {(images.length < 1) && <div className="text-[#00ff00] w-full h-[50vh] flex justify-center items-center text-center text-lg lg:text-xl font-bold">No data to show... Try again later.</div>}
        </div>
        <Footer />
      </div>
    </div>
  </div>
};

export default Illustrations;