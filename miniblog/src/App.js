
import './App.css';
import {BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Login from './pages/login/login';
import Register from './pages/Register/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>} /> 
           <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} /> 
        </Routes>
      </div>
      <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
