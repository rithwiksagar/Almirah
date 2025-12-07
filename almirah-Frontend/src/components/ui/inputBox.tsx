
import { forwardRef, type InputHTMLAttributes, type ReactElement } from "react";

//getting the props from input box as well
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant: "primary" | "secondary" | "small";
    endIcon?: ReactElement;
}

const variantStyles = {
    "primary": `flex rounded-md h-12 bg-white flex justify-center items-center px-4 
                space-x-2 cursor-pointer border-2 shadow-[2px_2px_0px_#000] font-clashDisplay font-regular hidden md:block`,
    "secondary": `flex rounded-md bg-white w-64 flex justify-center items-center px-4 
                space-x-2 cursor-pointer border-2 shadow-[2px_2px_0px_#000] font-clashDisplay font-regular`,
    "small": `flex rounded-md bg-white w-40 flex justify-center items-center px-4 
                space-x-2 cursor-pointer border-2 shadow-[2px_2px_0px_#000] font-clashDisplay font-regular`
}


export const InputBox = forwardRef<HTMLInputElement, InputProps>(({ variant, endIcon, ...rest }, ref) => {
    return <div className={`${variantStyles[variant]}`}>
        <input
            ref={ref}
            {...rest}
            className={"outline-none py-2 w-76"}
        />

    </div>
})