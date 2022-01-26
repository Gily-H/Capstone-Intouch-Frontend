import React from "react";
import {BrowserRouter as Router}from "react-router-dom"
import {Link, Routes, Route} from "react-router-dom";
import './app.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import UserGraph from './components/UserGraph'
import * as d3 from 'd3'

function App() {

  return (
    <div>
      
      <Routes>

        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signUp" element={<SignUp/>}/> 
        <Route exact path="/userGraph" element={<UserGraph/>}/>


      </Routes>

    </div>
  );
}

export default App;
