interface VideoProps {
  src?: string;
  thumbnail?: string;
}

export const VideoJSComponent = ({ src, thumbnail }: VideoProps) => {
  return <video
    id="my-player"
    className="video-js vjs-fluid"
    controls disablePictureInPicture controlsList="nodownload noplaybackrate"
    preload="auto"
    autoPlay
    poster={thumbnail}
    data-setup
    >
    <source src={src} type="video/mp4"></source>
    <p className="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">
        supports HTML5 video
      </a>
    </p>
  </video>
}