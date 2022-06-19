import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Otp from './pages/Otp';
import Mainpage from './pages/Mainpage';
import Report from './pages/Report';


function App() {

  let [Token, setToken] = useState('');
  let [IsAdmin, setIsAdmin] = useState(false)
  let [Reportname, setReportname] = useState('')
  let [ReportVersionID, setReportVersionID] = useState('')

  let userLogin = (tok) => {
    setToken(tok);
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
  

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login userLogin={userLogin}/>}></Route>
        {console.log('RouterToken=',Token)}
        <Route path = "/otp" element = {<Otp Token={Token} getReportName={getReportName}/>}/>
        {/* <Route path = "/mainpage" element = {<Mainpage Email = {'maruti@redseerconsulting.com'} Token={Token} Reportname={Reportname} IsAdmin = {IsAdmin} getReportVersionID = {getReportVersionID}/>}/> */}
        <Route path = "/mainpage" element = {<Mainpage Email = {'shahzma@redseerconsulting.com'}/>}/>
        <Route path = "/report" element = {<Report Token = {Token} Reportname={Reportname} IsAdmin = {IsAdmin}/>}/>
      </Routes>
    </Router>



    // <div className="App">
    //   <Login userLogin={userLogin}/>
    //   {/* <GetReportList token={token}/> */}
    // </div>
  );
}

export default App;
