import { Gallery, Image } from "react-grid-gallery";
import { useEffect, useState } from "react";
import "../static/css/style.css";
import { Link } from "react-router-dom";
import ThreeDModel from "../threed";
import Background from "../background";
import { ThumbnailImageProps } from "react-grid-gallery";
import * as THREE from 'three';
import SelectedComponent from "../components/SelectedComponent";
import { ReactComponent as PlayIcon } from "../PlayIcon.svg"
import { get_FetchFile } from "../utils/spacesUtils";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export interface Video extends Image {
  videoUrl?: string,
  description?: string,
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<ThumbnailImageProps | null>(null);

  const dataURL = "https://jovenlucianoweb.nyc3.digitaloceanspaces.com/videos/videos.json";

  useEffect(() => {
    const response = get_FetchFile(dataURL);
    response.then((r) => {
      if (r) setVideos(r);
    })
  }, [])

  const ImageComponent = (props: ThumbnailImageProps) => {
    const { src, alt, style, title } = props.imageProps;
    return <div className="relative" onClick={() => setSelectedVideo(props)} >
      <img alt={alt} src={src} title={title || ""} style={style} />
      <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center text-center"><div className="h-[3.5rem] w-[3.5rem] text-[#00ff00] flex justify-center pl-2 items-center"><PlayIcon width={36}></PlayIcon></div></div>
    </div>;
  };
  //useScript("background.js");
  //useScript("logo_only.js", {removeOnUnmount:true});
  return <div className="w-screen h-screen overflow-hidden overscroll-none">
    <Background />
    <div id="mainContainer" className="w-full absolute h-full">
      <Header showBackBtn={selectedVideo != null} backCallback={()=> setSelectedVideo(null)}/>
      <div id="body" className="[overflow-anchor:none]">
        <div id="" className="w-[90%] pb-20 flex-grow">
          {!selectedVideo ? <Gallery images={videos}
            thumbnailImageComponent={ImageComponent}
            enableImageSelection={false} /> :
            <SelectedComponent isVideo={true} data={selectedVideo} backCallback={() => setSelectedVideo(null)} />}
          {(videos.length < 1) && <div className="text-[#00ff00] w-full h-[50vh] flex justify-center items-center text-center text-lg lg:text-xl font-bold">No data to show... Try again later.</div>}
        </div>
        <Footer />
      </div>
    </div>
  </div>
};

export default Videos;