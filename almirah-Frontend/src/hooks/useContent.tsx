import axios from "axios"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { contentAtom } from "../storeAtoms/Atoms"
import { BACKEND_URL } from "../utils/config"

//custom hook to get the contents from DB and display it
export function useContent() {
    const [contents, setContents] = useRecoilState(contentAtom)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(
            (response) => {
                setContents(response.data.contents)
            }
        )
    },[])

    return contents
}