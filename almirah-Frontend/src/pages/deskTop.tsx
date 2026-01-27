

import { useState } from "react";
import { ContentModal } from "../components/modal/ContentModal";
import { Card } from "../components/ui/Card"
import { Header } from "../components/Header";
import { SideBar } from "../components/sideBar"
import { FaYoutube } from "react-icons/fa6";
import { useContent } from "../hooks/useContent";
import { LogoutModal } from "../components/modal/LogoutModal";
import axios from "axios";
import { contentAtom } from "../storeAtoms/Atoms";
import { useRecoilState } from "recoil";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//desktop page or the main page
export function DeskTop() {
    //state to open and close add content modal
    const [modal, setModal] = useState(false);
    const contents = useContent();
    const [, setContents] = useRecoilState(contentAtom)
    
    const toggleModal = () => {
        setModal(!modal)
    }
    
    async function handleDelete(contentId: string){
    const response = await axios.delete(`${BACKEND_URL}/api/v1/content`,{
            headers: {
      "Authorization": localStorage.getItem("token")
    },
    data: { contentId: contentId} 
    });
    if(response.status === 200){
        alert("Content deleted successfully");
      setContents(prev => prev.filter(c => c._id !== contentId));

    }   
    }

    return <div className="overflow-x-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-lightPink bg-[radial-gradient(#D3D3D3_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <aside className="w-24 text-gray-500 h-full fixed left-0 top-0">
            <SideBar />
        </aside>
        <Header toggleModal={toggleModal} />
        <main className="flex-1 pl-4 pt-8 grid-background h-screen ml-12 md:ml-24">
            <div className="flex flex-col md:flex-row flex-wrap gap-2">
                {contents.map(({_id, title, link }) =>
                    <Card 
                        key={_id} 
                        _id={_id} 
                        title={title}
                         URL={link || ""}
                         onDelete={handleDelete}
                        //need to change it
                        icon={<FaYoutube className="w-6 h-6 text-neutral-900" />} />)}
            </div>
        </main>
        {/* both the content modal and the logout modal */}
        <ContentModal modal={modal} toggleModal={toggleModal} />
        <LogoutModal />
    </div>
}

