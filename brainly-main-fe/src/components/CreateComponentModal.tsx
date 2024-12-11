import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateComponentModal({open, onClose}){
    return(
        <div>
            {open && <div className="w-screen h-screen fixed bg-slate-500 top-0 left-0 opacity-60 flex justify-center">
                <div className="flex items-center">
                    <span className="bg-black p-4 rounded-md opacity-100 text-white">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                {/* onOutsideClick hook to make sure that if clicked outside of the form to close it */}
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input placeholder={"Title"} />
                            <Input placeholder={"Link"} />
                            <Input placeholder={"Type"} />
                        </div>
                        <div className="flex justify-center items-center">
                            <Button variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}