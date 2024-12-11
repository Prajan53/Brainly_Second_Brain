import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup(){
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border p-4">
                <div className="flex justify-center">SIGNUP</div>
                <Input placeholder="Username" />
                <Input placeholder="Password" />
                <div className="flex justify-center p-2">
                    <Button variant="primary" text="Signup" fullWidth={true}/>
                </div>
            </div>
        </div>
    )
}