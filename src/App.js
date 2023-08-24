import React, { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './context/Notes/NoteState';
import AddNote from './components/AddNote';
import ViewNote from './components/ViewNote';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import User from "./components/User";
import Footer from "./components/Footer";
import bg from './components/pics/darkbg1.jpg'
import lightbg from './components/pics/lightbg1.jpg'


function App() {
  const key='mode';
  const value=localStorage.getItem(key)
  const[alert,setalert]=useState(null)
  const[mode,setMode]=useState(()=>{
    if (value==='light'|| value===null) {
      return 'dark'
    }
    return 'light'
  }) // Set initial mode to "light" if no value found in local storage
  const[color,setcolor]=useState("black") // Set initial color to "black" if no value found in local storage

  document.body.style.backgroundColor=value==='dark'?'#060a14':'white'

  const darkmode=(e)=>{
    e.preventDefault()
    if (mode==='light') {
      setMode("dark")
      document.body.style.backgroundColor="white"
      setcolor('black')
      showalert('light mode is enabled','success')
    }
    else{
      setMode('light')
      document.body.style.backgroundColor='#060a14' 
      setcolor('white')
      showalert('dark mode is enabled','success')
    }
    localStorage.setItem("mode",mode)
  }
  const showalert=(message,type)=>{
    setalert({
         msg: message,
         type: type
    })
    setTimeout(()=>{
      setalert(null)
    },1000)
  }
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query in the parent component
  };

 
  return (
    <div style={{
      backgroundImage: value === "dark" ? `url(${bg})` : `url(${lightbg})`,
      backgroundSize: "cover",
      backgroundRepeat: "repeat-y",
      overflow:'hidden'
      }}>
    <NoteState>
     <Router>
        <Navbar mode={mode} darkmode={darkmode} onSearch={handleSearch}/>
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home color={color} mode={mode} searchQuery={searchQuery}/>} />
          <Route exact path="/user" element={<User color={color} mode={mode}/>} />
          <Route exact path="/about" element={<About color={color} mode={mode}/>} />
          <Route exact path="/addNote" element={<AddNote showalert={showalert} color={color} mode={mode}/>} />
          <Route exact path="/viewNote/:noteId" element={<ViewNote showalert={showalert} color={color} mode={mode}/>} />
          <Route exact path="/login" element={<Login color={color} mode={mode}/>} />
          <Route exact path="/signup" element={<Signup showalert={showalert} color={color} mode={mode}/>} />
        </Routes>
        <Footer color={color} mode={mode}/>
      </Router>
      </NoteState>
      </div>  );
}

export default App;
