import { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
}

const VariantClasses = {
    "primary" : "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex justify-center items-center";

export function Button({ variant, text, startIcon, onClick, fullWidth }: ButtonProps){
    return (
        <button onClick={onClick} className={VariantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full" : ""}`}>
            <div className="pr-2">{startIcon}</div>
            {text}
        </button>
    )
}