import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Reminder} from "../Constants/schema"



interface ReminderProp {
    reminder:Reminder
}

const ReminderView = () => {


    const [reminders, setReminders] = useState<Reminder[]>([])


    const navigate = useNavigate()


    const ReminderComp:React.FC<ReminderProp> = ({reminder}) => {


        const [opType, setOpType] = useState<string>("normal")


        const [updatedTitle, setUpdatedTitle] = useState<string>(reminder.title)
        const [updatedMessage, setUpdatedMessage] = useState<string>(reminder.message)
        const [updatedTime, setUpdatedTime] = useState<string>(reminder.send_time) 
        const [updatedStatus, setUpdatedStatus] = useState<string>(reminder.status)


        const deleteReminder = () => {
            const token = localStorage.getItem("token")
            if(token){
                axios.delete("http://localhost:8000/reminders/", {headers:{"x-access-token":token}, data:{reminder}})
                .then((result)=>{
                    console.log("deleted successfully")
                    console.log(result)
                })
                .catch((err)=>{
                    console.log("Facing error deleting " + err)
                })
                setReminders(reminders.filter((currReminder)=>currReminder.id!= reminder.id))
            }
            
        }


        const updateReminder = () => {
            setOpType("update")
        }

        const handleUpdateSubmit = (event:React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            setOpType("normal")
            axios.put("http://localhost:8000/reminders/", {id:reminder.id,updatedTitle,updatedMessage, updatedTime, updatedStatus, token:localStorage.getItem("token")})
            .then((result)=>{
                console.log("Updating the value")
                console.log(result)
            })
            .catch((err)=>{
                console.log("Error updating" + err)
            })
        }


        if(opType == "normal"){

            return (
                <div className="flex flex-col text-center bg-gray-300 my-4 p-4 rounded-xl shadow-xl  ">
                    <div className="text-xl my-2 font-bold">{updatedTitle}</div>
                    <div className="my-2">{updatedMessage}</div>
                    <div className="my-2">{updatedTime}</div>
                    <div className="my-2">{updatedStatus}</div>
                    <div className="flex flex-row my-2">
                        <div onClick={updateReminder} className="ml-2 px-3 py-2 rounded-xl shadow-xl cursor-pointer bg-yellow-500">Update</div>
                        <div onClick={deleteReminder} className="ml-2 px-3 py-2 rounded-xl shadow-xl cursor-pointer bg-red-500">Delete</div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <form className="flex flex-col text-center bg-gray-300 my-4 p-4 rounded-xl shadow-xl" onSubmit={handleUpdateSubmit}>
                    <label>Update Title</label>
                    <input value={updatedTitle} onChange={(e)=>setUpdatedTitle(e.target.value)}  type="text" />
                    <label>Update Message</label>
                    <textarea value={updatedMessage} onChange={(e)=>setUpdatedMessage(e.target.value)} />
                    <label>Update Time</label>
                    <input value={updatedTime} type="datetime-local" onChange={(e)=>setUpdatedTime(e.target.value)} />
                    <label>Update Status</label>
                    <input value={updatedStatus} onChange={(e)=>setUpdatedStatus(e.target.value)} />
                    <button type="submit" className="ml-2 px-3 py-2 rounded-xl shadow-xl cursor-pointer bg-yellow-500">Update</button>
                </form>
            )
        }

    }




    useEffect(()=>{

        const token = localStorage.getItem("token")
        if(token){

            axios.get("http://localhost:8000/reminders/all", {headers:{"x-access-token":token}})
            .then((result)=>{
                console.log(result)
                setReminders(result.data)
            })
            .catch((err)=>{
                console.log("Error fetching list "+ err)
            })
        }


    }, [])


    const handleCreateReminder = () => {
        navigate("/reminders/create")
    }

    return (
        <div>
            <div className="px-3 py-2 bg-green-600 w-fit my-2 text-white rounded-xl shadow-xl cursor-pointer" onClick={handleCreateReminder}>Create Reminder</div>
            <div className="text-xl font-bold">All the reminders will be displayed here</div>
            <div className="grid grid-cols-4 gap-x-4">
                {reminders.map((reminder)=><ReminderComp reminder={reminder} />)}
            </div>
        </div>
    )
}

export default ReminderView