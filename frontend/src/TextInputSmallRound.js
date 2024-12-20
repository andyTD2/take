import { twMerge } from "tailwind-merge";

export default function TextInputSmallRound(props) {
    let theme = props.theme === "dark" ? 
    "bg-zinc-800 text-white hover:bg-zinc-700 focus:bg-zinc-600" 
    : "bg-white text-black hover:bg-zinc-200 focus:bg-zinc-200";
    let className = twMerge(twMerge(`text-center focus:outline-none p-3 h-9 leading-9 w-56 rounded-xl`, theme), props.className)

    return (
        <input type={props.type || "text"} id={props.id} name={props.name} placeholder={props.placeholder} maxLength={props.maxLength}
        className={className} value={props.value} onChange={props.onChange}/>
    )
}