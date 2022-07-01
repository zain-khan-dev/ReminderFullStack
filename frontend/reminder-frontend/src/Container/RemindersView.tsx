import axios from "axios"
import { useEffect, useState } from "react"
import {Reminder} from "../Constants/schema"



interface ReminderProp {
    reminder:Reminder
}

const ReminderComp:React.FC<ReminderProp> = ({reminder}) => {

    
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
        }
        
    }


    const updateReminder = () => {

    }



    return (
        <div className="flex flex-col text-center bg-gray-300 my-4 p-4 rounded-xl shadow-xl  ">
            <div className="text-xl my-2 font-bold">{reminder.title}</div>
            <div className="my-2">{reminder.message}</div>
            <div className="my-2">{reminder.send_time}</div>
            <div className="flex flex-row my-2">
                <div onClick={updateReminder} className="ml-2 px-3 py-2 rounded-xl shadow-xl cursor-pointer bg-yellow-500">Update</div>
                <div onClick={deleteReminder} className="ml-2 px-3 py-2 rounded-xl shadow-xl cursor-pointer bg-red-500">Delete</div>
            </div>
        </div>
    )
}


const ReminderView = () => {


    const [reminders, setReminders] = useState<Reminder[]>([])


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

    return (
        <div>
            <div>All the reminders will be displayed here</div>
            <div className="grid grid-cols-4 gap-x-4">
                {reminders.map((reminder)=><ReminderComp reminder={reminder} />)}
            </div>
        </div>
    )
}

export default ReminderView