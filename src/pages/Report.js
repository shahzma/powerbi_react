import {PowerBIEmbed} from 'powerbi-client-react';
import {models} from 'powerbi-client';
import styled from 'styled-components';
import './Report.css';
import './Report.scss';
import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link, Navigate} from 'react-router-dom';
// import 'react-pro-sidebar/dist/css/styles.css';


function Report(props) {
//get id and reporturl and accesstoken from click
  const [ AccessToken, setAccessToken ] = useState('');
  const [ EmbedToken, setEmbedToken ] = useState('');
  const [ reportUrl, setReportUrl ] = useState('');
  const [ pages, setPages ] = useState([]);
  const [ reportId, setReportId ] = useState('');
  const [ newUrl, setNewUrl ] = useState('');
  // runs on first render

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/MSAccessToken/`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
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
        console.log(data['pages'])
        // console.log(reportUrl+'&pageName=ReportSection7446fb261ebfdaa647fa')
    }
    )
    .catch( error => console.error(error))
    
},[]);

let handleClick = (Name)=>{
  console.log('name=',Name)
  setNewUrl(reportUrl+'&pageName='+Name)
}

let handleSignOut = ()=>{
  console.log('signout')
  window.location.href='/'
}

if(!props.Token){
  return <Navigate to = "/"/>
}

  return (
        <PageContainer>
          <SidebarContainer>
            <ProSidebar>
            <SideBarHeader>
              <img src= '/Images/redseer_strategy.svg' alt= ''/>
            </SideBarHeader>
              <Menu>
                <MenuItem></MenuItem>
                <MenuItem></MenuItem>
                <SubMenu title="Pages">
                  {pages.map(repver => {
                    return(
                      <MenuItem key = {repver.order} onClick={()=>handleClick(repver.name)}>
                        <div style = {{fontFamily:'Arial'}}>{repver.order+1}. {repver.displayName}</div>
                      </MenuItem>
                    )
                  })}
                </SubMenu>
              </Menu>
            </ProSidebar>
          </SidebarContainer>
          <ReportContainer>
                    <User>
                    <a><img src = "/images/user.svg" alt = ""/></a>
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
}

export default Report;

const PageContainer =styled.div`
display:flex;
`

const ReportContainer = styled.div`
width:82%
`
const SidebarContainer = styled.div`
width:18%
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
`

const User = styled.div`
background-color:#F6F6F6;
img{
    float:right;
    width:48px;
    height:48px;
    border-radius:50%;
    padding:5px;
    margin-right:40px;
}

&:hover{
    ${SignOut}{
        align-items:center;
        display:flex;
        justify-content:center;
    }
  }
`
