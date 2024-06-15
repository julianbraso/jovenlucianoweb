import "../css/style.css";
import Background from "../background";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Info = () => {
  const aboutMe = "Hello! I’m Joven Luciano, a technical artist, painter, electronic music producer, and creative director. With a passion for exploring the intersection of art and technology, I have dedicated my career to research and innovation. I started my creative and artistic journey by designing the visuals for my shows and playing at several festivals as an electronic music producer.\n\nMy work delves into how artistic expression can be enhanced and transformed through technological advancements, creating immersive and groundbreaking experiences. Inspired by my lifelong love for movies and video games, I have had the privilege of working on several AAA movies and shows.\n\nMy passion lies in breaking the boundaries of traditional 3D and storytelling, constantly pushing the limits of what is possible. Whether I’m painting a canvas, developing digital art, or directing creative projects, I aim to inspire others through my unique vision and innovative approach.";
  return <div className="w-screen h-screen overflow-hidden overscroll-none">
    <Background />
    <div id="mainContainer" className="w-full absolute h-full">
      <Header backCallback={()=>window.location.replace("/")}/>
      <div id="body" className="flex-grow">
        <div className={"w-[90%] [overflow-anchor:none] pt-3 pb-20 flex flex-grow items-center md:items-start justify-center flex-col md:flex-row h-fit gap-5 md:gap-10"}>
          <div className="h-fit w-[80%] md:w-fit flex flex-col gap-5">
            <img src="https://jovenlucianoweb.nyc3.cdn.digitaloceanspaces.com/images/Info/Info.jpeg" className="max-h-[45rem] max-w-[35rem] w-full" ></img>
          </div>
          <div className="text-[#00ff00] text-start h-fit w-[80%] md:w-[30%] flex flex-col">
            <p className="text-lg font-bold">About Me</p>
            <p className="font-light text-lg whitespace-pre-line">{aboutMe}</p>
            <br />
            <p className="text-lg font-bold">Contact and business inquiries</p>
            <a href="mailto:contact@jovenluciano.com" className="font-light text-lg">contact@jovenluciano.com</a>
            <br />
            <p className="text-lg font-bold">Festivals</p>
            <p className="text-start">
              - “Don’t let them fill your head” <br /> Short film selected for London Experimental Film Festival 2024
            </p>
            <br />
            <p className="text-start">
              - “Don’t let them fill your head” <br /> Semi-Finalist Experimental Category - Animate Australia 2024
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
};

export default Info;