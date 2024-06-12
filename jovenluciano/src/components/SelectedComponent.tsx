import { ThumbnailImageProps } from "react-grid-gallery";

interface Props {
    image: ThumbnailImageProps;
    backCallback: () => void;
}

const SelectedComponent: React.FC<Props> = ({ image, backCallback }) => {
    const { src, alt, style, title } = image.imageProps;
    return <div className={"w-full  pt-3 flex items-center sm:items-start sm:justify-start flex-col md:flex-row h-full md:h-[calc(100vh-6rem-5rem)] gap-5 "}>
        <div className="h-fit w-fit ">
            <img className="max-h-[35rem] max-w-[45rem] w-full" src={src} alt={alt}></img>
        </div>
        <div className="text-white text-start h-full flex flex-col gap-5">
            <h1>{title}</h1>
            <h2>{image.item.alt}</h2>
        </div>
    </div>;
}

export default SelectedComponent;