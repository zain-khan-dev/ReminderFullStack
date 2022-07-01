import "reflect-metadata"
import express,{Request, Response} from "express"
import dotenv from "dotenv"
import ReminderRouter from "./Router/Reminder"
import UserRouter from "./Router/User"
import auth from "./middleware/auth"
dotenv.config()

const app = express();
const port = process.env.PORT;


app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use("/reminder", ReminderRouter)

app.use("/user", UserRouter)



app.get("/welcome", auth, (req:Request, res:Response)=>{
  return res.json("Welcome you are authenticated")
})


app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
