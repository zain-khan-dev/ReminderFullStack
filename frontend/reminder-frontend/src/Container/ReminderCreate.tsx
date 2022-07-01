import axios from "axios"
import React, {useState} from "react"


const ReminderCreate = () => {

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(title, message, time, status)

        axios.post("http://localhost:8000/reminders/create/", {title, message, time ,status, token:localStorage.getItem("token")})
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            console.log("Facing error "+ err)
        })

    }

    const [title, setTitle] = useState<string>()
    const [message, setMessage] = useState<string>()
    const [time, setTime] = useState<string>()
    const [status, setStatus] = useState<string>()




    return(
        <div className="flex flex-col justify-center items-center">
            <div className="text-3xl">Login Form</div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-4">
                <label className="text-xl font-bold">Enter Title: </label><br />
                <input value={title} onChange={(e)=>setTitle(e.target.value)}  className="border-2 border-black" /><br />
                <label className="text-xl font-bold">Enter Message: </label><br />
                <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="border-2 border-black" /><br />
                <label className="text-xl font-bold">Enter Send Time: </label><br />
                <input value={time} onChange={(e)=>setTime(e.target.value)} className="border-2 border-black" /><br />
                <label className="text-xl font-bold">Enter Status: </label><br />
                <input value={status} onChange={(e)=>setStatus(e.target.value)} className="border-2 border-black" /><br />
                <button type="submit" className="py-2 px-3 bg-red-400 text-center rounded-xl shadow-xl text-white">Create Reminder</button>
            </form>
    </div>
    )
}

export default ReminderCreate