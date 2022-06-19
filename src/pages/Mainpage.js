import React from 'react'
import Header from '../components/Header'
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import {Link, Navigate} from 'react-router-dom';


function Mainpage(props) {
  const [ ReportData, setReportData ] = useState([]);

  useEffect(() => {
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
}, [props.Email]);

  let handleReportDetail = ()=>{
    console.log('ott');
    window.location.href='/report'
  }

  return (
    <PageContainer>
      <Header/> 
      <Title>Available Reports</Title>
      <Content>
        {/* <Wrap onClick = {()=>handleReportDetail()}>
          1. OTT Audio
        </Wrap>
        <Wrap>
          2. Report2
        </Wrap>
        <Wrap>
          3. Report3
        </Wrap>
        <Wrap>
          4. Report4
        </Wrap>
        <Wrap>
          5. Report5
        </Wrap>
        <Wrap>
          6. Report6
        </Wrap> */}
          {ReportData.map( repver=>{
                return (
                <Wrap key={repver.id} onClick = {()=>handleReportDetail()}>
                  {repver.report_name}
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
`
const Title = styled.h4`
  margin:15px 60px;`

const Content = styled.div`
  margin:20px 60px;
  display:grid;
  grid-gap:25px;
  grid-template-columns:repeat(4,minmax(0,1fr));
`

const Wrap = styled.div`
  border-radius:10px;
  overflow:hidden;
  border: 3px solid black;
  cursor:pointer;
  &:hover {
      transform: scale(1.05);
      border-color:blue;
  }
`