
export function Input({onChange, placeholder}: {onChange: () => void; placeholder: string;}){
    return (
        <div>
            <input type={"text"} placeholder={placeholder} className="px-4 py-2 m-2 border rounded-md text-black" onChange={onChange} />
        </div>
    )
}