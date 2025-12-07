import type { ButtonHTMLAttributes, ReactElement } from "react";


//extending to button attributes
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary" | "basic" | "danger";
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    title: string;
}

const defaultstyles = `rounded-md flex justify-center items-center px-4 ml-4 space-x-2 
                    cursor-pointer border-2 shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-[4px]
                      active:translate-y-[4px] transition-all duration-300`;

const variantStyles = {
    "primary": "bg-lightMatcha text-black font-clashdisplay font-semibold",
    "secondary": "bg-cream text-black font-clashdisplay font-semibold",
    "basic": "bg-white text-black font-clashdisplay font-semibold",
    "danger": "bg-red-400 text-black font-clashdisplay font-semibold"
}


const sizeStyles = {
    "sm": "max-w-20 h-8",
    "md": "max-w-30 h-10",
    "lg": "max-w-50 h-10"
}

export const Button = ({ variant, size, startIcon, title, ...rest }: ButtonProps) => {
    return <button className={`${defaultstyles} ${variantStyles[variant]} ${sizeStyles[size]}`} {...rest}>
        {startIcon} <span>{title}</span>
    </button>
}