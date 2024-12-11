import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
            <div className="font-semibold text-2xl pt-2 flex items-center gap-1">
                <Logo />
                Second Brain
            </div>
            <div className="pt-4 pl-6">
                <SidebarItem text="Twitter" icon={<TwitterIcon />} />
                <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
            </div>
        </div>
    )
}