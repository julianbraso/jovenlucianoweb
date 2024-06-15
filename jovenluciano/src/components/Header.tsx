import { Link } from "react-router-dom"
import ThreeDModel from "../threed"
import {Vector3} from "three"

interface HeaderProps {
    backCallback: () => void;
    showBackBtn?: boolean;
}

export const Header = ({backCallback, showBackBtn = false }:HeaderProps) => {
    return <div className="h-20 w-full flex items-center pl-[5%] fixed top-0 z-50 bg-[#7700ff] shadow-lg">
        <Link to="/" className="h-16 w-[270px]">
            <ThreeDModel lightPos={new Vector3(0, 5, 3)} fov={1} camZ={0.24} fixed={true} filePath="assets/Jovenapaisado.glb" />
        </Link>
        {showBackBtn&&<div onClick={backCallback} className="cursor-pointer ml-auto pr-10 text-[#00ff00] underline font-bold">BACK</div>}
    </div>
}