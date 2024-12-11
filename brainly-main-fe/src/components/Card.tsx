import { ShareIcon } from "../icons/ShareIcon";

interface CardProps{
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps){
    return(
        <div>
            <div className="p-4 rounded-md border border-gray-300 shadow-sm bg-white max-w-72 min-h-48 min-w-72">
                <div className="flex justify-between items-center">
                <div className="flex items-center text-lg">
                    <div className="pr-2 text-gray-500">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon />
                    </div>
                </div>
                </div>
                <div className="pt-4">
                    {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=","/").replace(/\?si.*/, '').replace(".be","be.com/embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                    </blockquote>}
                </div>
            </div>
        </div>
    )
}