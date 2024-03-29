import React from 'react'
import Header from '../components/Header'
import { useState, useEffect } from 'react';
import styled, { StyleSheetManager } from 'styled-components'
import {Link, Navigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom';
import TagManager from 'react-gtm-module'

function Mainpage(props) {
  const [ ReportData, setReportData ] = useState([]);
  const [UserReports, setUserReports] = useState([]);
  const [AllReports, setAllReports] = useState([])
  const [OtherReports, setOtherReports] = useState([]);
  const [ReportPlayer, setReportPlayer] = useState([]);
  // const [email, setEmail] = useState('');
  // const [token, setToken] = useState('')

  const search = useLocation().search;
  const client_id = new URLSearchParams(search).get('client_id')
  const backend_token = new URLSearchParams(search).get('backend_token')
  const pseudo_email = new URLSearchParams(search).get('pseudo_email')
  const email = new URLSearchParams(search).get('email')

  useEffect(()=>{
    if (client_id){
      console.log('backend_client_id=', client_id)
      window.localStorage.setItem("clientID", client_id);
    }
    if (backend_token){
      console.log('backend_token=', backend_token)
      window.localStorage.setItem("token", backend_token);
    }
    if (pseudo_email){
      console.log(pseudo_email)
      window.localStorage.setItem("pseudo_email", pseudo_email);
    }
    if (email){
      console.log(email)
      window.localStorage.setItem("email", email);
    }
  },[client_id, backend_token, pseudo_email, email])

  useEffect(() => {
    if(props.email){
      window.localStorage.setItem("email", props.email);
    }
    if(props.Token){
      window.localStorage.setItem("token", props.Token);
    }
    if(props.pseudo_email){
      window.localStorage.setItem("pseudo_email", props.pseudo_email);
    }
    if(props.clientID){
      window.localStorage.setItem("clientID", props.clientID);
    }
  }, [props.email, props.Token, props.pseudo_email, props.clientID]);

  useEffect(()=>{
    let email = window.localStorage.getItem("email")
    if (email.split('@')[1] in ['redseerconsulting.com','redseer.com' ,'redcore.co','benchmarks.digital','Beeroute.in'] === false){
    ReactGA.pageview(window.location.pathname)
  }
  TagManager.dataLayer({
    dataLayer: {
      event: 'customview',
      pagePath: '/Mainpage',
      pageTitle: 'MainPage',
    },
  });
  // ReactGA.pageview(window.location.pathname)
  },[])

  useEffect(() => {
    // let email = 'shahzmaalif@gmail.com'
    let curr_id = ''
    if (props.clientID){
      curr_id = props.clientID
    }else{
      curr_id = window.localStorage.getItem("clientID")
    }
    console.log('real_email=', window.localStorage.getItem("email"))
    console.log('pseudo_email=', window.localStorage.getItem("pseudo_email"))
    console.log('curr_id=', curr_id)
    let prop_token = window.localStorage.getItem("token")
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/report_access/?client_id=${curr_id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${prop_token}`
    },
    // body: JSON.stringify({})
    })
    .then( data => data.json())
    .then(
    data => {
        console.log('userrep = ', data)
        setReportData(data)
        setUserReports(data.map(a=>a.report_name))
    }
    )
    .catch( error => console.error(error))

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/report/`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(
      res=>{
        console.log('res=', res)
        setAllReports(res.map(a=>a.report_name))
        // let rem_reports = AllReports.filter(x => !UserReports.includes(x));
        // setOtherReports(rem_reports)
        // console.log('rem_reports=',rem_reports)
      }
    ).catch(error => console.error(error))

    // fetch(`http://127.0.0.1:8000/ReportPlayers/`,{
    //   method:'GET',
    //   headers:{
    //     'Content-Type': 'application/json',
    //   }
    //   }).then(val=>val.json())
    //   .then(
    //       val =>{
    //         setReportPlayer(val)
    //         console.log('val=',val)
    //       }
    //   ).catch(error => console.error(error))

}, [props.email, props.token, props.clientID]);

useEffect(()=>{
        let rem_reports = AllReports.filter(x => !UserReports.includes(x));
        console.log('rem_reports=',rem_reports)
        let removable_reports = ['Data Check (Internal)', 'Shortform Video Demo', 'OTT Audio - TD Demo', 'Keyboard', 'New Dashboard', 'Online Retail 2.0 - Category', 'Cohort Analysis', 'Sectors Company Profile', 'Brand Verse', 'Online Retail Demo', 'Vahan Dashboard', 'Brandverse Product', 'OTT Audio Demo']
        let email = window.localStorage.getItem("email")
        let email_arr = ['rahulkumar@redseerconsulting.com','ankit.sharma@redseerconsulting.com','shubhangi.k@redseerconsulting.com', 'shahzmaalif@redseerconsulting.com' , 'vaseka@redseerconsulting.com', 'gaurav.singh@redseerconsulting.com']
        if (email_arr.includes(email)){
          setOtherReports(rem_reports)
        }else{
          let r_rem_reports = rem_reports.filter(x=>!removable_reports.includes(x))
          setOtherReports(r_rem_reports)
        }
        console.log('rem_reports=',rem_reports)
},[AllReports, UserReports])

let handleSignOut = ()=>{
  console.log('signout')
  let prop_email = window.localStorage.getItem("email")
  let prop_token = window.localStorage.getItem("token")
  fetch(`${process.env.REACT_APP_API_ENDPOINT}/logout/?email=${prop_email}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Token ${prop_token}`
      }
    }).then((res) => res.json())
    .then(
      res => {
          console.log('logout= ', res)
      }
      )
      .catch( error => {
        console.error(error)
      })
  localStorage.clear();
  window.location.href='/'
}

useEffect(()=>{
  console.log('will sign out in 30 min')
  const interval = setTimeout(() => {
    console.log('Logs every minute');
    handleSignOut()
  }, 1000*60*30);

  return () => clearInterval(interval);
},[])

useEffect(()=>{
  setInterval(function () {
    console.log("check token");
    let prop_token = window.localStorage.getItem("token")
    let prop_email = window.localStorage.getItem("email")
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/validateToken/?email=${prop_email}`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Token ${prop_token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        localStorage.clear();
        window.location.href='/'
      }
    })
    .then(
      res => {
          console.log('tokenValidation= ', res)
      }
      )
      .catch( error => {
        console.error(error)
      })
  }, 1000*60*5);
},[])


  let handleReportDetail = ()=>{
    console.log('ott');
    window.location.href='/report'
  }
  let handleReportBuy = () =>{
    console.log('ott');
  }

  let gotoReport = ()=>{
    window.location.href='/report'
    // return <Navigate to = "/report"/>
  }
  let goBuyReport = () =>{
    alert('You need to buy this report first')
  }

  let handleOnClick=(rep, start_date, end_date)=>{
// if youu pass wrong prop then link will act like window.location.href. use e.preventDefault() to check
    console.log('rep=', rep)
    props.getReportName(rep)
    window.localStorage.setItem('start_date',start_date)
    window.localStorage.setItem('end_date', end_date)
  }

  if(!props.Token){
    if(!window.localStorage.getItem("token")){
      if(!backend_token){
        return <Navigate to = "/"/>
      }
    }
    // {return <Navigate to = "/"/>}
}

  return (
    <PageContainer>
      <NavBar>
          <Logo>
            <img src = '/Images/benchmark_side.svg'/>
          </Logo>
          <User>
              <a><img src = "/Images/user.svg" alt = ""/></a>
              <SignOut onClick={handleSignOut}>
                  <a>Sign Out</a>
              </SignOut>
          </User>
      </NavBar>
      <Title>Available Reports</Title>
      <Content>
          {ReportData.map( repver=>{
                return (
                <Wrap key={repver.id}>
                  <UpperRow>{repver.report_name}</UpperRow>
                  <MidRow>
                    {(repver.players.slice(0, 3)).join(',  ').length>0?(repver.players.slice(0, 3)).join(',  ')+' & more':'no companies available'}
                    {/* {ReportPlayer.find(element=> element.report_name === repver.report_name)?.player_name} */}
                    {/* {console.log('rep_player=',(ReportPlayer.find(element=> element.report_name === repver.report_name)).player_name)} */}
                  </MidRow>
                  <EndRow>
                  <Link to="/report" style={{float:'right', marginRight:'2vw', backgroundColor:'#FF6471', border:'None'}}
                  className="btn btn-primary"
                  onClick = {()=>handleOnClick(repver.report_name, repver.start_date, repver.end_date)}
                  >View Report</Link>
                  </EndRow>
                </Wrap>
                )
            }
            )}
      </Content>
      <Title>Other Buyable Reports</Title>
      <Content>
            {OtherReports.map( rep=>{
                return (
                <Wrap>
                  <UpperRow>{rep}</UpperRow>
                  <MidRow>Hidden Players</MidRow>
                  <EndRow>
                  <StyledButton onClick = {goBuyReport}>Buy Report</StyledButton>
                  </EndRow>
                </Wrap>
                )
            }
            )}
      </Content>
    </PageContainer>
  )
}

export default Mainpage

const PageContainer = styled.div`
  background-color:#F4F4F4;
  min-height:100vh;
  overflow:hidden;
`
const Title = styled.h4`
  margin:15px 60px;
  color:#FF6270;
  `

const Content = styled.div`
  margin:20px 60px;
  display:grid;
  grid-gap:25px;
  grid-template-columns: 50% 50%;
  @media (max-width:768px){
    grid-template-columns:100%;
    margin:20px 40px;
}
`

const Wrap = styled.div`
  border-radius:10px;
  /* overflow:hidden; */
  height:22vh;
  /* display:flex;
  justify-content:center;
  align-items:center; */
  border: 1px solid white;
  cursor:pointer;
  background-color:white;
  &:hover {
      /* transform: scale(1.05); */
      border-color:#FF6270;
  }
  @media (max-width:768px){
    width: 80vw;
    height:26vh;
}
`
const UpperRow = styled.h4`
margin:2.5vh;
`
const MidRow = styled.div`
margin-left:2.5vh;
margin-right:2.5vh;
/* display:flex;
flex-direction:column;
flex:1; */
/* overflow:auto; */
`
const EndRow = styled.div`
margin-top: 2vh;
`


const NavBar = styled.div`
background-color:white;
display:flex;
justify-content:space-between;
align-items:center;
height:70px;
`

const Logo = styled.div`
margin-left:4.5vw;
img{
  height:50px;
}
`
const SignOut = styled.div`
display:none;
position:absolute;
top:58px;
right:25px;
background:#F6F6F6;
border:1px solid black;
border-radius: 0 0 5px 5px;
width:90px;
height: 40px;
font-size:16px;
/* transition-duration:160ms; */
text-align:center;
&:hover{
  background-color: #ddd;
}
`

const User = styled.div`
margin-right:2.5vw;
img{
    width:48px;
    height:48px;
    border-radius:50%;
    padding:5px;
}
&:hover{
    ${SignOut}{
        align-items:center;
        display:flex;
        justify-content:center;
    }
  }
`

const StyledButton = styled(Button)`
 background-color:#FF6471;
 /* width: 9vw; */
 float:right;
 margin-right: 2vw;
 border:none;
 /* height:5vh; */
 &:hover{
  background-color:#FF6471;
 }
`