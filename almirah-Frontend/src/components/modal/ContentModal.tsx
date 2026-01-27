
import { RxCross2 } from "react-icons/rx";
import { InputBox } from "../ui/inputBox";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form"
import axios from "axios";
import { contentAtom, type contentType } from "../../storeAtoms/Atoms";
import { useSetRecoilState } from "recoil";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
type propsType = {
    modal: boolean,
    toggleModal: () => void
}

//content modal to add items 
export const ContentModal = ({ modal, toggleModal }: propsType) => {
    const setContents = useSetRecoilState(contentAtom);
    //react-hook-form
    const { register, handleSubmit, reset } = useForm<contentType>();
    async function addContent({ title, link }: contentType) {
        //sending request to the backend
        const response = await axios.post(`${BACKEND_URL}/api/v1/content`, { title, link }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        //getting the response and adding it to the contents
        const newItem = response.data.contents
        setContents((prev: contentType[]) => [...prev, newItem])
        toggleModal();
        reset()
    }

    return <>
        {modal ?
            (<div onClick={toggleModal} className="w-screen h-screen pb-20 bg-black/70 fixed top-0 left-0 flex justify-center items-center">
                <div className="bg-lightPink p-6 rounded-md space-y-6" onClick={(e) => { e.stopPropagation() }}>
                    <div className="flex justify-between">
                        <h2 className="p-1 font-clashdisplay font-semibold text-xl">Add Content</h2>
                        <RxCross2 onClick={toggleModal} className=" flex ml-auto text-xl  hover:bg-pink-200 w-fit h-fit p-1 rounded-full hover: cursor-pointer transition-all" />
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit(addContent)}>
                        <div><InputBox {...register("title", { required: true })} variant="secondary" placeholder="Title..." /></div>
                        <div><InputBox {...register("link", { required: true })} variant="secondary" placeholder="Link..." /></div>
                        <div className="pl-16"><Button type="submit" variant="secondary" size="sm" title="Submit" /></div>
                    </form>

                </div>
            </div>) : null
        }
    </>
}