import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import styled from 'styled-components';
import './Report.css';
import './Report.scss';
import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link, Navigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaAmazon, FaTrafficLight,FaUsers, FaDeezer,FaAlignLeft, FaKeyboard } from 'react-icons/fa';
import{MdOutlineSummarize, MdMonetizationOn, MdInsights, MdDashboard} from 'react-icons/md';
import { ImProfile } from "react-icons/im";
import {SiCoveralls, SiSimpleanalytics} from "react-icons/si"
import {FiUsers} from "react-icons/fi"
import {AiOutlineFileSearch} from 'react-icons/ai'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiCategory, BiBookContent } from "react-icons/bi";


// import 'react-pro-sidebar/dist/css/styles.css';


function Report(props) {
//get id and reporturl and accesstoken from click
  const [ AccessToken, setAccessToken ] = useState('');
  const [ EmbedToken, setEmbedToken ] = useState('');
  const [ reportUrl, setReportUrl ] = useState('');
  const [ pages, setPages ] = useState([]);
  const [myPages, setMyPages] = useState([]);
  const [ reportId, setReportId ] = useState('');
  const [ newUrl, setNewUrl ] = useState('');
  const [width, setWidth] = useState(window.innerWidth);
  const [ toggle, setToggle ] = useState(false);
  let [iconDict, setIconDict] = useState({
    'Sector Summary':<MdOutlineSummarize/>,
    'Company Profile':<ImProfile />,
    'Overall':<SiCoveralls/>,
    'Category':<BiCategory/>,
    'Amazon Specific':<FaAmazon />,
    'Traffic':<FaTrafficLight/>,
    'Engagement':<FaUsers/>,
    'Streams Analysis':<SiSimpleanalytics/>,
    'Monetization':<MdMonetizationOn/>,
    'User Profile':<FiUsers/>,
    'Engagement Profile':<AiOutlineFileSearch/>,
    'Sector Insights':<MdInsights/>,
    'Content':<BiBookContent/>,
    'Top Line Estimates':<FaDeezer/>,
    'Fulfilment Metrics':<FaAlignLeft/>,
    'Unit Economics':<MdMonetizationOn/>,
    'Keyboard':<FaKeyboard/>,
    'Dashboard':<MdDashboard/>
  })

  // runs on first render

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

  useEffect(() => {
    if(props.Token){
      window.sessionStorage.setItem("token", props.Token);
    }
    if(props.ReportName){
      window.sessionStorage.setItem("ReportName", props.ReportName);
    }
  }, [props.Token, props.ReportName]);

  useEffect(()=>{
    // console.log('props=', props)
    let propsrep = ''
    if (props.ReportName){
      propsrep = props.ReportName
    }else{
      propsrep = window.sessionStorage.getItem("ReportName")
    }
    let prop_token = window.sessionStorage.getItem("token")
    // console.log('propsrep=', propsrep)
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/MSAccessToken/?rep=${propsrep}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${prop_token}`
    },
    })
    .then( data => data.json())
    .then(
    data => {
        setAccessToken(data['access_token'])
        setEmbedToken(data['embed_token'])
        setReportUrl(data['report_url'])
        setPages(data['pages'])
        setReportId(data['report_id'])
        setNewUrl(data['report_url'])
        // console.log(reportUrl+'&pageName=ReportSection7446fb261ebfdaa647fa')
    }
    )
    .catch( error => console.error(error))
    
    // replace ott audio below with propsrep
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/PageReports/?rep=${propsrep}`, {
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then(res=>res.json())
    .then(
      res=>{
        console.log('tree=',res)
        setMyPages(res)
      }
    )
},[]);

let handleClick = (Name)=>{
  console.log('name=',Name)
  setNewUrl(reportUrl+'&pageName='+Name)
}

let handleSignOut = ()=>{
  console.log('signout')
  let prop_email = window.sessionStorage.getItem("email")
  let prop_token = window.sessionStorage.getItem("token")
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
  sessionStorage.clear();
  window.location.href='/'
}

let handleToggle = ()=>{
  setToggle(!toggle)
}

let gotoMainPage = ()=>{
  window.location.href='/mainpage'
}

let gauravfn = () =>{
  alert('Hello')
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
    let prop_token = window.sessionStorage.getItem("token")
    let prop_email = window.sessionStorage.getItem("email")
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
        sessionStorage.clear();
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

if(!props.Token){
  if(!window.sessionStorage.getItem("token"))
  {return <Navigate to = "/"/>}
}

  return (
    width>768 ?
        (
        <PageContainer>
            <ProSidebarContainer collapsed={false}>
            <SideBarHeader onClick={()=>gotoMainPage()}>
              <img src= '/Images/bold_strategy.svg' alt= ''/>
            </SideBarHeader>
              <Menu>
                <MenuItem></MenuItem>
                <MenuItem><h5>{window.sessionStorage.getItem("ReportName")}</h5></MenuItem>
                {myPages.map((repver,index)=>{
                  return repver.children_page_name.length===0?(
                    <MenuItem  icon={iconDict[repver.page_name]} onClick={()=>handleClick(repver.link)}>
                      {repver.page_name}
                    </MenuItem>
                  ):(
                    <SubMenu title={repver.page_name} icon={iconDict[repver.page_name]}>
                      {repver.children_page_name.map(i=>{
                          return(
                            <MenuItem key={i.id} onClick={()=>handleClick(i.link)}>
                                <div style = {{fontFamily:'Arial'}}>{'\u2022'}&nbsp;&nbsp;{i.page_name}</div>
                            </MenuItem>
                          )
                        })}
                    </SubMenu>
                  )
                })}
              </Menu>
            </ProSidebarContainer>
          <ReportContainer>
                    <User>
                    <a><img src = "/Images/user.svg" alt = ""/></a>
                        <SignOut onClick={handleSignOut}>
                            <a>Sign Out</a>
                        </SignOut>
                    </User>
            <PowerBIEmbed
              embedConfig = {{
                type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                id: reportId,
                //get from props
                // embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f87ed8df-7267-4a8a-835f-6a786edf57ed&groupId=d786d974-91ce-43e8-a52c-c0e6b402f74f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d&pageName=ReportSection19fe81eb665f9dc58332&w=2',
                embedUrl:newUrl,
                accessToken: EmbedToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    }
                  },
                }
              }}
              eventHandlers = {
                new Map([
                  ['loaded', function () {console.log('Report loaded');}],
                  ['rendered', function () {console.log('Report rendered');}],
                  ['error', function (event) {console.log(event.detail);}]
                ])
              }
            
              cssClassName = { "report-style-class" }
              getEmbeddedComponent = { (embeddedReport) => {
                window.report = embeddedReport ;
              }}
                  />
          </ReportContainer>
        </PageContainer>
        ):(
          <PageContainer>
            <ProSidebarContainer collapsed={toggle} width={200}>
            <SideBarHeader onClick={()=>gotoMainPage()}>
              <img src= '/Images/bold_strategy.svg' alt= ''/>
            </SideBarHeader>
              <Menu>
                <MenuItem></MenuItem>
                <MenuItem>{window.sessionStorage.getItem("ReportName")}</MenuItem>
                <MenuItem></MenuItem>
                {myPages.map((repver)=>{
                  return repver.children_page_name.length===0?(
                    <MenuItem icon={iconDict[repver.page_name]} onClick={()=>handleClick(repver.link)}>
                      {repver.page_name}
                    </MenuItem>
                  ):(
                    <SubMenu title={repver.page_name} icon={iconDict[repver.page_name]}>
                      {repver.children_page_name.map(i=>{
                          return(
                            <MenuItem key={i.id} onClick={()=>handleClick(i.link)}>
                                <div style = {{fontFamily:'Arial'}}>{'\u2022'}&nbsp;{i.page_name}</div>
                            </MenuItem>
                          )
                        })}
                    </SubMenu>
                  )
                })}
              </Menu>
            </ProSidebarContainer>
          <ReportContainer>
            <User>
              <ToggleButton onClick={()=>handleToggle()}><img src = "/Images/menu.png"/></ToggleButton>
              <a><img src = "/Images/user.svg" alt = ""/></a>
                  <SignOut onClick={handleSignOut}>
                      <a>Sign Out</a>
                  </SignOut>
            </User>
            <PowerBIEmbed
              embedConfig = {{
                type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                id: reportId,
                //get from props
                // embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=f87ed8df-7267-4a8a-835f-6a786edf57ed&groupId=d786d974-91ce-43e8-a52c-c0e6b402f74f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwiYW5ndWxhck9ubHlSZXBvcnRFbWJlZCI6dHJ1ZSwiY2VydGlmaWVkVGVsZW1ldHJ5RW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlLCJza2lwWm9uZVBhdGNoIjp0cnVlfX0%3d&pageName=ReportSection19fe81eb665f9dc58332&w=2',
                embedUrl:newUrl,
                accessToken: EmbedToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    }
                  },
                }
              }}
              eventHandlers = {
                new Map([
                  ['loaded', function () {console.log('Report loaded');}],
                  ['rendered', function () {console.log('Report rendered');}],
                  ['error', function (event) {console.log(event.detail);}]
                ])
              }
            
              cssClassName = { "report-style-class" }
              getEmbeddedComponent = { (embeddedReport) => {
                window.report = embeddedReport ;
              }}
                  />
          </ReportContainer>
          </PageContainer>
        )
  )
}

export default Report;

const PageContainer =styled.div`
display:flex;
`
const ToggleButton = styled.button`
/* height:20px; */
/* width:70px; */
border:none;
background-color:white;

`

const ReportContainer = styled.div`
width:80%;
@media (max-width:768px){
    width:100%
}
`
const ProSidebarContainer = styled(ProSidebar)`
width:20%
`
const SidebarContainer = styled.div`
width:21%
`
const SideBarHeader = styled.div`
padding-left:20px;
padding-top:20px;
`

const SignOut = styled.div`
display:none;
position:absolute;
top:48px;
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

@media (max-width:768px){
  display:none;
  position:absolute;
  top:48px;
  right:23px
}
`

const User = styled.div`
/* background-color:#F6F6F6; */
/* display:flex;
align-items:center; */
/* justify-content:center; */
img{
    float:right;
    width:48px;
    height:48px;
    border-radius:50%;
    padding:5px;
    margin-right:20px;
}

&:hover{
    ${SignOut}{
        align-items:center;
        display:flex;
        justify-content:center;
    }
  }
`
