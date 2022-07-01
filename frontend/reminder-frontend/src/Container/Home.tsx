
import {useState} from "react"
import Login from "../Component/Login"
import Register from "../Component/Signup"


const Home = () => {

    const [show, setShow] = useState<string>("login")

    const handleClick = () => {
        if(show == "login"){
            setShow("register")
        }
        else{
            setShow("login")
        }
    }


    return (
      <div className="">
        {show=="login"?<Login />:<Register />}
        <div className="underline text-blue-400 mt-4 text-center" onClick={handleClick}>{show=="login"?"Not a member. Register":"Already a member? login"}</div>
      </div>
    )
}

export default Home