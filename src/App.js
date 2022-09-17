import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home';
import Notestate from './context/notes/Notestate';
import Alert from './component/Alert';


function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert message="this is amazing react course"/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;