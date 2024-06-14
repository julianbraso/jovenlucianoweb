import { Link } from "react-router-dom"
import ThreeDModel from "../threed"
import {Vector3} from "three"

export const Header = () => {
    return <div className="h-20 w-full flex items-center pl-[5%]">
        <Link to="/" className="h-16 w-[270px]">
            <ThreeDModel lightPos={new Vector3(0, 5, 3)} fov={1} camZ={0.24} fixed={true} filePath="assets/Jovenapaisado.glb" />
        </Link>
    </div>
}