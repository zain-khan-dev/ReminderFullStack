import Home from "./Container/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReminderView from "./Container/RemindersView";
import ReminderCreate from "./Container/ReminderCreate";

const App = ()=> {
  return (

    <div className="flex flex-col items-center mt-4">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reminders/all" element={<ReminderView />} />
          <Route path="/reminders/create" element={<ReminderCreate />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
