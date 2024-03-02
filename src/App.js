import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Pages/LoginPage";
import SignupForm from "./Pages/SignUpPage";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className=" w-screen  bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignupForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
