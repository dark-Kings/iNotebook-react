import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import Notestate from './context/notes/Notestate';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';


function App() {
  const [alert,setalert]=useState(null);

  const showAlert =(message,type)=>{
     setalert({
      msg:message,
      type:type
     })
     setTimeout(() => {
      setalert(null);
     }, 1500);
  }

  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;