import { PiSignOutBold } from "react-icons/pi";
import { Button } from "../ui/Button";
import { useRecoilState } from "recoil";
import { logoutAtom } from "../../storeAtoms/Atoms";
import { useNavigate } from "react-router-dom";


//logout modal
export const LogoutModal = () => {
    //logout atom to change the state
    const [logoutOpen, setLogOut] = useRecoilState(logoutAtom);
    const navigate = useNavigate()
    function handleClose() {
        setLogOut(!logoutOpen)
    }
    if (!logoutOpen) return null;

    function handleLogOut() {
        localStorage.clear();
        navigate("/")
        setLogOut(!logoutOpen)
    }
    return (<div className="w-screen h-screen pb-20 bg-black/70 fixed top-0 left-0 flex justify-center items-center" onClick={handleClose}>
        <div className="flex flex-col items-center bg-lightPink p-6 rounded-md space-y-4" onClick={(e) => { e.stopPropagation() }}>
            <div className="flex border rounded-full h-fit w-fit p-4 text-2xl"><PiSignOutBold /></div>
            <h1 className="font-clashdisplay font-semibold text-2xl">Sign Out</h1>
            <h5 className="font-clashdisplay">So you are leaving your Almirah ?</h5>
            <div className="flex">
                <Button variant="basic" size="lg" title="Cancel" onClick={handleClose} />
                <Button variant="danger" size="lg" title="Sign Out" onClick={handleLogOut} />
            </div>
        </div>
    </div>)
}