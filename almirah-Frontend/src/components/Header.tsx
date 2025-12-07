import { IoAddOutline } from "react-icons/io5";
import { RiShareForwardFill } from "react-icons/ri";
import { InputBox } from "./ui/inputBox";
import { Button } from "./ui/Button"
import { IoSearch } from "react-icons/io5";

type ContentProps = {
    toggleModal: () => void;
};
//need to work on this 
export function Header({ toggleModal }: ContentProps) {

    return <div className="flex justify-between m-3 pb-2 pl-28 w-screen fixed">
        <InputBox variant="primary" type="text" placeholder="Search for something..." endIcon={<IoSearch />} />
        <div className="flex pr-6">
            <Button variant="secondary" size="lg" title="Add Content" onClick={toggleModal} startIcon={<IoAddOutline className="w-7 h-7" />} />
            <Button variant="primary" size="lg" title="Share Brain" startIcon={<RiShareForwardFill className="w-6 h-6" />} />
        </div>
    </div>
}
