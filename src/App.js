import './App.css';
import {
  BrowserRouter as Router, Route, Routes,
} from "react-router-dom";
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
         <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Router>
        </NoteState>
    </>
  );
}

export default App;