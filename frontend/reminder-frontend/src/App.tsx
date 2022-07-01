import Home from "./Container/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReminderView from "./Container/RemindersView";
import ReminderCreate from "./Container/ReminderCreate";
import Login from "./Component/Login"
import Register from "./Component/Signup"


const App = ()=> {
  return (

    <div className="flex flex-col items-center mt-4">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminders" element={<ReminderView />} />
          <Route path="/reminders/create" element={<ReminderCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
