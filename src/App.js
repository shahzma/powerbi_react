import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Otp from './pages/Otp';
import Mainpage from './pages/Mainpage';
import Report from './pages/Report';
import FigmaLogin from './pages/FigmaLogin';
import FigmaOtp from './pages/FigmaOtp';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module'
import NewFigmaLogin from './pages/NewFigmaLogin';
import NewFigmaSIgnIn from './pages/NewFigmaSIgnIn';
import NewFigmaOTP from './pages/NewFigmaOTP';
import NewReport from './pages/NewReport';
import NewMainPage from './pages/NewMainPage';
import Frontpage from './pages/Frontpage';
import Article from './pages/Article';
import ArticleDetail from './pages/ArticleDetail';
import Searchpage from './pages/Searchpage';
import PowerbiCompany from './pages/PowerbiCompany';
import DjangoEmbed from './pages/DjangoEmbed';
import Internet from './pages/Internet';
import Front from './pages/Front';

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

  // prod  tracking id ga
  // const TRACKING_ID = 'UA-241888110-1'

// local tracking id
  const TRACKING_ID = 'UA-241614253-1'

  // prod args
//   const tagManagerArgs = {
//     gtmId: 'GTM-MXCJ6SF'
// }

// testting args
const tagManagerArgs = {
  gtmId: 'GTM-P3W82CC'
}
  TagManager.initialize(tagManagerArgs)

  // react ga prod
  // ReactGA.initialize(TRACKING_ID)

  return (
    <Router>
      <Routes>
        {/* <Route path = "/" element = {<Login userLogin={userLogin}/>}></Route> */}
        <Route path = "/signin" element = {<FigmaLogin userLogin={userLogin} getRealEmail={getRealEmail} setClientID={setClientID}/>}></Route>
        <Route path = '/login' element = {<NewFigmaLogin/>}></Route>
        <Route path = '/' element={<NewFigmaSIgnIn/>}  ></Route>
        <Route path = '/otp' element = {<NewFigmaOTP/>}></Route>
        <Route path = '/frontpage' element = {<Front/>}></Route>
        {/* <Route path = "/otp" element = {<Otp Token={Token} getReportName={getReportName}/>}/> */}
        <Route path = "/FigmaOtp" element = {<FigmaOtp email = {RealEmail} IsLoggedIn={IsLoggedIn} SignedInStatus={SignedInStatus} setTokenVal = {setTokenVal}/>}/>
        {/* <Route path = "/mainpage" element = {<Mainpage Email = {'maruti@redseerconsulting.com'} Token={Token} Reportname={Reportname} IsAdmin = {IsAdmin} getReportVersionID = {getReportVersionID}/>}/> */}
        <Route path = "/mainpage" element = {<Mainpage email = {RealEmail} pseudo_email={Email} IsSignedIn={IsSignedIn} Token = {Token} getReportName={getReportName} clientID={clientID}/>}/>
        <Route path = "/report" element = {<Report Token={Token} email = {RealEmail} pseudo_email={Email} ReportName = {Reportname}/>}/>
        <Route path = 'newreport' element = {<NewReport/>}></Route>
        <Route path = '/newmainpage' element = {<NewMainPage/>}></Route>
        <Route path = '/search' element = {<Searchpage/>}></Route>
        <Route path = '/article' element = {<Article/>}></Route>
        <Route path='/articled' element = {<ArticleDetail/>}></Route>
        <Route path = '/powerbicompany' element = {<PowerbiCompany/>}></Route>
        <Route path = '/djangoembed' element = {<DjangoEmbed/>}></Route>
      </Routes>
    </Router>

  );
}

export default App;
