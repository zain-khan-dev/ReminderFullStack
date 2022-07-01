import axios from "axios"
import { useEffect, useState } from "react"
import {Reminder} from "../Constants/schema"



interface ReminderProp {
    reminder:Reminder
}

const ReminderComp:React.FC<ReminderProp> = ({reminder}) => {
    return (
        <div className="grid grid-cols-4 bg-gray-300 my-4 p-2 rounded-xl shadow-xl">
            <div className="text-xl">{reminder.title}</div>
            <div className="">{reminder.message}</div>
            <div>{reminder.send_time}</div>
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
            <div>
                {reminders.map((reminder)=><ReminderComp reminder={reminder} />)}
            </div>
        </div>
    )
}

export default ReminderView