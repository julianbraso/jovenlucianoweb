import { ThumbnailImageProps } from "react-grid-gallery";
import { VideoJSComponent } from "./VideoJSComponent";
import { Video } from "../pages/Videos";
import "../static/css/style.css";

interface Props {
    data: ThumbnailImageProps;
    backCallback: () => void;
    isVideo?: boolean;
}

const SelectedComponent: React.FC<Props> = ({ data, backCallback, isVideo = false }) => {
    const { src, alt, style, title } = data.imageProps;

    const videoData = data.item as Video;

    return <div className="w-full">
        <div className={"w-full pt-3 flex flex-grow items-center xl:items-start xl:justify-start flex-col xl:flex-row h-full gap-5 "}>
            <div className="h-fit w-fit">
                {!isVideo ?
                    <img className="max-h-[35rem] max-w-[45rem] w-full" src={src} alt={alt}></img>
                    :
                    <div className="max-h-[100%] overflow-hidden">
                        <div className="h-[100%] w-full">
                            <VideoJSComponent src={videoData.videoUrl} />
                        </div>
                    </div>
                }
            </div>
            <div className="text-white text-start h-full flex flex-col gap-5">
                <h1>{title}</h1>
                <h2>{data.item.alt}</h2>
            </div>
        </div>
    </div>;
}

export default SelectedComponent;