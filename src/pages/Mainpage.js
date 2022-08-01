import React from 'react'
import Header from '../components/Header'
import { useState, useEffect } from 'react';
import styled, { StyleSheetManager } from 'styled-components'
import {Link, Navigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Mainpage(props) {
  const [ ReportData, setReportData ] = useState([]);

  useEffect(() => {
    console.log('token=',props.token)
    console.log(props.Email)
    fetch(`http://127.0.0.1:8000/report_access/?email=${props.Email}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Token ${props.Token}`
    },
    // body: JSON.stringify({})
    })
    .then( data => data.json())
    .then(
    data => {
        console.log('data = ',data)
        setReportData(data)
    }
    )
    .catch( error => console.error(error))
}, [props.Email, props.token]);

let handleSignOut = ()=>{
  console.log('signout')
  window.location.href='/'
}

  let handleReportDetail = ()=>{
    console.log('ott');
    window.location.href='/report'
  }
  let handleReportBuy = () =>{
    console.log('ott');
  }

  let gotoReport = ()=>{
    window.location.href='/report'
  }
  let goBuyReport = () =>{
    alert('You need to buy this report first')
  }

  if(!props.Token){
    return <Navigate to = "/"/>
}

  return (
    <PageContainer>
      <NavBar>
          <Logo>
            <img src = '/Images/redseer_strategy.svg'/>
          </Logo>
          <User>
              <a><img src = "/images/user.svg" alt = ""/></a>
              <SignOut onClick={handleSignOut}>
                  <a>Sign Out</a>
              </SignOut>
          </User>
      </NavBar>
      <Title>Available Reports</Title>
      <Content>
          {/* {ReportData.map( repver=>{
                return (
                <Wrap key={repver.id} onClick = {()=>handleReportDetail()}>
                  {repver.report_name}
                </Wrap>
                )
            }
            )} */}
              <Wrap>
              <UpperRow>Online Retail</UpperRow>
              <MidRow>Amazon, Flipkart, Myntra</MidRow>
              <EndRow>
                <StyledButton onClick = {gotoReport}>View Report</StyledButton>
              </EndRow>
            </Wrap>
      </Content>
      <Title>Other Buyable Reports</Title>
      <Content>
            {/* {ReportData.map( repver=>{
                return (
                <Wrap key={repver.id} onClick = {()=>handleReportBuy()}>
                  {repver.report_name}
                </Wrap>
                )
            }
            )} */}
            <Wrap>
              <UpperRow>Shortform Video</UpperRow>
              <MidRow>Josh, Moj, Roposo</MidRow>
              <EndRow>
                <StyledButton onClick = {goBuyReport}>Buy Report</StyledButton>
              </EndRow>
            </Wrap>
            <Wrap>
              <UpperRow>OTT Video</UpperRow>
              <MidRow> Youtube, NetFlix, AmazonPrime</MidRow>
              <EndRow>
                <StyledButton onClick = {gotoReport}>Buy Report</StyledButton>
              </EndRow>
            </Wrap>
      </Content>
    </PageContainer>
  )
}

export default Mainpage

const PageContainer = styled.div`
  background-color:#F4F4F4;
  min-height:100vh;
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
}
`

const Wrap = styled.div`
  border-radius:10px;
  overflow:hidden;
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
 width: 9vw;
 float:right;
 margin-right: 2vw;
 border:none;
 height:5vh;
 &:hover{
  background-color:#FF6471;
 }
`