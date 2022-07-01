import axios from "axios"
import {useState} from "react"
import {useNavigate} from "react-router-dom"


const Login = () => {


    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        console.log("Submitting the form")


        axios.post("http://localhost:8000/user/login/", {email, password})
        .then((result)=>{
            console.log("Added successfully" + result.data["token"])
            localStorage.setItem("token", result.data["token"])
            navigate("/reminders")
        })
        .catch((err)=>{
            console.log("Facing err "+ err)
        })
    }



    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-3xl">Login Form</div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-4">
                <label className="text-xl font-bold">Enter Email Address: </label><br />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="border-2 border-black" /><br />
                <label className="text-xl font-bold">Enter Password: </label><br />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="border-2 border-black" /><br />
                <button type="submit" className="py-2 px-3 bg-red-400 text-center rounded-xl shadow-xl text-white">Login</button>
            </form>
        </div>
    )
}

export default Login