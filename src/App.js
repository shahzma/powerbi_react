import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Otp from './pages/Otp';
import Mainpage from './pages/Mainpage';
import Report from './pages/Report';
import FigmaLogin from './pages/FigmaLogin';
import FigmaOtp from './pages/FigmaOtp';

function App() {

  let [Email, setEmail] = useState('');
  let [Token, setToken] = useState('');
  let [IsAdmin, setIsAdmin] = useState(false)
  let [IsSignedIn, setIsSignedIn] = useState(false)
  let [IsLoggedIn, setIsLoggedIn] = useState(false)
  let [Reportname, setReportname] = useState('')
  let [ReportVersionID, setReportVersionID] = useState('')

  let userLogin = (email) => {
    setIsLoggedIn(true);
    setEmail(email)
  }

  let getReportName = (repname, is_admin) =>{
    setReportname(repname);
    setIsAdmin(is_admin)
    console.log('reportnameapp = ', Reportname )
    console.log('isadminmain=', IsAdmin)
  }

  let getReportVersionID = (id) => {
    setReportVersionID(id)
  }

  let SignedInStatus = (status) => {
    setIsSignedIn(status)
  }

  let setTokenVal = (Token)=>{
    setToken(Token)
  }
  

  return (
    <Router>
      <Routes>
        {/* <Route path = "/" element = {<Login userLogin={userLogin}/>}></Route> */}
        <Route path = "/" element = {<FigmaLogin userLogin={userLogin}/>}></Route>
        {/* <Route path = "/otp" element = {<Otp Token={Token} getReportName={getReportName}/>}/> */}
        <Route path = "/FigmaOtp" element = {<FigmaOtp email = {Email} IsLoggedIn={IsLoggedIn} SignedInStatus={SignedInStatus} setTokenVal = {setTokenVal}/>}/>
        {/* <Route path = "/mainpage" element = {<Mainpage Email = {'maruti@redseerconsulting.com'} Token={Token} Reportname={Reportname} IsAdmin = {IsAdmin} getReportVersionID = {getReportVersionID}/>}/> */}
        <Route path = "/mainpage" element = {<Mainpage Email = {'maruti@redseerconsulting.com'} IsSignedIn={IsSignedIn} Token = {Token}/>}/>
        <Route path = "/report" element = {<Report IsSignedIn={IsSignedIn} Reportname={Reportname} IsAdmin = {IsAdmin} Token = {Token}/>}/>
      </Routes>
    </Router>



    // <div className="App">
    //   <Login userLogin={userLogin}/>
    //   {/* <GetReportList token={token}/> */}
    // </div>
  );
}

export default App;
