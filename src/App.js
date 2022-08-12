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
  let [RealEmail, setRealEmail] = useState('');
  let [Token, setToken] = useState('');
  let [IsAdmin, setIsAdmin] = useState(false)
  let [IsSignedIn, setIsSignedIn] = useState(false)
  let [IsLoggedIn, setIsLoggedIn] = useState(false)
  let [Reportname, setReportname] = useState('')
  let [ReportVersionID, setReportVersionID] = useState('')
  let [clientID, setClientID] = useState(0)

  let userLogin = (email) => {
    setIsLoggedIn(true);
    setEmail(email)
    // setPseudoEmail(pseudo_email)
  }

  let getRealEmail=(real_email)=>{
    setRealEmail(real_email);
  }

  let getReportName = (repname) =>{
    setReportname(repname);
    console.log('reportnameapp = ', Reportname )
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
  
  let setClientId = (clientID)=>{
    setClientID(clientID)
  }

  return (
    <Router>
      <Routes>
        {/* <Route path = "/" element = {<Login userLogin={userLogin}/>}></Route> */}
        <Route path = "/" element = {<FigmaLogin userLogin={userLogin} getRealEmail={getRealEmail} setClientID={setClientID}/>}></Route>
        {/* <Route path = "/otp" element = {<Otp Token={Token} getReportName={getReportName}/>}/> */}
        <Route path = "/FigmaOtp" element = {<FigmaOtp email = {RealEmail} IsLoggedIn={IsLoggedIn} SignedInStatus={SignedInStatus} setTokenVal = {setTokenVal}/>}/>
        {/* <Route path = "/mainpage" element = {<Mainpage Email = {'maruti@redseerconsulting.com'} Token={Token} Reportname={Reportname} IsAdmin = {IsAdmin} getReportVersionID = {getReportVersionID}/>}/> */}
        <Route path = "/mainpage" element = {<Mainpage email = {RealEmail} pseudo_email={Email} IsSignedIn={IsSignedIn} Token = {Token} getReportName={getReportName} clientID={clientID}/>}/>
        <Route path = "/report" element = {<Report Token={Token} email = {RealEmail} ReportName = {Reportname}/>}/>
      </Routes>
    </Router>



    // <div className="App">
    //   <Login userLogin={userLogin}/>
    //   {/* <GetReportList token={token}/> */}
    // </div>
  );
}

export default App;
